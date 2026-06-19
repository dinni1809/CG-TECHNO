import { Resend } from 'resend';
import React from 'react';
import fs from 'fs';
import { ContactConfirmation } from './templates/contact-confirmation';
import { ContactAdmin } from './templates/contact-admin';
import { CareerConfirmation } from './templates/career-confirmation';
import { CareerAdmin } from './templates/career-admin';

// Initialize the Resend client with API Key
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_api_key');

// Get sender email from environment (fallback to Resend onboarding address)
const getEmailFrom = (): string => {
  return process.env.EMAIL_FROM || 'onboarding@resend.dev';
};

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

/**
 * 1. Contact Form - Customer Confirmation Email
 */
export async function sendContactConfirmation(
  to: string,
  customerName: string,
  serviceSelected: string
): Promise<void> {
  try {
    const emailFrom = getEmailFrom();
    const result = await resend.emails.send({
      from: `CG Techno Electronics <${emailFrom}>`,
      to,
      subject: 'Thank You for Contacting CG Techno Electronics',
      react: React.createElement(ContactConfirmation, {
        customerName,
        serviceSelected,
      }),
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
    console.log('Contact confirmation sent');
  } catch (error) {
    console.error('Email delivery failed', error);
    throw error; // Propagate error for the API route logger to capture details
  }
}

/**
 * 2. Contact Form - Admin Notification Email (Multiple Admins Supported)
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
  try {
    const emailFrom = getEmailFrom();
    const adminRecipients = getAdminEmails();

    const result = await resend.emails.send({
      from: `CG Techno Website Lead <${emailFrom}>`,
      to: adminRecipients,
      replyTo: data.email,
      subject: 'New Website Enquiry Received',
      react: React.createElement(ContactAdmin, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        subject: data.subject,
        message: data.message,
        timestamp: data.timestamp.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) + ' IST',
      }),
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
    console.log('Contact admin notification sent');
  } catch (error) {
    console.error('Email delivery failed', error);
    throw error;
  }
}

/**
 * 3. Career Form - Applicant Confirmation Email
 */
export async function sendCareerConfirmation(
  to: string,
  applicantName: string
): Promise<void> {
  try {
    const emailFrom = getEmailFrom();
    const result = await resend.emails.send({
      from: `CG Techno Careers <${emailFrom}>`,
      to,
      subject: 'Application Received – CG Techno Electronics',
      react: React.createElement(CareerConfirmation, {
        applicantName,
      }),
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
    console.log('Career confirmation sent');
  } catch (error) {
    console.error('Email delivery failed', error);
    throw error;
  }
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
  try {
    const emailFrom = getEmailFrom();
    const adminRecipients = getAdminEmails();

    const attachments: Array<{ filename: string; content: Buffer }> = [];
    if (resumeLocalPath && fs.existsSync(resumeLocalPath)) {
      try {
        const fileContent = fs.readFileSync(resumeLocalPath);
        attachments.push({
          filename: data.resumeOriginalName || 'resume.pdf',
          content: fileContent,
        });
      } catch (fileError) {
        console.warn(`[Warning] Could not attach resume file: ${fileError instanceof Error ? fileError.message : 'Unknown error'}`);
      }
    }

    const result = await resend.emails.send({
      from: `CG Techno Recruitment <${emailFrom}>`,
      to: adminRecipients,
      replyTo: data.email,
      subject: 'New Career Application Received',
      react: React.createElement(CareerAdmin, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        qualification: data.qualification,
        experience: data.experience,
        interests: data.interests,
        resumeOriginalName: data.resumeOriginalName,
        timestamp: data.timestamp.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }) + ' IST',
      }),
      attachments,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
    console.log('Career admin notification sent');
  } catch (error) {
    console.error('Email delivery failed', error);
    throw error;
  }
}

/**
 * FUTURE-PROOF STATUS UPDATE EMAIL WORKFLOWS
 * When HR changes an application's status in the dashboard, you can trigger email updates easily.
 * To integrate it later:
 * 1. Create a status update template (e.g. `src/lib/email/templates/status-update.tsx`).
 * 2. Import the template and export a function similar to the following:
 *
 * export async function sendStatusUpdateEmail(
 *   to: string,
 *   applicantName: string,
 *   newStatus: 'Applied' | 'Shortlisted' | 'Interview Scheduled' | 'Rejected' | 'Selected'
 * ): Promise<void> {
 *   try {
 *     const emailFrom = getEmailFrom();
 *     const result = await resend.emails.send({
 *       from: `CG Techno HR <${emailFrom}>`,
 *       to,
 *       subject: `Application Update: ${newStatus} – CG Techno Electronics`,
 *       react: React.createElement(StatusUpdateTemplate, { applicantName, newStatus }),
 *     });
 *     if (result.error) throw new Error(result.error.message);
 *     console.log(`Status update email (${newStatus}) sent to ${to}`);
 *   } catch (error) {
 *     console.error('Email delivery failed', error);
 *   }
 * }
 */
