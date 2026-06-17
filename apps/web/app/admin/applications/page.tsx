import { prisma } from '@/lib/prisma';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ApplicationManager } from '@/components/admin/ApplicationManager';

export const revalidate = 0; // Disable server component caching to ensure fresh metrics are fetched on each reload

export default async function AdminApplications() {
  const applications = await prisma.careerApplication.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ApplicationManager initialApplications={applications} />
      </main>
    </div>
  );
}
