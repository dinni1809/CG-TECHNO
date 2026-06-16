'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '@cg-techno/config';
import { AnimatedSection } from '../ui/AnimatedSection';
import { trackPhoneClick, trackCTA } from '@/lib/analytics';

export function CTABanner() {
  return (
    <section className="py-28 lg:py-36 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-base font-semibold mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Free Consultation Available
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight font-heading">
            Ready to Transform Your{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              IT Infrastructure?
            </span>
          </h2>

          <p className="text-white/70 text-lg sm:text-xl mb-12 max-w-4xl mx-auto leading-relaxed">
            Talk to our IT experts today. Get a custom solution designed for your business needs
            with transparent pricing and guaranteed delivery timelines.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-12">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                onClick={() => trackCTA('Banner Consultation', 'Request Consultation Clicked')}
                className="inline-flex items-center gap-2.5 px-10 py-5 bg-white text-primary-900 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg"
              >
                Get Free Consultation
                <ArrowRight size={20} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a
                href="tel:+918861158888"
                onClick={() => trackPhoneClick('+91 886 115 8888')}
                className="inline-flex items-center gap-2.5 px-10 py-5 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-lg"
              >
                <Phone size={20} />
                Call +91 886 115 8888
              </a>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60 text-base">
            {[
              'No commitment required',
              '24-hour response guarantee',
              'Free site assessment',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
