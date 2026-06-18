'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { navLinks, navCTA } from '@cg-techno/config';
import { cn } from '@cg-techno/utils';
import { trackPhoneClick, trackCTA } from '@/lib/analytics';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const transparentPaths = ['/'];
  const isLightNavbar = isScrolled || !transparentPaths.includes(pathname || '');

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isMobileOpen
            ? 'bg-[#06142D] border-b border-white/10 shadow-lg'
            : isLightNavbar
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/50'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Link href="/" prefetch={true} className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'transition-all duration-300 rounded-[12px] flex items-center justify-center',
                  isLightNavbar
                    ? 'bg-transparent p-0'
                    : 'bg-[#06142D]/65 backdrop-blur-md border border-white/[0.08] shadow-sm px-2.5 py-1'
                )}
              >
                <Image
                  src="/logo_transparent.png"
                  alt="CG Techno Electronics"
                  width={190}
                  height={120}
                  className={cn(
                    'object-contain transition-all duration-300',
                    isScrolled 
                      ? 'h-9 md:h-[44px] lg:h-[52px]' 
                      : 'h-[44px] md:h-[52px] lg:h-[64px]'
                  )}
                  style={{
                    width: 'auto',
                    filter: isLightNavbar
                      ? 'none'
                      : 'brightness(1.20) contrast(1.10) drop-shadow(0 2px 4px rgba(255, 255, 255, 0.06))',
                  }}
                  priority
                />
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    className={cn(
                      'relative px-4 py-2.5 text-base font-medium rounded-xl transition-all duration-200 group',
                      isActive
                        ? isLightNavbar
                          ? 'text-primary-800 font-semibold'
                          : 'text-white font-semibold'
                        : isLightNavbar
                        ? 'text-slate-800 hover:text-primary-800'
                        : 'text-white/90 hover:text-white'
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-200',
                        isLightNavbar ? 'bg-primary-600' : 'bg-white',
                        isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <a
                href="tel:+918861158888"
                onClick={() => trackPhoneClick('+91 886 115 8888')}
                className={cn(
                  'flex items-center gap-2.5 text-base font-semibold transition-colors',
                  isLightNavbar ? 'text-slate-800 hover:text-primary-800' : 'text-white hover:text-white/90'
                )}
              >
                <Phone size={18} className="shrink-0" />
                <span>+91 886 115 8888</span>
              </a>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={navCTA.href}
                  prefetch={true}
                  onClick={() => trackCTA(navCTA.label, 'Request Consultation Clicked')}
                  className="px-6 py-3 bg-primary-800 text-white text-base font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
                >
                  {navCTA.label}
                </Link>
              </motion.div>
            </div>

            <button
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isMobileOpen
                  ? 'text-white hover:bg-white/10'
                  : isLightNavbar
                  ? 'text-slate-800 hover:bg-slate-100'
                  : 'text-white hover:bg-white/10'
              )}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 bg-[#06142D]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl lg:hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    className={cn(
                      'block py-3 rounded-xl text-base transition-all duration-200',
                      isActive
                        ? 'bg-primary-950/60 text-cyan-400 border-l-4 border-cyan-400 px-3 font-semibold shadow-inner'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white px-4 font-medium'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-white/10 mt-4 space-y-4 px-4 pb-4">
                <a
                  href="tel:+918861158888"
                  onClick={() => trackPhoneClick('+91 886 115 8888')}
                  className="flex items-center gap-3 py-2 text-slate-200 hover:text-white font-medium transition-colors"
                >
                  <Phone size={18} className="text-cyan-400 shrink-0" />
                  <span>+91 886 115 8888</span>
                </a>
                <Link
                  href={navCTA.href}
                  prefetch={true}
                  onClick={() => trackCTA(navCTA.label, 'Request Consultation Clicked')}
                  className="block w-full py-3.5 text-center bg-primary-800 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-base"
                >
                  {navCTA.label}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
