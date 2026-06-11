import { transporter } from './mailer';
import { formatDate } from '@cg-techno/utils';
import type { ContactPayload } from '../schemas/contact.schema';

export async function sendContactEmail(data: ContactPayload): Promise<void> {
  const receivedAt = formatDate(new Date());

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #1f2937; background: #f9fafb; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 32px 24px; text-align: center; }
    .header img { height: 48px; margin-bottom: 12px; }
    .header h1 { margin: 0; font-size: 22px; }
    .header p { margin: 4px 0 0; opacity: 0.8; font-size: 14px; }
    .body { padding: 32px 24px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 4px; }
    .value { font-size: 15px; color: #111827; background: #f3f4f6; padding: 10px 14px; border-radius: 8px; border-left: 4px solid #3b82f6; }
    .message-value { white-space: pre-wrap; }
    .footer { background: #f3f4f6; padding: 16px 24px; text-align: center; font-size: 12px; color: #9ca3af; }
    .badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; background: #dbeafe; color: #1e40af; margin-left: 8px; }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>New Customer Enquiry</h1>
    <p>CG Techno Electronics — Corporate Website</p>
  </div>
  <div class="body">
    <div class="field">
      <div class="label">From</div>
      <div class="value">${data.name}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${data.email}" style="color:#3b82f6">${data.email}</a></div>
    </div>
    <div class="field">
      <div class="label">Phone</div>
      <div class="value"><a href="tel:${data.phone}" style="color:#3b82f6">${data.phone}</a></div>
    </div>
    ${data.service ? `
    <div class="field">
      <div class="label">Service of Interest</div>
      <div class="value">${data.service}</div>
    </div>` : ''}
    ${data.product ? `
    <div class="field">
      <div class="label">Product Enquiry</div>
      <div class="value">${data.product}</div>
    </div>` : ''}
    <div class="field">
      <div class="label">Message</div>
      <div class="value message-value">${data.message}</div>
    </div>
    <div class="field">
      <div class="label">Received At</div>
      <div class="value">${receivedAt} IST</div>
    </div>
  </div>
  <div class="footer">
    This message was sent via the CG Techno Electronics website contact form.<br/>
    Please reply directly to <a href="mailto:${data.email}">${data.email}</a>
  </div>
</div>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"CG Techno Electronics Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL_TO || 'cgtechnoelectronics@gmail.com',
    replyTo: data.email,
    subject: `New Enquiry from ${data.name} — CG Techno Electronics`,
    html: htmlBody,
    text: `New enquiry from ${data.name} (${data.email}, ${data.phone})\n\nMessage:\n${data.message}\n\nReceived: ${receivedAt}`,
  });
}
