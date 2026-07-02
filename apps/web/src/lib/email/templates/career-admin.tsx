import React from 'react';

interface CareerAdminProps {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  experience: string;
  interests: string[];
  resumeOriginalName: string;
  timestamp: string;
  resumeUrl?: string;
}

export const CareerAdmin: React.FC<CareerAdminProps> = ({
  name,
  email,
  phone,
  qualification,
  experience,
  interests,
  resumeOriginalName,
  timestamp,
  resumeUrl,
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
        maxWidth: '650px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
      }}>
        {/* Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #06142d, #1e40af)',
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
            NEW CAREER APPLICATION
          </div>
          <div style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}>
            CG Techno Talent Acquisition Portal
          </div>
        </div>

        {/* Body Content */}
        <div style={{
          padding: '36px 24px',
          lineHeight: '1.6',
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: '#1e40af',
            borderBottom: '2px solid #eff6ff',
            paddingBottom: '6px',
            marginBottom: '20px',
          }}>
            Candidate Profile Summary
          </div>

          {[
            { label: 'Candidate Name', value: name },
            { label: 'Email Address', value: email, href: `mailto:${email}` },
            { label: 'Mobile Number', value: phone, href: `tel:${phone}` },
            { label: 'Highest Qualification', value: qualification },
            { label: 'Years of Experience', value: experience },
            { label: 'Resume File', value: resumeOriginalName, href: resumeUrl, isHighlight: true },
            { label: 'Submission Timestamp', value: timestamp },
          ].map((field, idx) => {
            if (!field.value) return null;
            return (
              <div key={idx} style={{ marginBottom: '16px' }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#6b7280',
                  marginBottom: '4px',
                }}>
                  {field.label}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#111827',
                  backgroundColor: '#f8fafc',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  borderLeft: field.isHighlight ? '3px solid #f59e0b' : '3px solid #3b82f6',
                  fontWeight: field.isHighlight ? 'bold' : 'normal',
                }}>
                  {field.href ? (
                    <a href={field.href} style={{ color: '#1e40af', textDecoration: 'none' }}>
                      {field.value}
                    </a>
                  ) : (
                    field.value
                  )}
                </div>
              </div>
            );
          })}

          <div style={{
            fontSize: '14px',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: '#1e40af',
            borderBottom: '2px solid #eff6ff',
            paddingBottom: '6px',
            marginTop: '28px',
            marginBottom: '16px',
          }}>
            Areas of Interest
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
          }}>
            {interests && interests.length > 0 ? (
              interests.map((interest, idx) => (
                <span key={idx} style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  backgroundColor: '#eff6ff',
                  color: '#1e40af',
                  border: '1px solid #bfdbfe',
                  marginRight: '6px',
                  marginBottom: '6px',
                }}>
                  {interest}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '14px', color: '#4b5563' }}>None specified</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: '#f3f4f6',
          borderTop: '1px solid #e5e7eb',
          padding: '20px 24px',
          textAlign: 'center',
          fontSize: '11px',
          color: '#9ca3af',
        }}>
          This application was received via the web recruitment portal. The candidate's resume has been uploaded and is attached to this email.
        </div>
      </div>
    </div>
  );
};
