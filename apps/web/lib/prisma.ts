import { PrismaClient } from '@prisma/client';

// Startup Environment Variables Validation
const REQUIRED_ENV_VARS = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'ADMIN_PASSWORD',
  'ADMIN_EMAIL',
  'RESEND_API_KEY',
  'BLOB_READ_WRITE_TOKEN',
];

const missingVars = REQUIRED_ENV_VARS.filter((envVar) => !process.env[envVar]);

if (missingVars.length > 0) {
  const errMsg = `CRITICAL STARTUP ERROR: Missing required environment variables: ${missingVars.join(', ')}`;
  console.error(errMsg);
  throw new Error(errMsg);
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
