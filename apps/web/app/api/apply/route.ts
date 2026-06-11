import { NextRequest, NextResponse } from 'next/server';
import { ApplicationSchema } from '@cg-techno/features/schemas';
import { sendApplicationEmail } from '@cg-techno/features/email';
import { checkRateLimit } from '@cg-techno/utils';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const rateLimitResult = checkRateLimit(ip, 'apply');
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    const parsed = ApplicationSchema.safeParse(body);
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

    await sendApplicationEmail(parsed.data);

    return NextResponse.json(
      { success: true, message: 'Application received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[/api/apply] Unhandled error:', error);
    return NextResponse.json(
      { success: false, error: 'Email service unavailable. Please try again later or contact us directly.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
