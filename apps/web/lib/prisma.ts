import { PrismaClient } from '@prisma/client';

// Startup Environment Variables Validation
const REQUIRED_ENV_VARS = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'ADMIN_PASSWORD',
  'ADMIN_EMAIL',
  'RESEND_API_KEY',
  'BLOB_READ_WRITE_TOKEN',
];

// NEXTAUTH_URL is only required in non-Vercel deployments
if (!process.env.VERCEL) {
  REQUIRED_ENV_VARS.push('NEXTAUTH_URL');
}

// Bypass validation during Next.js static compilation/page generation (build phase)
const isBuildPhase =
  process.env.NEXT_PHASE === 'phase-production-build' ||
  process.env.NEXT_BUILD === 'true' ||
  (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL);

if (!isBuildPhase) {
  const missingVars = REQUIRED_ENV_VARS.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0) {
    const errMsg = `CRITICAL STARTUP ERROR: Missing required environment variables: ${missingVars.join(', ')}`;
    console.error(errMsg);
    throw new Error(errMsg);
  }
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
