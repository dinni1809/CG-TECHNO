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

    // 1. Honeypot check
    if (body.website) {
      console.log('[Spam Alert] Honeypot field was filled in Contact Form submission.');
      return NextResponse.json(
        { success: true, message: 'Submitted successfully' },
        { status: 200 }
      );
    }

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

    // 2. Duplicate submission detection (5-minute window)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const existingEnquiry = await prisma.enquiry.findFirst({
      where: {
        email: email,
        message: message,
        createdAt: { gte: fiveMinutesAgo },
      },
    });

    if (existingEnquiry) {
      return NextResponse.json(
        { success: false, error: 'A duplicate enquiry was recently submitted. Please wait a moment.' },
        { status: 409 }
      );
    }

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

    // 2. Trigger Email Workflows (Admin Alert + Customer Auto Reply) in the background
    sendContactEmail(parsed.data).catch((emailError) => {
      console.error('Email workflow failed:', emailError);
    });

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
