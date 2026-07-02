import { prisma } from '@/lib/prisma';
import { EmailPayload, DispatchResult } from '../types';
import { EmailPayloadSchema } from '../validation/payload.validation';
import { validateEnv } from '../validation/env.validation';
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
import { checkRateLimit } from '@cg-techno/utils';
import {
  DEFAULT_FROM_INFO,
  DEFAULT_FROM_CAREERS,
  DEFAULT_FROM_SUPPORT,
  DEFAULT_FROM_SALES,
  DEFAULT_SECURITY_EMAIL,
  DEFAULT_TENANT_ID,
  DEFAULT_TEMPLATE_VERSION,
  DEFAULT_LOCALE,
  MAX_RETRY_ATTEMPTS,
} from '../constants';
import { EmailTemplate, EmailCategory, EmailPriority, EmailProvider } from '@prisma/client';
import React from 'react';

// Trigger environment validation at module load
validateEnv();

// Helper to sanitize strings and block header injection attacks
function sanitizeHeader(val?: string): string | undefined {
  if (!val) return undefined;
  return val.replace(/[\r\n]/g, '').trim();
}

// Config mapping for all templates (Category, Priority, Sender fallback)
const TEMPLATE_CONFIG: Record<EmailTemplate, {
  category: EmailCategory;
  priority: EmailPriority;
  from: string;
}> = {
  CONTACT_CONFIRMATION: { category: 'TRANSACTIONAL', priority: 'NORMAL', from: DEFAULT_FROM_INFO },
  CONTACT_ADMIN: { category: 'TRANSACTIONAL', priority: 'HIGH', from: DEFAULT_FROM_INFO },
  CAREER_CONFIRMATION: { category: 'TRANSACTIONAL', priority: 'NORMAL', from: DEFAULT_FROM_CAREERS },
  CAREER_ADMIN: { category: 'TRANSACTIONAL', priority: 'HIGH', from: DEFAULT_FROM_CAREERS },
  NEWSLETTER: { category: 'MARKETING', priority: 'LOW', from: DEFAULT_FROM_INFO },
  OTP: { category: 'SECURITY', priority: 'CRITICAL', from: DEFAULT_FROM_SUPPORT },
  SUPERVISOR_ALERT: { category: 'SYSTEM', priority: 'CRITICAL', from: DEFAULT_SECURITY_EMAIL },
  SALES: { category: 'TRANSACTIONAL', priority: 'NORMAL', from: DEFAULT_FROM_SALES },
  SUPPORT: { category: 'TRANSACTIONAL', priority: 'NORMAL', from: DEFAULT_FROM_SUPPORT },
  QUOTATION: { category: 'TRANSACTIONAL', priority: 'HIGH', from: DEFAULT_FROM_SALES },
  SYSTEM: { category: 'SYSTEM', priority: 'NORMAL', from: DEFAULT_SECURITY_EMAIL },
};

