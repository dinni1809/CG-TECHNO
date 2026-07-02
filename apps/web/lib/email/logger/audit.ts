import { prisma } from '@/lib/prisma';
import { EmailEventType, EmailEvent } from '@prisma/client';

/**
 * Appends a new immutable timeline event for an email log.
 */
export async function appendEvent(
  emailLogId: string,
  eventType: EmailEventType,
  message?: string,
  providerResponse?: any,
  metadata?: any,
  error?: string
): Promise<EmailEvent | undefined> {
  try {
    return await prisma.emailEvent.create({
      data: {
        emailLogId,
        eventType,
        message: message || `Transitioned to event: ${eventType}`,
        providerResponse: providerResponse ? (providerResponse as any) : undefined,
        metadata: metadata ? (metadata as any) : undefined,
        error: error || undefined,
      },
    });
  } catch (err) {
    console.error(`[Timeline Auditor Error] Failed to append event "${eventType}" for log ID ${emailLogId}:`, err);
  }
}

/**
 * Retrieves the chronological timeline of events for an email log.
 */
export async function getTimeline(emailLogId: string): Promise<EmailEvent[]> {
  try {
    return await prisma.emailEvent.findMany({
      where: { emailLogId },
      orderBy: { createdAt: 'asc' },
    });
  } catch (err) {
    console.error(`[Timeline Auditor Error] Failed to get timeline for log ID ${emailLogId}:`, err);
    return [];
  }
}
