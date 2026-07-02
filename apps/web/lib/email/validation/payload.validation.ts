import { z } from 'zod';
import { EmailTemplate, EmailCategory, EmailPriority } from '@prisma/client';

// Prevent Header Injection: clean up potential carriage returns/newlines in headers
const headerSafeString = z.string().refine(
  (val) => !/[\r\n]/.test(val),
  { message: 'String contains potential carriage returns or newline header injections' }
);

export const EmailAttachmentSchema = z.object({
  filename: headerSafeString,
  size: z.number().max(10 * 1024 * 1024, 'Attachment file size exceeds 10MB maximum limit'),
  mime: headerSafeString,
  blobUrl: z.string().url('Attachment blobUrl must be a valid URL'),
  provider: headerSafeString,
});

export const EmailPayloadSchema = z.object({
  correlationId: headerSafeString.optional(),
  tenantId: headerSafeString.optional(),
  to: z.union([z.string().email(), z.array(z.string().email())]),
  cc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
  bcc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
  replyTo: z.string().email().optional(),
  subject: z.string().min(1, 'Subject line cannot be blank').refine((val) => !/[\r\n]/.test(val), { message: 'Subject line contains potential carriage returns or newline injections' }),
  template: z.nativeEnum(EmailTemplate),
  templateVersion: headerSafeString.optional(),
  locale: headerSafeString.optional(),
  category: z.nativeEnum(EmailCategory).optional(),
  priority: z.nativeEnum(EmailPriority).optional(),
  metadata: z.record(z.any()).optional(),
  attachments: z.array(EmailAttachmentSchema).optional(),
  source: headerSafeString.optional(),
  leadId: headerSafeString.optional(),
  sessionId: headerSafeString.optional(),
  ipAddress: headerSafeString.optional(),
  userAgent: z.string().optional(),
  country: headerSafeString.optional(),
  city: headerSafeString.optional(),
  scheduledAt: z.date().optional(),
  expiresAt: z.date().optional(),
});
