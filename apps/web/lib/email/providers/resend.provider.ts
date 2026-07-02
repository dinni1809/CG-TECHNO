import { EmailProvider } from '../interfaces/provider.interface';
import { ProviderResponse } from '../types';
import { Resend } from 'resend';

export class ResendProvider implements EmailProvider {
  name = 'RESEND';
  private resendClient: Resend;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('Resend API key is required to initialize ResendProvider');
    }
    this.resendClient = new Resend(apiKey);
  }

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
    
    try {
      let html: string | undefined = undefined;
      if (options.react) {
        const { renderToStaticMarkup } = require('react-dom/server');
        html = renderToStaticMarkup(options.react as React.ReactElement);
      }

      const response = await this.resendClient.emails.send({
        from: options.from,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        replyTo: options.replyTo,
        subject: options.subject,
        html: html,
        attachments: options.attachments,
      } as any);

      const responseTime = Date.now() - startTime;

      if (response.error) {
        return {
          messageId: '',
          httpStatus: 400,
          responseTime,
          rawResponse: { error: response.error },
        };
      }

      return {
        messageId: response.data?.id || `resend-${Date.now()}`,
        httpStatus: 200,
        responseTime,
        rawResponse: response.data,
      };
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      return {
        messageId: '',
        httpStatus: 500,
        responseTime,
        rawResponse: { error: error instanceof Error ? error.message : String(error) },
      };
    }
  }
}
