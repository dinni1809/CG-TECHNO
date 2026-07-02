import { EmailProvider } from '../interfaces/provider.interface';
import { ProviderResponse } from '../types';

export class SendGridProvider implements EmailProvider {
  name = 'SENDGRID';

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
    console.log(`[SendGrid Provider Dispatch] Sending mail via SendGrid API to: ${options.to.join(', ')}`);
    
    // SendGrid API latency simulation
    await new Promise((resolve) => setTimeout(resolve, 140));
    
    return {
      messageId: `sg-msg-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
      httpStatus: 200,
      responseTime: Date.now() - startTime,
      rawResponse: { success: true, channel: 'SENDGRID_WEB_API' },
    };
  }
}
