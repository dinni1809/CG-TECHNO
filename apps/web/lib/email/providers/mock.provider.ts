import { EmailProvider } from '../interfaces/provider.interface';
import { ProviderResponse } from '../types';

export class MockProvider implements EmailProvider {
  name = 'MOCK';

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
    
    // Simulate natural API network latency (100ms - 300ms)
    await new Promise((resolve) => setTimeout(resolve, 150));
    
    const responseTime = Date.now() - startTime;
    const messageId = `mock-msg-${Math.random().toString(36).substring(2, 15)}`;

    console.log('--- [MOCK PROVIDER DISPATCH] ---');
    console.log(`From:        ${options.from}`);
    console.log(`To:          ${options.to.join(', ')}`);
    if (options.cc && options.cc.length > 0) console.log(`CC:          ${options.cc.join(', ')}`);
    if (options.bcc && options.bcc.length > 0) console.log(`BCC:         ${options.bcc.join(', ')}`);
    console.log(`Subject:     ${options.subject}`);
    console.log(`ReplyTo:     ${options.replyTo || 'Not provided'}`);
    if (options.attachments && options.attachments.length > 0) {
      console.log(`Attachments: ${options.attachments.map(a => `${a.filename} (${a.content.length} bytes)`).join(', ')}`);
    }
    console.log('--------------------------------');

    return {
      messageId,
      httpStatus: 200,
      responseTime,
      rawResponse: {
        success: true,
        simulation: true,
        messageId,
        dispatchedAt: new Date().toISOString(),
      },
    };
  }
}
