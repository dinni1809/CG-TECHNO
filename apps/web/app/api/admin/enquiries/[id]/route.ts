import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withHardenedAPI } from '@/lib/api-middleware';
import { createAuditLog } from '@/lib/audit';
import { z } from 'zod';

const UpdateEnquirySchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUOTATION_SENT', 'NEGOTIATION', 'WON', 'LOST', 'ARCHIVED', 'CLOSED', 'RESOLVED', 'SPAM']),
});

// PUT handler - update enquiry status
export const PUT = withHardenedAPI(
  ['SUPER_ADMIN', 'ADMIN', 'SALES'],
  UpdateEnquirySchema
)(async (request: NextRequest, { params, session, body }) => {
  const { id } = params;
  const { status } = body;

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
  const userAgent = request.headers.get('user-agent') || 'unknown-ua';

  const updatedEnquiry = await prisma.enquiry.update({
    where: { id },
    data: { status },
  });

  // Create status change Audit Log (Phase 7)
  await createAuditLog({
    userId: (session.user as any).id,
    userEmail: session.user.email || undefined,
    action: 'STATUS_CHANGE',
    entity: 'Enquiry',
    entityId: id,
    result: 'SUCCESS',
    ipAddress: ip,
    userAgent,
    details: `Updated enquiry status to ${status}`,
  });

  return NextResponse.json({ success: true, enquiry: updatedEnquiry }, { status: 200 });
});

// DELETE handler - delete enquiry
export const DELETE = withHardenedAPI(
  ['SUPER_ADMIN', 'ADMIN'] // Sales cannot delete enquiries
)(async (request: NextRequest, { params, session }) => {
  const { id } = params;

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
  const userAgent = request.headers.get('user-agent') || 'unknown-ua';

  await prisma.enquiry.delete({
    where: { id },
  });

  // Create delete enquiry Audit Log (Phase 7)
  await createAuditLog({
    userId: (session.user as any).id,
    userEmail: session.user.email || undefined,
    action: 'DELETE_ENQUIRY',
    entity: 'Enquiry',
    entityId: id,
    result: 'SUCCESS',
    ipAddress: ip,
    userAgent,
    details: `Deleted enquiry ID ${id}`,
  });

  return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' }, { status: 200 });
});
