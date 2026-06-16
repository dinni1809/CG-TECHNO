'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    console.log('[AdminLogin] Submit handler called with email:', email);
    setLoading(true);
    setError('');

    try {
      console.log('[AdminLogin] Triggering signIn() with credentials...');
      const res = await signIn('credentials', {
        email: email.trim(),
        password,
        redirect: false,
      });

      console.log('[AdminLogin] signIn() response received:', res);
      if (res?.error) {
        console.error('[AdminLogin] signIn() returned error:', res.error);
        setError(res.error || 'Invalid credentials');
        setLoading(false);
      } else {
        console.log('[AdminLogin] Sign in successful, redirecting to /admin/dashboard...');
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (err) {
      console.error('[AdminLogin] Unhandled error during signIn():', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070e1b] bg-mesh flex items-center justify-center px-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-hero-pattern opacity-5 pointer-events-none" />
      
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-900/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo Container */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl mb-4 shadow-xl">
            <Image
              src="/logo_transparent.png"
              alt="CG Techno"
              width={180}
              height={114}
              className="object-contain h-14 w-auto"
              style={{ filter: 'brightness(1.15)' }}
            />
          </div>
          <h1 className="text-2xl font-bold text-white font-heading">
            Admin Portal Access
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Log in to manage leads and system settings
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-glow-blue">
          {error && (
            <div className="mb-6 flex items-start gap-3 p-4 bg-red-950/50 border border-red-900/50 rounded-xl text-sm text-red-400">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Corporate Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cgtechno.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-950/60 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Secure Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-gray-950/60 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 bg-primary-800 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-glow-blue flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Secure Login'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          Authorized personnel only. Access attempt details are logged.
        </p>
      </div>
    </div>
  );
}
