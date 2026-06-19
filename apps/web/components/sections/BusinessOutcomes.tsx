'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  TrendingUp,
  ShieldCheck,
  Cpu,
  Settings,
  Briefcase
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const outcomes = [
  {
    title: 'Reduce IT Downtime',
    desc: 'Prevent server failures and network issues through active monitoring and scheduled SLA checks.',
    icon: Clock,
    color: 'text-rose-600',
    metric: '99.9%'
  },
  {
    title: 'Improve Productivity',
    desc: 'Enable employees to work smoothly with fast access to files, M365, and collaboration services.',
    icon: TrendingUp,
    color: 'text-emerald-600',
    metric: '40%+'
  },
  {
    title: 'Secure Business Data',
    desc: 'Prevent data leakage and unauthorized breaches using multi-layered security gates.',
    icon: ShieldCheck,
    color: 'text-blue-600',
    metric: 'Zero'
  },
  {
    title: 'Optimize Cloud Infrastructure',
    desc: 'Eliminate resource waste and minimize cloud subscription costs through structural audits.',
    icon: Cpu,
    color: 'text-amber-600',
    metric: '30%-'
  },
  {
    title: 'Simplify IT Operations',
    desc: 'Offload patching, configuration, user setups, and diagnostics to our certified experts.',
    icon: Settings,
    color: 'text-purple-600',
    metric: '100%'
  },
  {
    title: 'Enable Business Growth',
    desc: 'Deploy highly scalable infrastructure that expands smoothly with your enterprise volume.',
    icon: Briefcase,
    color: 'text-teal-600',
    metric: 'Scalable'
  }
];

export function BusinessOutcomes() {
  return (
    <section className="py-24 bg-slate-50 border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Business Impact"
          tagIcon={TrendingUp}
          title="How We Help"
          titleHighlight="Businesses Succeed"
          description="We deliver concrete metrics that improve efficiency, security, and growth."
          className="mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(15,23,42,0.06)' }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-gray-200 p-8 rounded-[24px] h-full flex flex-col justify-between hover:border-primary-500 transition-colors shadow-sm group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon size={22} className={item.color} />
                      </div>
                      <span className="text-2xl font-extrabold text-slate-800 tracking-tight font-heading">
                        {item.metric}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 font-heading">
                      {item.title}
                    </h3>
                    <p className="text-gray-655 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
