import { transporter } from './mailer';
import { formatDate } from '@cg-techno/utils';
import type { ApplicationPayload } from '../schemas/application.schema';

export async function sendApplicationEmail(data: ApplicationPayload): Promise<void> {
  const receivedAt = formatDate(new Date());

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #1f2937; background: #f9fafb; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #155a2c, #1a7a3c); color: white; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; }
    .header p { margin: 4px 0 0; opacity: 0.8; font-size: 14px; }
    .body { padding: 32px 24px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 4px; }
    .value { font-size: 15px; color: #111827; background: #f3f4f6; padding: 10px 14px; border-radius: 8px; border-left: 4px solid #155a2c; }
    .message-value { white-space: pre-wrap; }
    .footer { background: #f3f4f6; padding: 16px 24px; text-align: center; font-size: 12px; color: #9ca3af; }
    .role-badge { display: inline-block; padding: 4px 14px; border-radius: 999px; font-size: 13px; font-weight: 700; background: #d1fae5; color: #065f46; }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>New Job Application</h1>
    <p>CG Techno Electronics — Careers Portal</p>
  </div>
  <div class="body">
    <div class="field">
      <div class="label">Applicant Name</div>
      <div class="value">${data.name}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${data.email}" style="color:#155a2c">${data.email}</a></div>
    </div>
    <div class="field">
      <div class="label">Phone</div>
      <div class="value"><a href="tel:${data.phone}" style="color:#155a2c">${data.phone}</a></div>
    </div>
    <div class="field">
      <div class="label">Role Applied For</div>
      <div class="value"><span class="role-badge">${data.role}</span></div>
    </div>
    ${data.message ? `
    <div class="field">
      <div class="label">Cover Note</div>
      <div class="value message-value">${data.message}</div>
    </div>` : ''}
    <div class="field">
      <div class="label">Received At</div>
      <div class="value">${receivedAt} IST</div>
    </div>
  </div>
  <div class="footer">
    This application was submitted via the CG Techno Electronics careers page.<br/>
    Please reply directly to <a href="mailto:${data.email}">${data.email}</a>
  </div>
</div>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"CG Techno Electronics HR" <${process.env.SMTP_USER}>`,
    to: process.env.CAREERS_EMAIL_TO || 'cgtechnoelectronics@gmail.com',
    replyTo: data.email,
    subject: `New Application — ${data.role} from ${data.name}`,
    html: htmlBody,
    text: `New application for ${data.role} from ${data.name} (${data.email}, ${data.phone})\n\n${data.message ? `Cover Note:\n${data.message}\n\n` : ''}Received: ${receivedAt}`,
  });
}
