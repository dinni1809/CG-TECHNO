import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/admin/LoginForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface LoginPageProps {
  searchParams?: Promise<{ callbackUrl?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const session = await getServerSession(authOptions);
  
  // Phase 9: Authenticated user opening /admin/login must automatically redirect to /admin/dashboard
  if (session) {
    redirect('/admin/dashboard');
  }

  const params = await searchParams;
  const callbackUrl = params?.callbackUrl || '/admin/dashboard';

  return <LoginForm defaultCallbackUrl={callbackUrl} />;
}
