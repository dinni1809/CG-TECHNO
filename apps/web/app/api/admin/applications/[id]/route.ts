import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withHardenedAPI } from '@/lib/api-middleware';
import { createAuditLog } from '@/lib/audit';
import { z } from 'zod';

const UpdateApplicationSchema = z.object({
  status: z.enum(['NEW', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'SELECTED', 'REJECTED']),
});

// PUT handler - update application status
export const PUT = withHardenedAPI(
  ['SUPER_ADMIN', 'ADMIN', 'HR'],
  UpdateApplicationSchema
)(async (request: NextRequest, { params, session, body }) => {
  const { id } = params;
  const { status } = body;

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
  const userAgent = request.headers.get('user-agent') || 'unknown-ua';

  const updatedApplication = await prisma.careerApplication.update({
    where: { id },
    data: { status },
  });

  // Create status change Audit Log (Phase 7)
  await createAuditLog({
    userId: (session.user as any).id,
    userEmail: session.user.email || undefined,
    action: 'STATUS_CHANGE',
    entity: 'CareerApplication',
    entityId: id,
    result: 'SUCCESS',
    ipAddress: ip,
    userAgent,
    details: `Updated career application status to ${status}`,
  });

  return NextResponse.json({ success: true, application: updatedApplication }, { status: 200 });
});
