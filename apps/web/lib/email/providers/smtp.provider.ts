import { EmailProvider } from '../interfaces/provider.interface';
import { ProviderResponse } from '../types';

export class SMTPProvider implements EmailProvider {
  name = 'SMTP';

  async send(options: {
    from: string;
    to: string[];
    cc?: string[];
    bcc?: string[];
    replyTo?: string;
    subject: string;
    react: React.ReactNode;
    attachments?: Array<{ filename: string; content: Buffer }>;
  }): Promise<ProviderResponse> {
    const startTime = Date.now();
    console.log(`[SMTP Provider Dispatch] Connecting to SMTP server to mail to: ${options.to.join(', ')}`);
    
    // SMTP connection latency simulation
    await new Promise((resolve) => setTimeout(resolve, 180));
    
    return {
      messageId: `smtp-msg-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
      httpStatus: 200,
      responseTime: Date.now() - startTime,
      rawResponse: { success: true, channel: 'SMTP_TRANSPORT' },
    };
  }
}
