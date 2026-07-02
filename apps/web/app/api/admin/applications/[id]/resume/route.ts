import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { createAuditLog } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
  const userAgent = request.headers.get('user-agent') || 'unknown-ua';
  const { id } = params;

  try {
    // 1. Authenticate session (Phase 1, Phase 8)
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Authorize role (Phase 4, Phase 8): Only SUPER_ADMIN, ADMIN, or HR
    const userRole = (session.user as any).role;
    if (!['SUPER_ADMIN', 'ADMIN', 'HR'].includes(userRole)) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    // 3. Find Application record in DB
    const application = await prisma.careerApplication.findUnique({
      where: { id },
    });

    if (!application || !application.resumeUrl) {
      return NextResponse.json({ success: false, error: 'Resume not found' }, { status: 404 });
    }

    // 4. Fetch the file stream from Vercel Blob storage
    const fileResponse = await fetch(application.resumeUrl);
    if (!fileResponse.ok) {
      console.error(`[Resume Download Error] Failed to fetch raw blob from Vercel Blob URL: ${application.resumeUrl}`);
      return NextResponse.json({ success: false, error: 'Failed to retrieve resume from cloud storage' }, { status: 502 });
    }

    const contentType = fileResponse.headers.get('content-type') || 'application/octet-stream';
    const fileBuffer = await fileResponse.arrayBuffer();

    const filename = `${application.fullName.replace(/\s+/g, '_')}_Resume.${application.resumeUrl.split('.').pop()}`;

    // 5. Create audit log for the resume download (Phase 7, Phase 8)
    await createAuditLog({
      userId: (session.user as any).id,
      userEmail: session.user.email || undefined,
      action: 'RESUME_DOWNLOAD',
      entity: 'CareerApplication',
      entityId: id,
      result: 'SUCCESS',
      ipAddress: ip,
      userAgent,
      details: `Downloaded resume for candidate ${application.fullName}`,
    });

    // 6. Return response stream
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });

  } catch (error) {
    // Phase 11 & Phase 13: Generic errors only
    console.error(`[Resume Download Error] Unhandled exception downloading resume ID ${id}:`, error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
