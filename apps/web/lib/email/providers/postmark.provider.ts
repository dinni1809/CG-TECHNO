import { EmailProvider } from '../interfaces/provider.interface';
import { ProviderResponse } from '../types';

export class PostmarkProvider implements EmailProvider {
  name = 'POSTMARK';

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
    console.log(`[Postmark Provider Dispatch] Sending mail via Postmark REST API to: ${options.to.join(', ')}`);
    
    // Postmark API latency simulation
    await new Promise((resolve) => setTimeout(resolve, 110));
    
    return {
      messageId: `pm-msg-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
      httpStatus: 200,
      responseTime: Date.now() - startTime,
      rawResponse: { success: true, channel: 'POSTMARK_CLIENT_API' },
    };
  }
}
