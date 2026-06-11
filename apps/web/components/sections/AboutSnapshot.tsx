'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@cg-techno/config';
import { AnimatedSection } from '../ui/AnimatedSection';

const highlights = [
  'End-to-end IT infrastructure design, supply, and installation',
  'Certified professionals with industry-recognized expertise',
  'Annual Maintenance Contracts for zero-disruption operations',
  'Serving 500+ enterprises across 5+ cities',
  'Authorized distribution partner for leading IT brands',
];

export function AboutSnapshot() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-900 to-primary-700 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-hero-pattern opacity-10" />
                <div className="relative z-10 text-center px-8">
                  <div className="text-7xl font-bold text-white/90 font-heading mb-4">10+</div>
                  <div className="text-xl text-white/70 font-medium">Years of Excellence</div>
                  <div className="mt-6 flex justify-center gap-4">
                    {siteConfig.stats.slice(1).map((stat) => (
                      <div key={stat.label} className="text-center px-4">
                        <div className="text-2xl font-bold text-cyan-300">{stat.value}{stat.suffix}</div>
                        <div className="text-xs text-white/60 mt-1">{stat.label.split(' ').slice(-1)[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Client Satisfaction</div>
                    <div className="text-sm font-bold text-gray-900">98% Retention Rate</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-50 text-primary-700 border border-primary-100 mb-5">
              About CG Techno Electronics
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Bengaluru&apos;s Leading{' '}
              <span className="bg-gradient-to-r from-primary-800 to-primary-500 bg-clip-text text-transparent">
                IT Solutions Partner
              </span>
            </h2>

            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Founded in Sampangiramanagar, Bengaluru, CG Techno Electronics has been the trusted
              technology partner for enterprises across Karnataka for over a decade. We combine deep
              technical expertise with a commitment to delivering reliable, scalable IT infrastructure
              that drives business growth.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary-600 mt-0.5 shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about" className="btn-primary">
                Our Story
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Get in Touch
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
