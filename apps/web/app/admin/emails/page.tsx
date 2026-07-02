import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { EmailManager } from '@/components/admin/EmailManager';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable static caching to ensure admin always views current real-time dispatches

export default async function AdminEmailsPage() {
  // Enforce session check for admin users
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/admin/login');
  }

  // Role verification: Emails are accessible by SUPER_ADMIN and ADMIN only
  if (!['SUPER_ADMIN', 'ADMIN'].includes((session?.user as any)?.role || '')) {
    redirect('/admin/dashboard?error=unauthorized');
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Email Intelligence Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Audit outbound logs, check DNS propagation records, trigger pipeline retries, and view message lifecycles.
          </p>
        </div>

        <EmailManager />
      </main>
    </div>
  );
}