export class EmailService {
  /**
   * Executes the core email lifecycle pipeline.
   */
  static async send(rawPayload: EmailPayload): Promise<DispatchResult> {
    const correlationId = rawPayload.correlationId || `corr-${Math.random().toString(36).substring(2, 15)}`;
  const tenantId = rawPayload.tenantId || DEFAULT_TENANT_ID;

  // 1. Zod Request Validation
  const validated = EmailPayloadSchema.parse(rawPayload) as EmailPayload;

  // 2. Input Sanitization
  const subject = sanitizeHeader(validated.subject) || '';
  const toRaw = Array.isArray(validated.to) ? validated.to : [validated.to];
  const to = toRaw.map(email => sanitizeHeader(email)!).filter(Boolean);
  const cc = validated.cc ? (Array.isArray(validated.cc) ? validated.cc : [validated.cc]).map(e => sanitizeHeader(e)!).filter(Boolean) : [];
  const bcc = validated.bcc ? (Array.isArray(validated.bcc) ? validated.bcc : [validated.bcc]).map(e => sanitizeHeader(e)!).filter(Boolean) : [];
  const replyTo = sanitizeHeader(validated.replyTo);
  
  const template = validated.template;
  const metadata = validated.metadata || {};
  const templateConfig = TEMPLATE_CONFIG[template];

  const category = validated.category || templateConfig.category;
  const priority = validated.priority || templateConfig.priority;
  const fromAddress = templateConfig.from;

  // 3. Spam Protection (Honeypot checking)
  if (metadata.website) {
    console.warn(`[Spam Guard Triggered] Honeypot field filled. Correlation ID: ${correlationId}`);
    return {
      success: true,
      emailLogId: `spam-filtered-${Date.now()}`,
      correlationId,
      attempts: 0,
      errorMessage: 'Filtered by spam guard',
    };
  }

  // 4. Rate Limiting Check
  const rateLimitIp = validated.ipAddress || '127.0.0.1';
  const rateLimitResult = checkRateLimit(rateLimitIp, `email-dispatch:${template}`);
  if (!rateLimitResult.allowed) {
    console.error(`[Rate Limit Intercept] Too many requests from IP ${rateLimitIp} for template ${template}`);
    throw new Error('Rate limit exceeded. Please wait a moment and try again.');
  }

  // Determine Provider
  const configuredProvider = (process.env.EMAIL_PROVIDER as EmailProvider) || 'RESEND';
  const apiKey = process.env.RESEND_API_KEY;
  const isMock = configuredProvider === 'MOCK' || !apiKey || (configuredProvider !== 'RESEND' && (apiKey.startsWith('re_mock') || apiKey.includes('placeholder')));
  const provider = isMock ? 'MOCK' : 'RESEND';

  // 5. Create PENDING Log Record
  const log = await prisma.emailLog.create({
    data: {
      correlationId,
      tenantId,
      provider: provider as EmailProvider,
      from: `CG Techno Electronics <${fromAddress}>`,
      to: to.join(', '),
      cc,
      bcc,
      replyTo,
      subject,
      template,
      templateVersion: validated.templateVersion || DEFAULT_TEMPLATE_VERSION,
      locale: validated.locale || DEFAULT_LOCALE,
      category,
      priority,
      status: 'PENDING',
      payload: rawPayload as any,
      metadata: metadata as any,
      maxAttempts: MAX_RETRY_ATTEMPTS,
      attempts: 0,
      source: validated.source || 'CommunicationEngine',
      leadId: validated.leadId || null,
      sessionId: validated.sessionId || null,
      ipAddress: validated.ipAddress || null,
      userAgent: validated.userAgent || null,
      country: validated.country || null,
      city: validated.city || null,
      scheduledAt: validated.scheduledAt || null,
      expiresAt: validated.expiresAt || null,
    },
  });

  // 6. Write Initial Audit Event
  await appendEvent(log.id, 'CREATED', 'Email log entry initialized in database.');
  await appendEvent(log.id, 'VALIDATED', 'Email request payload successfully validated.');

  // 7. Resolve React Template component
  const TemplateComponent = EMAIL_TEMPLATES[template];
  if (!TemplateComponent) {
    throw new Error(`Template renderer not registered for: ${template}`);
  }

  // 8. Process & Save Attachment records
  const activeAttachments: Array<{ filename: string; content: Buffer }> = [];
  if (validated.attachments && validated.attachments.length > 0) {
    await appendEvent(log.id, 'SENDING', `Resolving ${validated.attachments.length} attachment files...`);
    
    for (const attach of validated.attachments) {
      // Create Attachment database records
      await prisma.emailAttachment.create({
        data: {
          emailLogId: log.id,
          filename: attach.filename,
          size: attach.size,
          mime: attach.mime,
          blobUrl: attach.blobUrl,
          provider: attach.provider,
        },
      });

      // Try fetching/downloading content buffer
      try {
        const res = await fetch(attach.blobUrl);
        if (!res.ok) throw new Error(`Fetch fail: HTTP ${res.status}`);
        const buffer = Buffer.from(await res.arrayBuffer());
        
        activeAttachments.push({
          filename: attach.filename,
          content: buffer,
        });
      } catch (dlError) {
        console.warn(`[Attachment Download Fail] URL: ${attach.blobUrl}`, dlError);
        await appendEvent(log.id, 'SENDING', `Warning: Failed to fetch attachment ${attach.filename}. Sending without PDF attachment.`);
      }
    }
  }

  // 9. Resolve Provider Client
  const resolveProvider = (pType: EmailProvider): any => {
    switch (pType) {
      case 'RESEND':
        return isMock ? new MockProvider() : new ResendProvider(apiKey!);
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

  const providerClient = resolveProvider(provider);

  // 9. Dispatch to Provider client
  let attempts = 1;
  await prisma.emailLog.update({
    where: { id: log.id },
    data: { status: 'PROCESSING', attempts },
  });
  await appendEvent(log.id, 'SENDING', 'Dispatching request payload to provider client API...');

  try {
    const response = await providerClient.send({
      from: `CG Techno Electronics <${fromAddress}>`,
      to,
      cc: cc.length > 0 ? cc : undefined,
      bcc: bcc.length > 0 ? bcc : undefined,
      replyTo,
      subject,
      react: React.createElement(TemplateComponent, metadata),
      attachments: activeAttachments.length > 0 ? activeAttachments : undefined,
    });

    const isSuccess = response.httpStatus === 200 && response.messageId !== '';

    // 10 & 11. Update DB on Provider Response
    if (isSuccess) {
      await prisma.emailLog.update({
        where: { id: log.id },
        data: {
          status: 'SENT',
          providerMessageId: response.messageId,
          providerResponse: response.rawResponse || undefined,
          httpStatus: response.httpStatus,
          responseTime: response.responseTime,
          sentAt: new Date(),
        },
      });

      // 12. Write Success Audit Event
      await appendEvent(log.id, 'SENT', `Email successfully sent. Msg ID: ${response.messageId}`, response.rawResponse, { responseTime: response.responseTime });

      // 13. Return result
      return {
        success: true,
        emailLogId: log.id,
        correlationId,
        providerMessageId: response.messageId,
        attempts,
        httpStatus: response.httpStatus,
        responseTime: response.responseTime,
      };
    } else {
      throw new Error(
        response.rawResponse?.error?.message ||
        response.rawResponse?.error ||
        'Provider API error'
      );
    }
  } catch (err: any) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[Email Pipeline Error] Delivery failed:`, errorMsg);

    // Initial attempt failed, mark log for retry or final fail
    const isRetryable = attempts < log.maxAttempts;
    const finalStatus = isRetryable ? 'RETRYING' : 'FAILED';

    await prisma.emailLog.update({
      where: { id: log.id },
      data: {
        status: finalStatus,
        errorMessage: errorMsg,
        failureReason: 'PROVIDER_API_REJECTION',
        failedAt: isRetryable ? undefined : new Date(),
      },
    });

    await appendEvent(
      log.id,
      'FAILED',
      `Delivery attempt #1 failed: ${errorMsg}. ${isRetryable ? 'Handed over to Retry Engine.' : 'Delivery halted.'}`,
      undefined,
      undefined,
      errorMsg
    );

    return {
      success: false,
      emailLogId: log.id,
      correlationId,
      attempts,
      errorMessage: errorMsg,
    };
  }
}
}



