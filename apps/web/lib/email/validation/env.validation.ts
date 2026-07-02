import { z } from 'zod';

export const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1).default('re_placeholder_api_key'),
  EMAIL_PROVIDER: z.enum(['RESEND', 'SENDGRID', 'SMTP', 'AWS_SES', 'POSTMARK', 'MOCK']).default('MOCK'),
  EMAIL_FROM_INFO: z.string().email().default('info@cgtechnoelectronics.com'),
  EMAIL_FROM_SUPPORT: z.string().email().default('support@cgtechnoelectronics.com'),
  EMAIL_FROM_CAREERS: z.string().email().default('careers@cgtechnoelectronics.com'),
  EMAIL_FROM_SALES: z.string().email().default('sales@cgtechnoelectronics.com'),
  EMAIL_REPLY_TO: z.string().email().default('info@cgtechnoelectronics.com'),
  EMAIL_ADMIN: z.string().email().default('cgtechnoelectronics@gmail.com'),
  EMAIL_HR: z.string().email().default('careers@cgtechnoelectronics.com'),
  EMAIL_SECURITY: z.string().email().default('security@cgtechnoelectronics.com'),
  APP_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export function validateEnv() {
  // Safe validation check
  const result = envSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_PROVIDER: process.env.EMAIL_PROVIDER,
    EMAIL_FROM_INFO: process.env.EMAIL_FROM_INFO,
    EMAIL_FROM_SUPPORT: process.env.EMAIL_FROM_SUPPORT,
    EMAIL_FROM_CAREERS: process.env.EMAIL_FROM_CAREERS,
    EMAIL_FROM_SALES: process.env.EMAIL_FROM_SALES,
    EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO,
    EMAIL_ADMIN: process.env.EMAIL_ADMIN,
    EMAIL_HR: process.env.EMAIL_HR,
    EMAIL_SECURITY: process.env.EMAIL_SECURITY,
    APP_ENV: process.env.NODE_ENV || 'development',
  });

  const isBuildPhase =
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.NEXT_BUILD === 'true' ||
    (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL);

  if (!result.success) {
    const errorDetails = JSON.stringify(result.error.format(), null, 2);
    console.warn(`[Communication Engine Startup WARNING] Environment variables are incomplete:`, errorDetails);
    
    if (!isBuildPhase && process.env.NODE_ENV === 'production') {
      const missingKeys = result.error.errors.map(e => e.path.join('.')).join(', ');
      throw new Error(`CRITICAL STARTUP ERROR: Missing or invalid environment variables for Communication Engine: ${missingKeys}`);
    }
  } else {
    console.log(`[Communication Engine Initialization] Environment validated successfully. Current Provider: ${result.data.EMAIL_PROVIDER}`);
  }
}
