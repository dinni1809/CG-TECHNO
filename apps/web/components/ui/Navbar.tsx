'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { navLinks, navCTA } from '@cg-techno/config';
import { cn } from '@cg-techno/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

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
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Image
                  src="/logo.png"
                  alt="CG Techno Electronics"
                  width={140}
                  height={48}
                  style={{ width: 'auto', height: '40px' }}
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group',
                      isActive
                        ? 'text-primary-800'
                        : isScrolled
                        ? 'text-gray-700 hover:text-primary-800'
                        : 'text-white/90 hover:text-white'
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 rounded-full transition-all duration-200',
                        isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+918861158888"
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-colors',
                  isScrolled ? 'text-gray-600 hover:text-primary-700' : 'text-white/80 hover:text-white'
                )}
              >
                <Phone size={15} />
                <span>+91 886 115 8888</span>
              </a>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={navCTA.href}
                  className="px-5 py-2.5 bg-primary-800 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                >
                  {navCTA.label}
                </Link>
              </motion.div>
            </div>

            <button
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
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
            className="fixed inset-x-0 top-16 z-40 bg-white/97 backdrop-blur-lg border-b border-gray-200 shadow-xl lg:hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-800'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-800'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-gray-100 mt-3 space-y-3">
                <a
                  href="tel:+918861158888"
                  className="flex items-center gap-2 px-4 py-3 text-gray-600 font-medium"
                >
                  <Phone size={16} />
                  <span>+91 886 115 8888</span>
                </a>
                <Link
                  href={navCTA.href}
                  className="block mx-4 py-3 text-center bg-primary-800 text-white font-semibold rounded-lg"
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
