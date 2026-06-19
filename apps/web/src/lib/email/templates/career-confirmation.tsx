import React from 'react';

interface CareerConfirmationProps {
  applicantName: string;
}

export const CareerConfirmation: React.FC<CareerConfirmationProps> = ({
  applicantName,
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
          background: 'linear-gradient(135deg, #0f172a, #1e40af)',
          color: '#ffffff',
          padding: '40px 24px',
          textAlign: 'center',
        }}>
          {/* Logo */}
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
            Careers & Talent Acquisition
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
            Application Received
          </h2>

          <p style={{ fontSize: '16px', color: '#4b5563', margin: '0 0 24px 0' }}>
            Dear <strong>{applicantName}</strong>,
          </p>

          <p style={{ fontSize: '15px', color: '#4b5563', margin: '0 0 24px 0' }}>
            Thank you for applying for a career opportunity with <strong>CG Techno Electronics</strong>. We have successfully received your details and uploaded resume.
          </p>

          {/* Process Overview section */}
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#111827',
            margin: '28px 0 12px 0',
          }}>
            Recruitment Process Overview
          </h3>
          
          <p style={{ fontSize: '15px', color: '#4b5563', margin: '0 0 16px 0' }}>
            Our corporate HR specialists review applications against active project needs across our primary technology integration domains:
          </p>

          <ul style={{
            margin: '0 0 24px 0',
            paddingLeft: '20px',
            fontSize: '14px',
            color: '#4b5563',
          }}>
            <li style={{ marginBottom: '8px' }}>IT Infrastructure, Server and Enterprise Network Design</li>
            <li style={{ marginBottom: '8px' }}>CCTV Surveillance & Integration Systems</li>
            <li style={{ marginBottom: '8px' }}>Access Control, Biometrics & Automated Barriers</li>
            <li style={{ marginBottom: '8px' }}>Structured Cabling & Building Integration Solutions</li>
            <li style={{ marginBottom: '8px' }}>Corporate SLA Services & AMC Support</li>
          </ul>

          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#111827',
            margin: '28px 0 12px 0',
          }}>
            HR Follow-Up Information
          </h3>

          <p style={{ fontSize: '15px', color: '#4b5563', margin: '0 0 24px 0' }}>
            Our talent team regularly screens incoming resumes. If your background and experience align with any of our active roles, we will contact you directly to schedule a brief screening call or virtual interview. If we do not have an immediate opening matching your profile, we will retain your resume securely in our database for future opportunities.
          </p>

          {/* Divider */}
          <div style={{
            height: '1px',
            backgroundColor: '#e5e7eb',
            margin: '32px 0',
          }} />

          {/* Footer Contact Details */}
          <div style={{
            fontSize: '14px',
            color: '#6b7280',
          }}>
            <strong style={{ color: '#374151' }}>CG Techno Electronics (HR Department)</strong><br />
            🌐 Website: <a href="https://www.cgtechnoelectronics.com" style={{ color: '#1e40af', textDecoration: 'none' }}>www.cgtechnoelectronics.com</a><br />
            📞 Helpline: <a href="tel:+919876543210" style={{ color: '#1e40af', textDecoration: 'none' }}>+91 98765 43210</a><br />
            ✉️ Email: <a href="mailto:careers@cgtechnoelectronics.com" style={{ color: '#1e40af', textDecoration: 'none' }}>careers@cgtechnoelectronics.com</a>
          </div>
        </div>

        {/* Footer Banner */}
        <div style={{
          backgroundColor: '#f3f4f6',
          borderTop: '1px solid #e5e7eb',
          padding: '24px 32px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#9ca3af',
        }}>
          This is an automated confirmation of receipt. Please do not reply directly to this address.<br />
          &copy; {new Date().getFullYear()} CG Techno Electronics. All rights reserved.
        </div>
      </div>
    </div>
  );
};
