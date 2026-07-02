import { prisma } from './prisma';

interface AuditLogInput {
  userId?: string;
  userEmail?: string;
  action: string;      // e.g., 'LOGIN', 'LOGOUT', 'DELETE_ENQUIRY', 'STATUS_CHANGE', 'DOWNLOAD_RESUME', 'EMAIL_RETRY'
  entity: string;      // e.g., 'AdminUser', 'Enquiry', 'CareerApplication', 'EmailLog'
  entityId?: string;
  result: 'SUCCESS' | 'FAILURE';
  ipAddress?: string;
  userAgent?: string;
  details?: string;
}

/**
 * Creates an immutable Audit Log entry in the database.
 * Encapsulates the operations to ensure security logging is robust.
 */
export async function createAuditLog(input: AuditLogInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: input.userId || null,
        userEmail: input.userEmail || null,
        action: input.action,
        entity: input.entity,
        entityId: input.entityId || null,
        result: input.result,
        ipAddress: input.ipAddress || null,
        userAgent: input.userAgent || null,
        details: input.details || null,
      },
    });
    console.log(`[AuditLog] ${input.action} on ${input.entity} (${input.result}) recorded.`);
  } catch (error) {
    console.error('[AuditLog Error] Failed to write audit log to database:', error);
  }
}

/**
 * Triggers alert hooks for high-severity security occurrences.
 * E.g., multiple failed logins, unusual volume, rate limits.
 */
export async function triggerSecurityAlert(
  alertType: string,
  details: {
    ipAddress?: string;
    email?: string;
    description: string;
    [key: string]: any;
  }
): Promise<void> {
  const timestamp = new Date().toISOString();
  
  // 1. Log alert internally with highlighted prefix for log aggregators
  console.error(
    `[SECURITY_ALERT] [Type: ${alertType}] [Timestamp: ${timestamp}] [IP: ${details.ipAddress || 'N/A'}] [Email: ${details.email || 'N/A'}] Details: ${details.description}`,
    JSON.stringify(details)
  );

  // 2. Save incident in audit log as a FAILURE entity event for durability
  await createAuditLog({
    userEmail: details.email,
    action: `SECURITY_ALERT_${alertType}`,
    entity: 'SecuritySystem',
    result: 'FAILURE',
    ipAddress: details.ipAddress,
    details: `Alert raised: ${details.description}`,
  });
}
