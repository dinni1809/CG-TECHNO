import React from 'react';

interface ContactConfirmationProps {
  customerName: string;
  serviceSelected: string;
}

export const ContactConfirmation: React.FC<ContactConfirmationProps> = ({
  customerName,
  serviceSelected,
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
          background: 'linear-gradient(135deg, #1e3b8a, #0f172a)',
          color: '#ffffff',
          padding: '40px 24px',
          textAlign: 'center',
        }}>
          {/* Logo or Branded Text */}
          <div style={{
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '0.05em',
            marginBottom: '8px',
            textTransform: 'uppercase',
          }}>
            CG TECHNO
          </div>
          <div style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}>
            Electronics & Integration Solutions
          </div>
        </div>

        {/* Body Content */}
        <div style={{
          padding: '40px 32px',
          lineHeight: '1.7',
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#111827',
            margin: '0 0 16px 0',
          }}>
            Enquiry Received
          </h2>
          
          <p style={{ fontSize: '16px', color: '#4b5563', margin: '0 0 24px 0' }}>
            Dear <strong>{customerName}</strong>,
          </p>

          <p style={{ fontSize: '15px', color: '#4b5563', margin: '0 0 24px 0' }}>
            Thank you for contacting CG Techno Electronics. We have successfully received your enquiry regarding the following service:
          </p>

          {/* Details Box */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderLeft: '4px solid #3b82f6',
            padding: '16px 20px',
            borderRadius: '0 8px 8px 0',
            margin: '0 0 28px 0',
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#6b7280',
              letterSpacing: '0.05em',
              marginBottom: '4px',
            }}>
              Service Selected
            </div>
            <div style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#1e3b8a',
            }}>
              {serviceSelected}
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#4b5563', margin: '0 0 28px 0' }}>
            Our corporate solutions team will review your requirements and get in touch with you shortly. We aim to respond with a tailored proposal or call schedule within <strong>24 business hours</strong>.
          </p>

          {/* Divider */}
          <div style={{
            height: '1px',
            backgroundColor: '#e5e7eb',
            margin: '32px 0',
          }} />

          {/* Contact Details */}
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
          }}>
            <strong style={{ color: '#374151' }}>CG Techno Electronics</strong><br />
            🌐 Website: <a href="https://www.cgtechnoelectronics.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>www.cgtechnoelectronics.com</a><br />
            📞 Phone: <a href="tel:+919876543210" style={{ color: '#3b82f6', textDecoration: 'none' }}>+91 98765 43210</a><br />
            ✉️ Email: <a href="mailto:info@cgtechnoelectronics.com" style={{ color: '#3b82f6', textDecoration: 'none' }}>info@cgtechnoelectronics.com</a>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          padding: '24px 32px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#9ca3af',
        }}>
          This is an automated confirmation of receipt. Please do not reply directly to this email.<br />
          &copy; {new Date().getFullYear()} CG Techno Electronics. All rights reserved.
        </div>
      </div>
    </div>
  );
};
