'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Server, Cloud, Shield, ShieldCheck, Router, Network, Zap, ArrowRight, Fence } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const capabilities = [
  {
    icon: Cloud,
    title: 'Licensing',
    desc: 'Authorized Microsoft licensing, OS solutions, M365 deployment, and compliance audits.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Server,
    title: 'Infrastructure',
    desc: 'Enterprise server systems, hardware procurement, rack layouts, and data center support.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Shield,
    title: 'Security',
    desc: '24/7 commercial IP camera systems, unified monitor rooms, biometrics, and access security.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Network,
    title: 'Networking',
    desc: 'Structured Cat6/fiber cabling, high-speed office Wi-Fi, and firewall router configs.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: Router,
    title: 'Automation',
    desc: 'Automatic boom barriers, turnstiles, RFID entries, and building control systems.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Fence,
    title: 'Boom Barriers',
    desc: 'Smart boom barrier systems for offices, apartments, factories, warehouses, campuses, toll entries, and secured facilities. Complete supply, installation, automation, RFID integration, maintenance, and support.',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    icon: Zap,
    title: 'Electronics',
    desc: 'Custom industrial electronics, custom hardware integration, and consulting.',
    color: 'from-rose-500 to-red-600',
  },
  {
    icon: ShieldCheck,
    title: 'Support',
    desc: 'Dedicated technical desk assistance, fast emergency response, and structured AMC contracts.',
    color: 'from-violet-500 to-purple-600',
  },
];

export function CompletePartnerSection() {
  return (
    <section className="py-28 lg:py-36 bg-slate-50 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Heading & Enterprise Context */}
          <div className="lg:col-span-5 space-y-8">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full text-sm font-semibold bg-primary-100/60 text-primary-900 border border-primary-200/50 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
                Enterprise Solutions Architect
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight font-heading">
                Everything Your Business Needs. <br />
                <span className="text-primary-850">One Technology Partner.</span>
              </h2>
              <p className="text-gray-650 text-lg sm:text-xl leading-relaxed mt-6">
                CG Techno is more than a hardware vendor. We are a senior technology solutions partner. We design, procure, deploy, support, and scale entire IT and electronics systems under one unified SLA.
              </p>
              <div className="pt-6 space-y-4">
                {[
                  'Single point of accountability',
                  'Partnership with global technology brands',
                  'SLA-driven deployment and maintenance',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-base text-gray-800 font-semibold">
                    <span className="w-5 h-5 rounded-full bg-primary-800 text-white flex items-center justify-center text-xs">✓</span>
                    {item}
                  </div>
                ))}
              </div>
              <div className="pt-8">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-800 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:gap-3"
                >
                  View Solutions
                  <ArrowRight size={18} />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Cards Grid */}
          <div className="lg:col-span-7">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                const isSpecial = capabilities.length % 2 !== 0 && i === capabilities.length - 1; // last item spans two columns on tablet/desktop only if count is odd
                return (
                  <StaggerItem key={cap.title} className={isSpecial ? 'sm:col-span-2' : ''}>
                    <motion.div
                      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                      transition={{ duration: 0.25 }}
                      className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-5 items-start h-full group"
                    >
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cap.color} text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                        <Icon size={22} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 font-heading">{cap.title}</h3>
                        <p className="text-gray-550 text-sm sm:text-base leading-relaxed">{cap.desc}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
}
