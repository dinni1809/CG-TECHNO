'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { siteConfig } from '@cg-techno/config';
import { AnimatedSection } from '../ui/AnimatedSection';

export function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Free Consultation Available
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to Transform Your{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              IT Infrastructure?
            </span>
          </h2>

          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Talk to our IT experts today. Get a custom solution designed for your business needs
            with transparent pricing and guaranteed delivery timelines.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-primary-900 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all"
              >
                Get Free Consultation
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a
                href="tel:+918861158888"
                className="inline-flex items-center gap-2.5 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                <Phone size={18} />
                Call +91 886 115 8888
              </a>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/60 text-sm">
            {[
              'No commitment required',
              '24-hour response guarantee',
              'Free site assessment',
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
