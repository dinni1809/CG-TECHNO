import { EmailProvider } from '../interfaces/provider.interface';
import { ProviderResponse } from '../types';

export class MailgunProvider implements EmailProvider {
  name = 'MAILGUN';

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
    console.log(`[Mailgun Provider Dispatch] Sending mail via Mailgun REST API to: ${options.to.join(', ')}`);
    
    // Mailgun API latency simulation
    await new Promise((resolve) => setTimeout(resolve, 160));
    
    return {
      messageId: `mg-msg-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
      httpStatus: 200,
      responseTime: Date.now() - startTime,
      rawResponse: { success: true, channel: 'MAILGUN_REST_API' },
    };
  }
}
