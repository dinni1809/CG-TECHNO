import { prisma } from '@/lib/prisma';
import { EmailStatus, EmailProvider } from '@prisma/client';
import { EMAIL_TEMPLATES } from '../templates';
import {
  ResendProvider,
  MockProvider,
  SMTPProvider,
  SESProvider,
  SendGridProvider,
  MailgunProvider,
  PostmarkProvider
} from '../providers';
import { appendEvent } from '../logger/audit';
import React from 'react';

// Initialize live vs mock providers
const getProviderInstance = (providerType: EmailProvider) => {
  const key = process.env.RESEND_API_KEY;
  const isMock = !key || (providerType !== 'RESEND' && (key.startsWith('re_mock') || key.includes('placeholder')));

  switch (providerType) {
    case 'RESEND':
      return isMock ? new MockProvider() : new ResendProvider(key!);
    case 'SENDGRID':
      return new SendGridProvider();
    case 'SMTP':
      return new SMTPProvider();
    case 'AWS_SES':
      return new SESProvider();
    case 'POSTMARK':
      return new PostmarkProvider();
    case 'MOCK':
    default:
      return new MockProvider();
  }
};

// Download attachment buffer helper
async function downloadAttachment(blobUrl: string): Promise<Buffer | null> {
  try {
    const res = await fetch(blobUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return Buffer.from(await res.arrayBuffer());
  } catch (error) {
    console.warn(`[Retry Service] Could not fetch remote attachment from ${blobUrl}:`, error);
    return null;
  }
}

/**
 * Retries a specific failed email by its primary log ID.
 */
export async function retryFailedEmail(logId: string): Promise<boolean> {
  const log = await prisma.emailLog.findUnique({
    where: { id: logId },
    include: { attachments: true },
  });

  if (!log) {
    throw new Error(`Email log with ID ${logId} not found`);
  }

  if (log.status === 'SENT') {
    console.log(`[Retry Service] Log ${logId} is already SENT. Skipping.`);
    return true;
  }

  const nextAttempt = log.attempts + 1;
  console.log(`[Retry Service] Initiating attempt #${nextAttempt} for log ${logId}`);

  // Transition log status
  await prisma.emailLog.update({
    where: { id: logId },
    data: {
      status: 'RETRYING',
      attempts: nextAttempt,
      lastRetryAt: new Date(),
    },
  });

  await appendEvent(logId, 'RETRYING', `Started email delivery attempt #${nextAttempt}`);

  try {
    const providerInstance = getProviderInstance(log.provider);
    const TemplateComponent = EMAIL_TEMPLATES[log.template];

    if (!TemplateComponent) {
      throw new Error(`Template Component ${log.template} not found in registry`);
    }

    const templateMetadata = (log.metadata as Record<string, any>) || {};

    // Re-resolve attachment files
    const activeAttachments: Array<{ filename: string; content: Buffer }> = [];
    for (const attach of log.attachments) {
      const buffer = await downloadAttachment(attach.blobUrl);
      if (buffer) {
        activeAttachments.push({
          filename: attach.filename,
          content: buffer,
        });
      }
    }

    // Deliver via decoupled provider interface
    const response = await providerInstance.send({
      from: log.from,
      to: [log.to],
      cc: log.cc,
      bcc: log.bcc,
      replyTo: log.replyTo || undefined,
      subject: log.subject,
      react: React.createElement(TemplateComponent, templateMetadata),
      attachments: activeAttachments.length > 0 ? activeAttachments : undefined,
    });

    const isSuccess = response.httpStatus === 200 && response.messageId !== '';

    if (isSuccess) {
      await prisma.emailLog.update({
        where: { id: logId },
        data: {
          status: 'SENT',
          providerMessageId: response.messageId,
          providerResponse: response.rawResponse || undefined,
          httpStatus: response.httpStatus,
          responseTime: response.responseTime,
          errorMessage: null,
          failureReason: null,
          sentAt: new Date(),
        },
      });

      await appendEvent(logId, 'SENT', `Email successfully sent on attempt #${nextAttempt}. Msg ID: ${response.messageId}`, response.rawResponse);
      return true;
    } else {
      throw new Error(
        response.rawResponse?.error?.message ||
        response.rawResponse?.error ||
        'Provider rejected delivery'
      );
    }
  } catch (error: any) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    const reachedMax = nextAttempt >= log.maxAttempts;
    const finalStatus: EmailStatus = reachedMax ? 'FAILED' : 'RETRYING';

    await prisma.emailLog.update({
      where: { id: logId },
      data: {
        status: finalStatus,
        errorMessage: errorMsg,
        failureReason: reachedMax ? 'MAX_ATTEMPTS_EXCEEDED' : 'PROVIDER_TEMPORARY_ERROR',
        failedAt: reachedMax ? new Date() : undefined,
      },
    });

    await appendEvent(
      logId,
      'FAILED',
      `Attempt #${nextAttempt} failed: ${errorMsg}. ${reachedMax ? 'Delivery halted.' : 'Scheduled for future retry.'}`,
      undefined,
      undefined,
      errorMsg
    );

    return false;
  }
}

/**
 * Retries all failed email logs that have not yet hit the maximum attempt limit.
 */
export async function retryAllFailedEmails(): Promise<{ succeeded: number; failed: number }> {
  const failedLogs = await prisma.emailLog.findMany({
    where: {
      status: { in: ['FAILED', 'RETRYING'] },
      attempts: { lt: prisma.emailLog.fields.maxAttempts },
      deletedAt: null,
    },
    select: { id: true },
  });

  let succeeded = 0;
  let failed = 0;

  for (const log of failedLogs) {
    const ok = await retryFailedEmail(log.id);
    if (ok) {
      succeeded++;
    } else {
      failed++;
    }
  }

  return { succeeded, failed };
}
