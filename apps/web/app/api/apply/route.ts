import { NextRequest, NextResponse } from 'next/server';
import { ApplicationSchema } from '@cg-techno/features/schemas';
import { sendCareerConfirmation, sendCareerAdminNotification } from '@/src/lib/email/resend';
import { checkRateLimit } from '@cg-techno/utils';
import { prisma } from '@/lib/prisma';
import { put } from '@vercel/blob';
import crypto from 'crypto';

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

    // Parse multipart form data
    const formData = await request.formData();

    // 1. Honeypot check
    const website = formData.get('website') as string | null;
    if (website) {
      console.log('[Spam Alert] Honeypot field was filled in Career Application Form.');
      return NextResponse.json(
        { success: true, message: 'Application received and saved successfully.' },
        { status: 200 }
      );
    }
    
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const mobile = formData.get('mobile') as string;
    const city = formData.get('city') as string;
    const qualification = formData.get('qualification') as string;
    const fieldOfStudy = formData.get('fieldOfStudy') as string;
    const experience = formData.get('experience') as string;
    const interests = formData.getAll('interests') as string[];
    const preference = formData.get('preference') as string;
    const availability = formData.get('availability') as string;
    const certifications = (formData.get('certifications') as string | null) || undefined;
    const linkedinUrl = (formData.get('linkedinUrl') as string | null) || undefined;
    const portfolioUrl = (formData.get('portfolioUrl') as string | null) || undefined;
    const hasDrivingLicense = formData.get('hasDrivingLicense') as string;
    const willingToTravel = formData.get('willingToTravel') as string;
    const additionalInfo = (formData.get('additionalInfo') as string | null) || undefined;
    const resume = formData.get('resume') as File | null;

    // Validate textual fields via schema
    const parsed = ApplicationSchema.safeParse({
      fullName,
      email,
      mobile,
      city,
      qualification,
      fieldOfStudy,
      experience,
      interests,
      preference,
      availability,
      certifications,
      linkedinUrl,
      portfolioUrl,
      hasDrivingLicense,
      willingToTravel,
      additionalInfo,
    });

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

    // 2. Duplicate submission detection (5-minute window)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const existingApplication = await prisma.careerApplication.findFirst({
      where: {
        email: email,
        createdAt: { gte: fiveMinutesAgo },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { success: false, error: 'You have already submitted an application recently. Please try again later.' },
        { status: 409 }
      );
    }

    // Validate resume file
    if (!resume || !(resume instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'Resume file is required.' },
        { status: 400 }
      );
    }

    if (resume.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Resume file must be smaller than 4MB.' },
        { status: 400 }
      );
    }

    const originalName = resume.name;
    const extension = originalName.split('.').pop()?.toLowerCase();
    if (!extension || !['pdf', 'doc', 'docx'].includes(extension)) {
      return NextResponse.json(
        { success: false, error: 'Only PDF, DOC, and DOCX files are allowed.' },
        { status: 400 }
      );
    }

    // Upload file to Vercel Blob permanent cloud storage
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    const isMockBlobToken = !blobToken || blobToken.startsWith('vercel_blob_rw_mock') || blobToken.includes('mock') || blobToken.includes('placeholder');

    if (isMockBlobToken) {
      console.error('[/api/apply] Resume upload failed: BLOB_READ_WRITE_TOKEN is not configured or is a placeholder.');
      return NextResponse.json(
        { success: false, error: 'Resume upload storage is not configured. Please contact support or configure BLOB_READ_WRITE_TOKEN.' },
        { status: 503 }
      );
    }

    let resumeUrl = '';
    try {
      const fileBuffer = Buffer.from(await resume.arrayBuffer());
      const uniqueFilename = `resumes/resume-${Date.now()}-${crypto.randomUUID()}.${extension}`;
      const blob = await put(uniqueFilename, fileBuffer, {
        access: 'public',
        contentType: resume.type || 'application/pdf',
      });
      resumeUrl = blob.url;
      console.log('[/api/apply] Successfully uploaded resume to Vercel Blob:', resumeUrl);
    } catch (blobError) {
      console.error('[/api/apply] Vercel Blob upload failed:', blobError);
      return NextResponse.json(
        { success: false, error: 'Failed to upload resume to cloud storage. Please check connection and try again.' },
        { status: 500 }
      );
    }

    // Save record to database using Prisma
    const appData = parsed.data;
    const application = await prisma.careerApplication.create({
      data: {
        fullName: appData.fullName,
        email: appData.email,
        mobile: appData.mobile,
        city: appData.city,
        qualification: appData.qualification,
        fieldOfStudy: appData.fieldOfStudy,
        experience: appData.experience,
        interests: appData.interests,
        preference: appData.preference,
        availability: appData.availability,
        certifications: appData.certifications || null,
        linkedinUrl: appData.linkedinUrl || null,
        portfolioUrl: appData.portfolioUrl || null,
        hasDrivingLicense: appData.hasDrivingLicense === 'Yes',
        willingToTravel: appData.willingToTravel === 'Yes',
        resumeUrl: resumeUrl,
        additionalInfo: appData.additionalInfo || null,
        status: 'NEW',
      },
    });

    // Send emails (confirmation to applicant and notification to admin)
    try {
      await sendCareerConfirmation(appData.email, appData.fullName);
    } catch (emailError) {
      // Error is already logged as 'Email delivery failed' inside the service function
    }

    try {
      await sendCareerAdminNotification(
        {
          name: appData.fullName,
          email: appData.email,
          phone: appData.mobile,
          qualification: appData.qualification,
          experience: appData.experience,
          interests: appData.interests,
          resumeOriginalName: originalName,
          timestamp: new Date(),
        },
        resumeUrl
      );
    } catch (emailError) {
      // Error is already logged as 'Email delivery failed' inside the service function
    }

    return NextResponse.json(
      { success: true, message: 'Application received and saved successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[/api/apply] Unhandled error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
