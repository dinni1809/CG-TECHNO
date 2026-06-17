'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { BarChart3, ListFilter, LogOut, Briefcase } from 'lucide-react';

export function AdminHeader() {
  const pathname = usePathname();

  const links = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/enquiries', label: 'Enquiries', icon: ListFilter },
    { href: '/admin/applications', label: 'Careers', icon: Briefcase },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <Image
                src="/logo_transparent.png"
                alt="CG Techno"
                width={120}
                height={76}
                className="object-contain h-8 w-auto"
              />
              <span className="text-xs font-bold text-primary-800 bg-primary-50 border border-primary-100 px-2 py-0.5 rounded uppercase tracking-wider hidden sm:inline-block">
                Admin
              </span>
            </Link>

            <nav className="flex items-center gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-primary-800 text-white shadow-sm'
                        : 'text-gray-600 hover:text-primary-800 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-red-650 hover:bg-red-50 border border-gray-200 rounded-xl transition-all"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
