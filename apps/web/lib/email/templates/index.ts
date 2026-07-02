import React from 'react';
import { EmailTemplate } from '@prisma/client';
import { ContactConfirmation } from '@/src/lib/email/templates/contact-confirmation';
import { ContactAdmin } from '@/src/lib/email/templates/contact-admin';
import { CareerConfirmation } from '@/src/lib/email/templates/career-confirmation';
import { CareerAdmin } from '@/src/lib/email/templates/career-admin';

// Registry of React Email templates
export const EMAIL_TEMPLATES: Record<EmailTemplate, React.FC<any>> = {
  CONTACT_CONFIRMATION: ContactConfirmation,
  CONTACT_ADMIN: ContactAdmin,
  CAREER_CONFIRMATION: CareerConfirmation,
  CAREER_ADMIN: CareerAdmin,

  // Fallbacks and Extensible Placeholder Templates for future SaaS needs
  NEWSLETTER: ({ title, content }: { title: string; content: string }) =>
    React.createElement(
      'div',
      { style: { fontFamily: 'sans-serif', padding: '24px', color: '#1f2937', background: '#f9fafb' } },
      React.createElement('h2', { style: { color: '#1e3a8a' } }, title),
      React.createElement('div', { dangerouslySetInnerHTML: { __html: content } })
    ),

  OTP: ({ code }: { code: string }) =>
    React.createElement(
      'div',
      { style: { fontFamily: 'sans-serif', padding: '32px', textAlign: 'center', background: '#f3f4f6' } },
      React.createElement('h2', { style: { color: '#0f172a' } }, 'Security One-Time Password'),
      React.createElement(
        'div',
        {
          style: {
            fontSize: '32px',
            fontWeight: 'bold',
            letterSpacing: '6px',
            color: '#2563eb',
            background: '#ffffff',
            padding: '16px',
            borderRadius: '12px',
            margin: '24px auto',
            maxWidth: '240px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          },
        },
        code
      ),
      React.createElement('p', { style: { fontSize: '13px', color: '#6b7280' } }, 'This OTP is valid for 10 minutes.')
    ),

  SUPERVISOR_ALERT: ({ message, system }: { message: string; system: string }) =>
    React.createElement(
      'div',
      { style: { fontFamily: 'sans-serif', padding: '24px', borderLeft: '6px solid #dc2626', background: '#fef2f2' } },
      React.createElement('h2', { style: { color: '#991b1b', margin: 0 } }, 'Critical System Alert'),
      React.createElement('p', null, `System: ${system}`),
      React.createElement('pre', { style: { background: '#f3f4f6', padding: '12px', borderRadius: '6px' } }, message)
    ),

  SALES: ({ dealName, details }: { dealName: string; details: string }) =>
    React.createElement(
      'div',
      { style: { fontFamily: 'sans-serif', padding: '24px' } },
      React.createElement('h2', { style: { color: '#10b981' } }, `New Lead Opportunity: ${dealName}`),
      React.createElement('p', null, details)
    ),

  SUPPORT: ({ ticketId, subject }: { ticketId: string; subject: string }) =>
    React.createElement(
      'div',
      { style: { fontFamily: 'sans-serif', padding: '24px' } },
      React.createElement('h2', null, `Support Ticket #${ticketId} Opened`),
      React.createElement('p', null, `Subject: ${subject}`),
      React.createElement('p', null, 'Our technical staff is looking into your issue.')
    ),

  QUOTATION: ({ quoteNumber, total }: { quoteNumber: string; total: string }) =>
    React.createElement(
      'div',
      { style: { fontFamily: 'sans-serif', padding: '24px' } },
      React.createElement('h2', null, `Quotation Details — #${quoteNumber}`),
      React.createElement('p', null, `Total Project Quote: ${total}`)
    ),

  SYSTEM: ({ message }: { message: string }) =>
    React.createElement(
      'div',
      { style: { fontFamily: 'sans-serif', padding: '24px' } },
      React.createElement('h2', null, 'System Notification'),
      React.createElement('p', null, message)
    ),
};
