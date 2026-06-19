import fs from 'fs';
import path from 'path';

// Helper to manually parse env files (dotenv fallback)
function loadEnv(filePath: string) {
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

// Load env files
loadEnv(path.resolve(process.cwd(), '.env'));
loadEnv(path.resolve(process.cwd(), 'apps/web/.env'));

import { sendContactConfirmation, sendContactAdminNotification } from '../src/lib/email/resend';

async function runDiagnostics() {
  console.log('=== RESEND EMAIL SYSTEM CONFIGURATION AUDIT ===\n');

  const apiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminEmails = process.env.ADMIN_EMAILS;

  console.log(`RESEND_API_KEY:  ${apiKey ? 'YES (Loaded)' : 'NO (Missing)'}`);
  console.log(`EMAIL_FROM:      ${emailFrom ? emailFrom : 'NO (Using onboarding@resend.dev fallback)'}`);
  console.log(`ADMIN_EMAIL:     ${adminEmail ? adminEmail : 'NO (Using cgtechnoelectronics@gmail.com fallback)'}`);
  console.log(`ADMIN_EMAILS:    ${adminEmails ? adminEmails : 'NO (Not configured, falling back to ADMIN_EMAIL)'}`);
  console.log('\n-----------------------------------------------\n');

  if (!apiKey || apiKey === 're_placeholder_api_key') {
    console.error('❌ Error: RESEND_API_KEY is not configured or is a placeholder.');
    process.exit(1);
  }

  // To test successfully in Resend Sandbox mode, we send both confirmation and admin tests to the admin address.
  const testRecipient = adminEmail || 'cgtechnoelectronics@gmail.com';
  console.log(`Testing with target recipient: ${testRecipient}`);

  // Test 1: Send Contact Confirmation
  console.log('\nSending Test 1: Customer Contact Confirmation...');
  try {
    await sendContactConfirmation(
      testRecipient,
      'Test User Name',
      'CCTV & Security Surveillance Solutions'
    );
    console.log('✅ Test 1: Customer Contact Confirmation sent successfully!');
  } catch (err) {
    console.error('❌ Test 1 failed:', err instanceof Error ? err.message : err);
  }

  // Test 2: Send Contact Admin Notification
  console.log('\nSending Test 2: Admin Notification...');
  try {
    await sendContactAdminNotification({
      name: 'Test Business User',
      email: 'test@business.com',
      phone: '+91 99999 88888',
      company: 'Test Enterprise Ltd',
      service: 'IT Infrastructure & Servers',
      subject: 'Urgent Server Setup Inquiry',
      message: 'This is a diagnostic message to verify that the Resend integration, multiple recipient parsing, and HTML layouts are working correctly.',
      timestamp: new Date(),
    });
    console.log('✅ Test 2: Admin Notification sent successfully!');
  } catch (err) {
    console.error('❌ Test 2 failed:', err instanceof Error ? err.message : err);
  }

  console.log('\n=== DIAGNOSTICS RUN COMPLETE ===');
}

runDiagnostics().catch((err) => {
  console.error('Runner error:', err);
  process.exit(1);
});
