'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';
import { trackCTA } from '@/lib/analytics';

const trust = [
  { icon: ShieldCheck, label: '10+ Years Experience' },
  { icon: Zap, label: '500+ Enterprise Clients' },
  { icon: Award, label: 'Certified IT Partner' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh bg-hero-pattern">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 lg:py-48 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-sm font-semibold mb-10"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          Bengaluru&apos;s Trusted IT Partner Since 2014
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-8"
        >
          Enterprise{' '}
          <span className="bg-gradient-to-r from-blue-200 via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
            IT Infrastructure
          </span>
          <br className="hidden sm:block" />
          {' '}& Electronics Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-white/70 max-w-4xl mx-auto mb-12 leading-relaxed"
        >
          From structured network cabling to advanced CCTV surveillance and server solutions —
          we deliver end-to-end IT infrastructure that powers Bengaluru&apos;s leading enterprises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-5 justify-center mb-20"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact"
              onClick={() => trackCTA('Get Free Consultation', 'Request Consultation Clicked')}
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 bg-white text-primary-900 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 text-sm sm:text-base"
            >
              Get Free Consultation
              <ArrowRight size={18} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/services"
              onClick={() => trackCTA('Explore Services', 'Explore Solutions Clicked')}
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-200 text-sm sm:text-base"
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14"
        >
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-white/95">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Icon size={20} className="text-cyan-300" />
              </div>
              <span className="text-base font-semibold">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
