import { transporter } from './mailer';
import { formatDate } from '@cg-techno/utils';
import type { ContactPayload } from '../schemas/contact.schema';

async function sendViaResend(options: {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 're_placeholder_api_key') {
    throw new Error('Resend API key is missing or is placeholder');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: options.from,
      to: [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
      reply_to: options.replyTo,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API failed: ${response.status} ${errorText}`);
  }
}

export async function sendContactEmail(data: ContactPayload): Promise<void> {
  const receivedAt = formatDate(new Date());
  const adminEmail = process.env.ADMIN_EMAIL || 'cgtechnoelectronics@gmail.com';
  
  // 1. Admin Email Template (Alert Alert)
  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #1f2937; background: #f9fafb; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; }
    .header { background: linear-gradient(135deg, #1e3a8a, #0f172a); color: white; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 4px 0 0; opacity: 0.8; font-size: 14px; }
    .body { padding: 32px 24px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 4px; }
    .value { font-size: 14px; color: #111827; background: #f3f4f6; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #3b82f6; }
    .message-value { white-space: pre-wrap; line-height: 1.5; }
    .footer { background: #f9fafb; padding: 20px 24px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>New Website Enquiry Received</h1>
    <p>CG Techno Electronics — B2B Portal</p>
  </div>
  <div class="body">
    <div class="field">
      <div class="label">Customer Name</div>
      <div class="value">${data.name}</div>
    </div>
    <div class="field">
      <div class="label">Email Address</div>
      <div class="value"><a href="mailto:${data.email}" style="color:#3b82f6; text-decoration:none;">${data.email}</a></div>
    </div>
    <div class="field">
      <div class="label">Mobile Number</div>
      <div class="value"><a href="tel:${data.phone}" style="color:#3b82f6; text-decoration:none;">${data.phone}</a></div>
    </div>
    ${data.company ? `
    <div class="field">
      <div class="label">Company / Organization</div>
      <div class="value">${data.company}</div>
    </div>` : ''}
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
      <div class="label">Enquiry Message</div>
      <div class="value message-value">${data.message}</div>
    </div>
    <div class="field">
      <div class="label">Submission Date</div>
      <div class="value">${receivedAt} IST</div>
    </div>
  </div>
  <div class="footer">
    This is an automated administrative notification for CG Techno.
  </div>
</div>
</body>
</html>
  `;

  // 2. Customer Auto Reply Template
  const customerHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #1f2937; background: #f9fafb; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; }
    .header { background: linear-gradient(135deg, #1e3a8a, #0f172a); color: white; padding: 36px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
    .header p { margin: 6px 0 0; opacity: 0.8; font-size: 14px; }
    .body { padding: 32px 24px; line-height: 1.6; }
    .greeting { font-size: 16px; font-weight: 700; color: #111827; margin-bottom: 16px; }
    .text { font-size: 15px; color: #4b5563; margin-bottom: 20px; }
    .details-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
    .details-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #9ca3af; margin-bottom: 12px; letter-spacing: 0.05em; }
    .detail-item { font-size: 14px; color: #4b5563; margin-bottom: 8px; }
    .detail-item strong { color: #1f2937; }
    .highlight-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px; font-size: 14px; color: #1e40af; }
    .signature { border-top: 1px solid #f3f4f6; padding-top: 20px; margin-top: 24px; font-size: 14px; color: #6b7280; }
    .footer { background: #f9fafb; padding: 20px 24px; text-align: center; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>Thank You for Contacting CG Techno</h1>
    <p>Premium B2B Enterprise Technology Solutions</p>
  </div>
  <div class="body">
    <div class="greeting">Dear ${data.name},</div>
    
    <div class="text">
      Thank you for reaching out to CG Techno Electronics. We have successfully received your B2B enquiry submitted through our website.
    </div>

    <div class="highlight-box">
      <strong>Expectation Timeline:</strong> Our corporate technology integration team has been notified and will review your requirements. We aim to respond with a tailored proposal or follow-up schedule within <strong>24 business hours</strong>.
    </div>

    <div class="details-box">
      <div class="details-title">Summary of Your Enquiry</div>
      <div class="detail-item"><strong>Mobile:</strong> ${data.phone}</div>
      ${data.company ? `<div class="detail-item"><strong>Company:</strong> ${data.company}</div>` : ''}
      ${data.service ? `<div class="detail-item"><strong>Service of Interest:</strong> ${data.service}</div>` : ''}
      ${data.product ? `<div class="detail-item"><strong>Product Enquiry:</strong> ${data.product}</div>` : ''}
      <div class="detail-item" style="margin-top: 12px;"><strong>Your Message:</strong></div>
      <div style="font-size: 13.5px; color: #1f2937; font-style: italic; white-space: pre-wrap; padding-left: 10px; border-left: 2px solid #d1d5db; margin-top: 4px;">${data.message}</div>
    </div>

    <div class="text">
      If you have any urgent updates or questions, feel free to reply directly to this email or call us at our helpline number.
    </div>

    <div class="signature">
      Best regards,<br/>
      <strong>Enterprise Solutions Team</strong><br/>
      CG Techno Electronics
    </div>
  </div>
  <div class="footer">
    This is an automatic confirmation of receipt. Please do not reply to this system address unless updating your query.
  </div>
</div>
</body>
</html>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  const useResend = apiKey && apiKey !== 're_placeholder_api_key';

  if (useResend) {
    console.log('Sending emails via Resend API...');
    
    // Send Admin Notification Alert
    await sendViaResend({
      from: 'CG Techno Website <onboarding@resend.dev>',
      to: adminEmail,
      subject: 'New Website Enquiry Received',
      html: adminHtml,
      text: `New enquiry from ${data.name} (${data.email}, ${data.phone})\n\nMessage:\n${data.message}\n\nReceived: ${receivedAt}`,
      replyTo: data.email,
    });

    // Send Customer Auto-Reply
    await sendViaResend({
      from: 'CG Techno Electronics <onboarding@resend.dev>',
      to: data.email,
      subject: 'Thank You for Contacting CG Techno',
      html: customerHtml,
      text: `Dear ${data.name},\n\nThank you for reaching out to CG Techno Electronics. We have received your enquiry and will respond within 24 business hours.`,
    });

  } else {
    console.log('Sending emails via SMTP Transporter...');
    
    // Send Admin Notification Alert
    await transporter.sendMail({
      from: `"CG Techno Electronics Website" <${process.env.SMTP_USER}>`,
      to: adminEmail,
      replyTo: data.email,
      subject: 'New Website Enquiry Received',
      html: adminHtml,
      text: `New enquiry from ${data.name} (${data.email}, ${data.phone})\n\nMessage:\n${data.message}\n\nReceived: ${receivedAt}`,
    });

    // Send Customer Auto-Reply
    await transporter.sendMail({
      from: `"CG Techno Electronics" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Thank You for Contacting CG Techno',
      html: customerHtml,
      text: `Dear ${data.name},\n\nThank you for reaching out to CG Techno Electronics. We have received your enquiry and will respond within 24 business hours.`,
    });
  }
}
