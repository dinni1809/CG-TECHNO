import { NextRequest, NextResponse } from 'next/server';
import { ContactSchema } from '@cg-techno/features/schemas';
import { sendContactEmail } from '@cg-techno/features/email';
import { checkRateLimit } from '@cg-techno/utils';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const rateLimitResult = checkRateLimit(ip, 'contact');
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      const details = parsed.error.errors.map((e) => ({
        field: String(e.path[0]),
        message: e.message,
      }));
      return NextResponse.json(
        { success: false, error: 'Validation failed', details },
        { status: 400 }
      );
    }

    const { name, email, phone, message, service, product, company } = parsed.data;

    // 1. Save Enquiry Lead to PostgreSQL database using Prisma
    await prisma.enquiry.create({
      data: {
        fullName: name,
        email: email,
        mobile: phone,
        company: company || null,
        service: service || product || null,
        message: message,
        status: 'NEW',
      },
    });

    // 2. Trigger Email Workflows (Admin Alert + Customer Auto Reply)
    await sendContactEmail(parsed.data);

    return NextResponse.json(
      { success: true, message: 'Submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[/api/contact] Unhandled error:', error);
    return NextResponse.json(
      { success: false, error: 'Service temporarily unavailable. Please try again later or contact us directly.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
