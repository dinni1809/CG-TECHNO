import { NextRequest, NextResponse } from 'next/server';
import { retryFailedEmail, retryAllFailedEmails } from '@/lib/email';
import { withHardenedAPI } from '@/lib/api-middleware';
import { createAuditLog } from '@/lib/audit';
import { z } from 'zod';

const RetryEmailSchema = z.object({
  id: z.string().uuid().optional().nullable(),
});

// POST handler - retry a failed email or bulk retry
export const POST = withHardenedAPI(
  ['SUPER_ADMIN', 'ADMIN'],
  RetryEmailSchema,
  { limit: 5, windowSeconds: 60 }
)(async (request: NextRequest, { session, body }) => {
  const { id } = body;

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
  const userAgent = request.headers.get('user-agent') || 'unknown-ua';

  if (id) {
    console.log(`[/api/admin/emails/retry] Administrator requested manual retry for log "${id}"`);
    const success = await retryFailedEmail(id);
    if (success) {
      // Create retry Audit Log (Phase 7)
      await createAuditLog({
        userId: (session.user as any).id,
        userEmail: session.user.email || undefined,
        action: 'EMAIL_RETRY',
        entity: 'EmailLog',
        entityId: id,
        result: 'SUCCESS',
        ipAddress: ip,
        userAgent,
        details: `Manually retried email log ID ${id}`,
      });

      return NextResponse.json({
        success: true,
        message: `Email retry succeeded for log ID ${id}.`,
      });
    } else {
      // Create failed retry Audit Log (Phase 7)
      await createAuditLog({
        userId: (session.user as any).id,
        userEmail: session.user.email || undefined,
        action: 'EMAIL_RETRY',
        entity: 'EmailLog',
        entityId: id,
        result: 'FAILURE',
        ipAddress: ip,
        userAgent,
        details: `Manual retry failed for email log ID ${id}`,
      });

      return NextResponse.json(
        {
          success: false,
          error: `Email retry failed for log ID ${id}.`,
        },
        { status: 500 }
      );
    }
  } else {
    console.log('[/api/admin/emails/retry] Administrator requested bulk retry of failed emails');
    const stats = await retryAllFailedEmails();

    // Create bulk retry Audit Log (Phase 7)
    await createAuditLog({
      userId: (session.user as any).id,
      userEmail: session.user.email || undefined,
      action: 'EMAIL_RETRY',
      entity: 'EmailLog',
      result: 'SUCCESS',
      ipAddress: ip,
      userAgent,
      details: `Bulk retried failed emails. Stats: ${JSON.stringify(stats)}`,
    });

    return NextResponse.json({
      success: true,
      message: 'Bulk retry completed.',
      stats,
    });
  }
});
