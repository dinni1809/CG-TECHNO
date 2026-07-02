import { EmailTemplate, EmailCategory, EmailPriority, EmailStatus, EmailProvider, CommChannel } from '@prisma/client';

export type { EmailTemplate, EmailCategory, EmailPriority, EmailStatus, EmailProvider, CommChannel };

export interface AttachmentRequest {
  filename: string;
  size: number;
  mime: string;
  blobUrl: string;
  provider: string;
}

export interface EmailPayload {
  correlationId?: string;
  tenantId?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  subject: string;
  template: EmailTemplate;
  templateVersion?: string;
  locale?: string;
  category?: EmailCategory;
  priority?: EmailPriority;
  metadata?: Record<string, any>;
  attachments?: AttachmentRequest[];
  source?: string;
  leadId?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  country?: string;
  city?: string;
  scheduledAt?: Date;
  expiresAt?: Date;
}

export interface DispatchResult {
  success: boolean;
  emailLogId: string;
  correlationId: string;
  providerMessageId?: string;
  attempts: number;
  httpStatus?: number;
  responseTime?: number;
  errorMessage?: string;
}

export interface ProviderResponse {
  messageId: string;
  httpStatus: number;
  responseTime: number;
  rawResponse: any;
}
