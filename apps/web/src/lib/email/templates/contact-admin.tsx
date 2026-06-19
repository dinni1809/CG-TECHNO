import React from 'react';

interface ContactAdminProps {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  subject?: string;
  message: string;
  timestamp: string;
}

export const ContactAdmin: React.FC<ContactAdminProps> = ({
  name,
  email,
  phone,
  company,
  service,
  subject,
  message,
  timestamp,
}) => {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#1f2937',
      backgroundColor: '#f3f4f6',
      padding: '40px 20px',
      margin: 0,
      width: '100%',
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
      }}>
        {/* Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
          color: '#ffffff',
          padding: '36px 24px',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '0.05em',
            marginBottom: '4px',
          }}>
            NEW ENQUIRY RECEIVED
          </div>
          <div style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}>
            CG Techno Website B2B Lead Alert
          </div>
        </div>

        {/* Body Content */}
        <div style={{
          padding: '36px 24px',
          lineHeight: '1.6',
        }}>
          {/* Form Fields */}
          {[
            { label: 'Lead Source', value: 'Website', isHighlight: true },
            { label: 'Customer Name', value: name },
            { label: 'Email Address', value: email, href: `mailto:${email}` },
            { label: 'Mobile Number', value: phone, href: `tel:${phone}` },
            { label: 'Company / Organization', value: company || 'Not provided' },
            { label: 'Service of Interest', value: service || 'General Enquiry' },
            { label: 'Subject', value: subject || 'Not specified' },
            { label: 'Enquiry Message', value: message, isPre: true },
            { label: 'Submission Timestamp', value: timestamp },
          ].map((field, idx) => {
            if (!field.value) return null;
            return (
              <div key={idx} style={{ marginBottom: '20px' }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#6b7280',
                  marginBottom: '4px',
                }}>
                  {field.label}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#111827',
                  backgroundColor: field.isHighlight ? '#eff6ff' : '#f9fafb',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  borderLeft: field.isHighlight ? '4px solid #2563eb' : '4px solid #9ca3af',
                  whiteSpace: field.isPre ? 'pre-wrap' : 'normal',
                  wordBreak: 'break-word',
                  fontWeight: field.isHighlight ? 600 : 400,
                }}>
                  {field.href ? (
                    <a href={field.href} style={{ color: '#2563eb', textDecoration: 'none' }}>
                      {field.value}
                    </a>
                  ) : (
                    field.value
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          padding: '20px 24px',
          textAlign: 'center',
          fontSize: '11px',
          color: '#9ca3af',
        }}>
          This is an automated administrative notification. Lead details have also been successfully logged to the dashboard database.
        </div>
      </div>
    </div>
  );
};
