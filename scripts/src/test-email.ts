import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

// Helper to manually parse env files to simulate Next.js runtime environment loading
function loadEnvFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    content.split(/\r?\n/).forEach((line) => {
      // Ignore comments and empty lines
      if (line.trim().startsWith('#') || !line.trim()) return;
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        let value = parts.slice(1).join('=').trim();
        // Remove surrounding quotes
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        // Set if not already set (recursively matching how dotenv/Next.js processes envs)
        if (process.env[key] === undefined) {
          process.env[key] = value;
        }
      }
    });
  }
}

// Load root .env first, then apps/web/.env
const rootEnvPath = path.resolve(process.cwd(), '.env');
const webEnvPath = path.resolve(process.cwd(), 'apps/web/.env');

loadEnvFile(webEnvPath);
loadEnvFile(rootEnvPath);

async function runDiagnostics() {
  console.log('=== EMAIL SYSTEM CONFIGURATION AUDIT ===\n');

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.EMAIL_FROM;
  const resendKey = process.env.RESEND_API_KEY;

  console.log(`SMTP Host Loaded:   ${host ? `YES (${host})` : 'NO'}`);
  console.log(`SMTP Port Loaded:   ${port ? `YES (${port})` : 'NO'}`);
  console.log(`SMTP User Loaded:   ${user ? `YES (${user})` : 'NO'}`);
  console.log(`SMTP Pass Loaded:   ${password ? 'YES (Hidden)' : 'NO'}`);
  console.log(`EMAIL_FROM Loaded:  ${from ? `YES (${from})` : 'NO'}`);
  console.log(`RESEND_KEY Loaded:  ${resendKey ? `YES (${resendKey})` : 'NO'}`);
  console.log('\n----------------------------------------\n');

  // Check for configuration error
  const isResendConfigured = resendKey && resendKey !== 're_placeholder_api_key';
  const hasSmtpConfig = host && port && user && password;

  if (!isResendConfigured && !hasSmtpConfig) {
    console.log('Status: CONFIGURATION ERROR');
    console.log('Reason: Both Resend and SMTP configurations are missing or incomplete.');
    if (!host) console.log(' - Missing SMTP_HOST');
    if (!port) console.log(' - Missing SMTP_PORT');
    if (!user) console.log(' - Missing SMTP_USER');
    if (!password) console.log(' - Missing SMTP_PASSWORD');
    process.exit(1);
  }

  if (isResendConfigured) {
    console.log('Diagnostics: Resend API Key is configured. SMTP check skipped.');
    console.log('Status: SUCCESS (Resend configured)');
    return;
  }

  // Check SMTP connection
  console.log('Attempting SMTP connection...');
  try {
    const transporter = nodemailer.createTransport({
      host: host,
      port: Number(port),
      secure: false, // TLS
      auth: {
        user: user,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();
    console.log('✓ SMTP Connection successfully verified!');

    // Attempt sending a test email to the user
    console.log('Sending test email...');
    const sender = from || user;
    const info = await transporter.sendMail({
      from: `"CG Techno Test Script" <${sender}>`,
      to: user, // Send to self
      subject: 'CG Techno Email Diagnostics Test',
      text: 'This is a test email sent from the CG Techno Website email diagnostic script to verify connection and credentials.',
      html: '<p>This is a test email sent from the <b>CG Techno Website</b> email diagnostic script to verify connection and credentials.</p>',
    });

    console.log(`✓ Test email sent successfully! MessageId: ${info.messageId}`);
    console.log('\nStatus: SUCCESS');
  } catch (error: any) {
    console.log('\nStatus: FAILED');
    console.log(`Error Code: ${error.code || 'UNKNOWN'}`);
    console.log(`Error Message: ${error.message}`);
    console.log('\nStack Trace:');
    console.log(error.stack);
  }
}

runDiagnostics().catch((err) => {
  console.error('Diagnostic runner failed:', err);
  process.exit(1);
});
