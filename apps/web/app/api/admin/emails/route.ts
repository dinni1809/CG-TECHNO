import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getEmailDashboardMetrics } from '@/lib/email';
import { EmailStatus, EmailTemplate } from '@prisma/client';
import { withHardenedAPI } from '@/lib/api-middleware';
import { createAuditLog } from '@/lib/audit';
import { z } from 'zod';

// GET handler - fetch email logs
export const GET = withHardenedAPI(
  ['SUPER_ADMIN', 'ADMIN']
)(async (request: NextRequest, { session }) => {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') as EmailStatus | null;
  const template = searchParams.get('template') as EmailTemplate | null;
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.max(1, parseInt(searchParams.get('limit') || '20'));
  const skip = (page - 1) * limit;

  const where: any = {
    deletedAt: null,
  };

  if (status) {
    where.status = status;
  }
  if (template) {
    where.template = template;
  }
  if (search) {
    where.OR = [
      { to: { contains: search, mode: 'insensitive' } },
      { subject: { contains: search, mode: 'insensitive' } },
      { correlationId: { contains: search, mode: 'insensitive' } },
      { source: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [logs, totalCount, metrics] = await Promise.all([
    prisma.emailLog.findMany({
      where,
      include: {
        attachments: true,
        events: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.emailLog.count({ where }),
    getEmailDashboardMetrics(),
  ]);

  return NextResponse.json({
    success: true,
    logs,
    metrics,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    },
  });
});

const DeleteEmailLogSchema = z.object({
  id: z.string().uuid(),
});

// DELETE handler - soft delete email log
export const DELETE = withHardenedAPI(
  ['SUPER_ADMIN', 'ADMIN'],
  DeleteEmailLogSchema
)(async (request: NextRequest, { session, body }) => {
  const { id } = body;

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
  const userAgent = request.headers.get('user-agent') || 'unknown-ua';

  await prisma.emailLog.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  // Create audit log for soft delete (Phase 7)
  await createAuditLog({
    userId: (session.user as any).id,
    userEmail: session.user.email || undefined,
    action: 'DELETE_RECORD',
    entity: 'EmailLog',
    entityId: id,
    result: 'SUCCESS',
    ipAddress: ip,
    userAgent,
    details: `Soft deleted email log ID ${id}`,
  });

  return NextResponse.json({ success: true, message: 'Email log soft deleted successfully.' });
});
