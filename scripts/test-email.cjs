const fs = require('fs');
const path = require('path');

// Helper to manually parse env files (dotenv fallback)
function loadEnv(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    content.split(/\r?\n/).forEach((line) => {
      if (line.trim().startsWith('#') || !line.trim()) return;
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        let value = parts.slice(1).join('=').trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (process.env[key] === undefined) {
          process.env[key] = value;
        }
      }
    });
  }
}

// Load environment variables
loadEnv(path.resolve(process.cwd(), '.env'));
loadEnv(path.resolve(process.cwd(), 'apps/web/.env'));

async function sendViaResend(options) {
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
      to: Array.isArray(options.to) ? options.to : [options.to],
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
  
  return await response.json();
}

async function runDiagnostics() {
  console.log('=== RESEND EMAIL CONFIGURATION AUDIT ===\n');

  const apiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const adminEmail = process.env.ADMIN_EMAIL || 'cgtechnoelectronics@gmail.com';
  const adminEmailsVar = process.env.ADMIN_EMAILS;

  const adminRecipients = adminEmailsVar
    ? adminEmailsVar.split(',').map(e => e.trim()).filter(Boolean)
    : [adminEmail];

  console.log(`RESEND_API_KEY:  ${apiKey ? 'YES (Loaded)' : 'NO (Missing)'}`);
  console.log(`EMAIL_FROM:      ${emailFrom}`);
  console.log(`ADMIN_RECIPIENTS:${adminRecipients.join(', ')}`);
  console.log('\n----------------------------------------\n');

  if (!apiKey || apiKey === 're_placeholder_api_key') {
    console.error('❌ Error: RESEND_API_KEY is missing. Please set it in .env');
    process.exit(1);
  }

  const testRecipient = adminRecipients[0];
  console.log(`Sending tests to recipient: ${testRecipient}`);

  // Test 1: Customer Contact Confirmation Template Mock HTML
  const customerHtml = `
    <div style="font-family: Arial, sans-serif; color: #1f2937; background-color: #f3f4f6; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: linear-gradient(135deg, #1e3b8a, #0f172a); color: #ffffff; padding: 40px 24px; text-align: center;">
          <div style="font-size: 24px; font-weight: 800; letter-spacing: 0.05em; margin-bottom: 8px;">CG TECHNO</div>
          <div style="font-size: 12px; fontWeight: 600; text-transform: uppercase; opacity: 0.8;">Electronics & Integration Solutions</div>
        </div>
        <div style="padding: 40px 32px; line-height: 1.7;">
          <h2 style="font-size: 20px; color: #111827; margin: 0 0 16px 0;">Enquiry Received</h2>
          <p>Dear <strong>John Doe (Sandbox Client)</strong>,</p>
          <p>Thank you for contacting CG Techno Electronics. We have successfully received your enquiry regarding: <strong>CCTV & Security Surveillance Solutions</strong>.</p>
          <p>Our solutions team will get in touch with you within <strong>24 business hours</strong>.</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
          <div style="font-size: 14px; color: #6b7280;">
            <strong>CG Techno Electronics</strong><br />
            🌐 Website: <a href="https://www.cgtechnoelectronics.com" style="color: #3b82f6; text-decoration: none;">www.cgtechnoelectronics.com</a><br />
            📞 Phone: +91 98765 43210
          </div>
        </div>
      </div>
    </div>
  `;

  // Test 2: Admin Notification Template Mock HTML
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; color: #1f2937; background-color: #f3f4f6; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: linear-gradient(135deg, #0f172a, #1e3a8a); color: #ffffff; padding: 36px 24px; text-align: center;">
          <div style="font-size: 20px; font-weight: 800;">NEW ENQUIRY RECEIVED</div>
          <div style="font-size: 12px; opacity: 0.8;">CG Techno Website B2B Lead Alert</div>
        </div>
        <div style="padding: 36px 24px; line-height: 1.6;">
          <div style="margin-bottom: 20px;">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280;">Lead Source</div>
            <div style="font-size: 14px; background-color: #eff6ff; padding: 12px 16px; border-left: 4px solid #2563eb; border-radius: 8px; font-weight: bold;">Website</div>
          </div>
          <div style="margin-bottom: 20px;">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280;">Customer Name</div>
            <div style="font-size: 14px; background-color: #f9fafb; padding: 12px 16px; border-left: 4px solid #9ca3af; border-radius: 8px;">Diagnostic Client</div>
          </div>
          <div style="margin-bottom: 20px;">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280;">Message</div>
            <div style="font-size: 14px; background-color: #f9fafb; padding: 12px 16px; border-left: 4px solid #9ca3af; border-radius: 8px; white-space: pre-wrap;">Test message from Resend script</div>
          </div>
        </div>
      </div>
    </div>
  `;

  console.log('Sending Test 1: Customer Contact Confirmation email...');
  try {
    const res = await sendViaResend({
      from: `CG Techno Electronics <${emailFrom}>`,
      to: testRecipient,
      subject: 'Thank You for Contacting CG Techno Electronics (Diagnostics)',
      html: customerHtml,
    });
    console.log('✅ Test 1 Succeeded! Message ID:', res.id);
  } catch (err) {
    console.error('❌ Test 1 Failed:', err.message);
  }

  console.log('\nSending Test 2: Admin Notification email...');
  try {
    const res = await sendViaResend({
      from: `CG Techno Website Lead <${emailFrom}>`,
      to: adminRecipients,
      replyTo: 'client@example.com',
      subject: 'New Website Enquiry Received (Diagnostics)',
      html: adminHtml,
    });
    console.log('✅ Test 2 Succeeded! Message ID:', res.id);
  } catch (err) {
    console.error('❌ Test 2 Failed:', err.message);
  }

  console.log('\n=== DIAGNOSTICS COMPLETE ===');
}

runDiagnostics().catch(err => {
  console.error('Runner error:', err);
  process.exit(1);
});
