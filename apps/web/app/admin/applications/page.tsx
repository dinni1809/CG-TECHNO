import { prisma } from '@/lib/prisma';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ApplicationManager } from '@/components/admin/ApplicationManager';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable server component caching to ensure fresh metrics are fetched on each reload

export default async function AdminApplications() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/admin/login');
  }

  // Role verification: Careers are accessible by SUPER_ADMIN, ADMIN, and HR
  if (!['SUPER_ADMIN', 'ADMIN', 'HR'].includes((session?.user as any)?.role || '')) {
    redirect('/admin/dashboard?error=unauthorized');
  }

  const rawApplications = await prisma.careerApplication.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Obfuscate / replace the raw Vercel Blob URL with the secure authenticated local proxy route (Phase 8)
  const applications = rawApplications.map((app) => ({
    ...app,
    resumeUrl: `/api/admin/applications/${app.id}/resume`,
  }));

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ApplicationManager initialApplications={applications} />
      </main>
    </div>
  );
}
