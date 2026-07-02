import { CommunicationEngine } from '@/lib/email';
import fs from 'fs';

// Parse admin emails (comma-separated list support, fallback to ADMIN_EMAIL or default)
const getAdminEmails = (): string[] => {
  const adminEmails = process.env.ADMIN_EMAILS;
  if (adminEmails) {
    return adminEmails.split(',').map((email) => email.trim()).filter(Boolean);
  }
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    return adminEmail.split(',').map((email) => email.trim()).filter(Boolean);
  }
  return ['cgtechnoelectronics@gmail.com'];
};

// Helper to build secure attachment structures
function resolveAttachmentDetails(path?: string, filename?: string) {
  if (!path) return undefined;
  const resolvedName = filename || path.split('/').pop() || 'resume.pdf';
  let size = 180000; // Safe 180KB fallback size
  let mime = 'application/pdf';

  if (resolvedName.endsWith('.doc')) mime = 'application/msword';
  if (resolvedName.endsWith('.docx')) mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  if (!path.startsWith('http')) {
    try {
      if (fs.existsSync(path)) {
        size = fs.statSync(path).size;
      }
    } catch {}
  }

  return [
    {
      filename: resolvedName,
      size,
      mime,
      blobUrl: path,
      provider: path.startsWith('http') ? 'vercel-blob' : 'local',
    },
  ];
}

/**
 * 1. Contact Form - Customer Confirmation Email
 */
export async function sendContactConfirmation(
  to: string,
  customerName: string,
  serviceSelected: string
): Promise<void> {
  const correlationId = `contact-confirm-${Date.now()}`;
  await CommunicationEngine.dispatch('EMAIL', {
    correlationId,
    to,
    subject: 'Thank You for Contacting CG Techno Electronics',
    template: 'CONTACT_CONFIRMATION',
    metadata: {
      customerName,
      serviceSelected,
    },
    source: 'contact_form_customer',
  });
}

/**
 * 2. Contact Form - Admin Notification Email
 */
export async function sendContactAdminNotification(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  subject?: string;
  message: string;
  timestamp: Date;
}): Promise<void> {
  const adminRecipients = getAdminEmails();
  const correlationId = `contact-admin-${Date.now()}`;
  
  await CommunicationEngine.dispatch('EMAIL', {
    correlationId,
    to: adminRecipients,
    replyTo: data.email,
    subject: 'New Website Enquiry Received',
    template: 'CONTACT_ADMIN',
    metadata: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      service: data.service,
      subject: data.subject,
      message: data.message,
      timestamp: data.timestamp.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) + ' IST',
    },
    source: 'contact_form_admin',
  });
}

/**
 * 3. Career Form - Applicant Confirmation Email
 */
export async function sendCareerConfirmation(
  to: string,
  applicantName: string
): Promise<void> {
  const correlationId = `career-confirm-${Date.now()}`;
  await CommunicationEngine.dispatch('EMAIL', {
    correlationId,
    to,
    subject: 'Application Received – CG Techno Electronics',
    template: 'CAREER_CONFIRMATION',
    metadata: {
      applicantName,
    },
    source: 'career_form_customer',
  });
}

/**
 * 4. Career Form - HR/Admin Notification Email with Resume Attachment
 */
export async function sendCareerAdminNotification(
  data: {
    name: string;
    email: string;
    phone: string;
    qualification: string;
    experience: string;
    interests: string[];
    resumeOriginalName: string;
    timestamp: Date;
  },
  resumeLocalPath?: string
): Promise<void> {
  const adminRecipients = getAdminEmails();
  const correlationId = `career-admin-${Date.now()}`;
  const attachments = resolveAttachmentDetails(resumeLocalPath, data.resumeOriginalName);

  await CommunicationEngine.dispatch('EMAIL', {
    correlationId,
    to: adminRecipients,
    replyTo: data.email,
    subject: 'New Career Application Received',
    template: 'CAREER_ADMIN',
    metadata: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      qualification: data.qualification,
      experience: data.experience,
      interests: data.interests,
      resumeOriginalName: data.resumeOriginalName,
      resumeUrl: resumeLocalPath, // display button link fallback inside templates
      timestamp: data.timestamp.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) + ' IST',
    },
    attachments,
    source: 'career_form_admin',
  });
}
