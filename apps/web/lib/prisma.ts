import { PrismaClient } from '@prisma/client';

// Core Startup Environment Variables Validation (Mandatory - will crash if missing)
const MANDATORY_ENV_VARS = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'ADMIN_PASSWORD',
  'ADMIN_EMAIL',
];

// NEXTAUTH_URL is only required in non-Vercel deployments
if (!process.env.VERCEL) {
  MANDATORY_ENV_VARS.push('NEXTAUTH_URL');
}

// Optional integration keys (will print warning but not crash)
const OPTIONAL_INTEGRATION_VARS = [
  'RESEND_API_KEY',
  'BLOB_READ_WRITE_TOKEN',
];

// Bypass validation during Next.js static compilation/page generation (build phase)
const isBuildPhase =
  process.env.NEXT_PHASE === 'phase-production-build' ||
  process.env.NEXT_BUILD === 'true' ||
  (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL);

if (!isBuildPhase) {
  // Validate Mandatory variables
  const missingMandatory = MANDATORY_ENV_VARS.filter((envVar) => !process.env[envVar]);
  if (missingMandatory.length > 0) {
    const errMsg = `CRITICAL STARTUP ERROR: Missing required environment variables: ${missingMandatory.join(', ')}`;
    console.error(errMsg);
    throw new Error(errMsg);
  }

  // Validate and Warn for Optional variables
  const missingOptional = OPTIONAL_INTEGRATION_VARS.filter((envVar) => !process.env[envVar]);
  if (missingOptional.length > 0) {
    console.warn(
      `[Warning] Missing optional integration variables: ${missingOptional.join(', ')}. ` +
      `Corresponding features (Email alerts, Resume uploads) will be unavailable at runtime.`
    );
  }
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
