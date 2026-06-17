import { transporter } from './mailer';
import { formatDate } from '@cg-techno/utils';
import fs from 'fs';

async function sendViaResend(options: {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string; // base64
  }>;
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
      attachments: options.attachments,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API failed: ${response.status} ${errorText}`);
  }
}

export async function sendApplicationEmails(
  data: {
    fullName: string;
    email: string;
    mobile: string;
    city: string;
    qualification: string;
    fieldOfStudy: string;
    experience: string;
    interests: string[];
    preference: string;
    availability: string;
    certifications?: string | null;
    linkedinUrl?: string | null;
    portfolioUrl?: string | null;
    hasDrivingLicense: boolean;
    willingToTravel: boolean;
    additionalInfo?: string | null;
    resumeUrl?: string | null;
  },
  resumeLocalPath: string,
  resumeOriginalName: string
): Promise<void> {
  const receivedAt = formatDate(new Date());

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const resumeLink = data.resumeUrl ? `${baseUrl}${data.resumeUrl}` : `${baseUrl}/uploads/resumes/${resumeOriginalName}`;

  // 1. Admin Email Notification Body
  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #1f2937; background: #f9fafb; margin: 0; padding: 20px; }
    .container { max-width: 650px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
    .header { background: linear-gradient(135deg, #06142d, #1e40af); color: white; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 750; }
    .header p { margin: 6px 0 0; opacity: 0.85; font-size: 14px; }
    .body { padding: 32px 24px; }
    .section-title { font-size: 14px; font-weight: 800; text-transform: uppercase; color: #1e40af; border-bottom: 2px solid #eff6ff; pb: 6px; margin: 28px 0 16px 0; }
    .section-title:first-of-type { margin-top: 0; }
    .grid { display: grid; grid-template-cols: 1fr 1fr; gap: 16px; margin-bottom: 8px; }
    .field { margin-bottom: 16px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; tracking-spacing: 0.05em; color: #6b7280; margin-bottom: 4px; }
    .value { font-size: 14px; color: #111827; background: #f8fafc; padding: 10px 14px; border-radius: 8px; border-left: 3px solid #3b82f6; }
    .interests-list { display: flex; flex-wrap: wrap; gap: 6px; padding: 4px 0; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; margin-right: 6px; margin-bottom: 6px; }
    .message-value { white-space: pre-wrap; word-break: break-word; }
    .footer { background: #f3f4f6; padding: 16px 24px; text-align: center; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>New Career Application</h1>
    <p>CG Techno Electronics — Recruitment Portal</p>
  </div>
  <div class="body">
    
    <div class="section-title">1. Personal Information</div>
    <div class="grid">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${data.fullName}</div>
      </div>
      <div class="field">
        <div class="label">Current City</div>
        <div class="value">${data.city}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${data.email}" style="color:#1e40af; text-decoration:none;">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Mobile Number</div>
        <div class="value"><a href="tel:${data.mobile}" style="color:#1e40af; text-decoration:none;">${data.mobile}</a></div>
      </div>
    </div>

    <div class="section-title">2. Education & Experience</div>
    <div class="grid">
      <div class="field">
        <div class="label">Highest Qualification</div>
        <div class="value">${data.qualification}</div>
      </div>
      <div class="field">
        <div class="label">Years of Experience</div>
        <div class="value">${data.experience}</div>
      </div>
      <div class="field" style="grid-column: span 2;">
        <div class="label">Field of Study</div>
        <div class="value">${data.fieldOfStudy}</div>
      </div>
    </div>

    <div class="section-title">3. Areas of Interest</div>
    <div class="field">
      <div class="interests-list">
        ${data.interests.map(interest => `<span class="badge">${interest}</span>`).join('')}
      </div>
    </div>

    <div class="section-title">4. Preference & Details</div>
    <div class="grid">
      <div class="field">
        <div class="label">Employment Preference</div>
        <div class="value">${data.preference}</div>
      </div>
      <div class="field">
        <div class="label">Availability</div>
        <div class="value">${data.availability}</div>
      </div>
      <div class="field">
        <div class="label">Driving License?</div>
        <div class="value">${data.hasDrivingLicense ? 'Yes' : 'No'}</div>
      </div>
      <div class="field">
        <div class="label">Willing to Travel?</div>
        <div class="value">${data.willingToTravel ? 'Yes' : 'No'}</div>
      </div>
    </div>

    <div class="section-title">5. Links & Attachments</div>
    <div class="field">
      <div class="label">LinkedIn Profile</div>
      <div class="value">${data.linkedinUrl ? `<a href="${data.linkedinUrl}" target="_blank" style="color:#1e40af;">${data.linkedinUrl}</a>` : 'Not provided'}</div>
    </div>
    <div class="field">
      <div class="label">Portfolio / Website</div>
      <div class="value">${data.portfolioUrl ? `<a href="${data.portfolioUrl}" target="_blank" style="color:#1e40af;">${data.portfolioUrl}</a>` : 'Not provided'}</div>
    </div>
    <div class="field">
      <div class="label">Certifications</div>
      <div class="value">${data.certifications || 'None'}</div>
    </div>
    <div class="field">
      <div class="label">Resume Attachment</div>
      <div class="value" style="font-weight: bold; border-left-color: #f59e0b;">${resumeOriginalName}</div>
    </div>
    <div class="field">
      <div class="label">Resume Link</div>
      <div class="value" style="font-weight: bold; border-left-color: #f59e0b;">
        <a href="${resumeLink}" target="_blank" style="color:#1e40af; text-decoration:underline;">Click to Download Resume (${resumeOriginalName})</a>
      </div>
    </div>

    ${data.additionalInfo ? `
    <div class="section-title">Additional Information / Message</div>
    <div class="field">
      <div class="value message-value">${data.additionalInfo}</div>
    </div>` : ''}

    <div class="field" style="margin-top: 24px;">
      <div class="label">Submitted At</div>
      <div class="value">${receivedAt} IST</div>
    </div>
  </div>
  <div class="footer">
    This application was received via the talent acquisition portal.<br/>
    Please review the attached resume.
  </div>
</div>
</body>
</html>
  `;

  // 2. Applicant Email Confirmation Body
  const applicantHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; color: #1f2937; background: #f9fafb; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
    .header { background: linear-gradient(135deg, #06142d, #1e40af); color: white; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; }
    .body { padding: 32px 24px; line-height: 1.6; font-size: 15px; color: #374151; }
    .body p { margin-top: 0; margin-bottom: 16px; }
    .bullet-points { margin-bottom: 24px; padding-left: 20px; }
    .footer { background: #f3f4f6; padding: 16px 24px; text-align: center; font-size: 12px; color: #9ca3af; }
    .highlight { font-weight: bold; color: #1e40af; }
  </style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>Application Received</h1>
    <p>CG Techno Electronics</p>
  </div>
  <div class="body">
    <p>Dear ${data.fullName},</p>
    <p>Thank you for your interest in building your career with <span class="highlight">CG Techno Electronics</span>. We have successfully received your application submitted on our careers portal.</p>
    <p>Our recruitment team is always looking for skilled technicians, engineers, and specialists. We will review your educational qualification, experience, and certifications against our active projects and requirements across:</p>
    <ul class="bullet-points">
      <li>IT Infrastructure & Server Solutions</li>
      <li>CCTV & Enterprise Security Surveillance</li>
      <li>Access Control, Biometrics & Boom Barriers</li>
      <li>Structured Cabling & Networking</li>
      <li>Software Licensing & AMC Support</li>
    </ul>
    <p>Our team will contact you directly if your profile matches our requirements or when a suitable vacancy aligns with your background.</p>
    <p>Best Regards,<br/><strong>Recruitment Team</strong><br/>CG Techno Electronics</p>
  </div>
  <div class="footer">
    This is an automated confirmation email. Please do not reply directly to this email.<br/>
    &copy; ${new Date().getFullYear()} CG Techno Electronics. All rights reserved.
  </div>
</div>
</body>
</html>
  `;

  const adminEmail = process.env.CAREERS_EMAIL_TO || 'cgtechnoelectronics@gmail.com';
  const apiKey = process.env.RESEND_API_KEY;
  const useResend = apiKey && apiKey !== 're_placeholder_api_key';

  try {
    if (useResend) {
      console.log('Sending application emails via Resend API...');
      
      const fileBuffer = await fs.promises.readFile(resumeLocalPath);
      const base64Content = fileBuffer.toString('base64');

      // Send Admin Email
      await sendViaResend({
        from: 'CG Techno Careers Website <onboarding@resend.dev>',
        to: adminEmail,
        replyTo: data.email,
        subject: 'New Career Application',
        html: adminHtml,
        text: `New career application from ${data.fullName} (${data.email}, ${data.mobile}, City: ${data.city})\nQualification: ${data.qualification}, Exp: ${data.experience}\nInterests: ${data.interests.join(', ')}\nResume Link: ${resumeLink}\nResume Attached: ${resumeOriginalName}`,
        attachments: [
          {
            filename: resumeOriginalName,
            content: base64Content,
          },
        ],
      });

      // Send Applicant Email
      await sendViaResend({
        from: 'CG Techno Electronics HR <onboarding@resend.dev>',
        to: data.email,
        subject: 'Application Received – CG Techno',
        html: applicantHtml,
        text: `Dear ${data.fullName},\n\nThank you for submitting your application to CG Techno Electronics. We have received your details. Our HR team will review your profile and contact you if it aligns with our business requirements.\n\nBest Regards,\nRecruitment Team\nCG Techno Electronics`,
      });

    } else {
      console.log('Sending application emails via SMTP Transporter...');

      // Send Admin Email
      await transporter.sendMail({
        from: `"CG Techno Careers Portal" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        replyTo: data.email,
        subject: 'New Career Application',
        html: adminHtml,
        text: `New career application from ${data.fullName} (${data.email}, ${data.mobile}, City: ${data.city})\nQualification: ${data.qualification}, Exp: ${data.experience}\nInterests: ${data.interests.join(', ')}\nResume Link: ${resumeLink}\nResume Attached: ${resumeOriginalName}`,
        attachments: [
          {
            filename: resumeOriginalName,
            path: resumeLocalPath,
          },
        ],
      });

      // Send Applicant Email
      await transporter.sendMail({
        from: `"CG Techno Electronics HR" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: 'Application Received – CG Techno',
        html: applicantHtml,
        text: `Dear ${data.fullName},\n\nThank you for submitting your application to CG Techno Electronics. We have received your details. Our HR team will review your profile and contact you if it aligns with our business requirements.\n\nBest Regards,\nRecruitment Team\nCG Techno Electronics`,
      });
    }
  } catch (error) {
    console.error('[sendApplicationEmails] Error sending application email via transporter/Resend:', error);
    throw error;
  }
}
