import { EmailProvider } from '../interfaces/provider.interface';
import { ProviderResponse } from '../types';

export class SESProvider implements EmailProvider {
  name = 'AWS_SES';

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
    console.log(`[AWS SES Provider Dispatch] Dispatched message to AWS Simple Email Service for: ${options.to.join(', ')}`);
    
    // AWS SES transmission latency simulation
    await new Promise((resolve) => setTimeout(resolve, 120));
    
    return {
      messageId: `ses-msg-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
      httpStatus: 200,
      responseTime: Date.now() - startTime,
      rawResponse: { success: true, channel: 'AWS_SES_CLIENT' },
    };
  }
}
