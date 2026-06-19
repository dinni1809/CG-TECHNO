'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Shield,
  Laptop,
  Eye,
  Database,
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const securityServices = [
  {
    title: 'Email Security',
    desc: 'Shield mailboxes from malware, phishing attacks, and spam with advanced gateway filters.',
    icon: ShieldAlert,
    color: 'text-rose-600'
  },
  {
    title: 'Data Security',
    desc: 'Secure proprietary business files using robust encryption policies and role-based permissions.',
    icon: Shield,
    color: 'text-blue-600'
  },
  {
    title: 'Endpoint Security',
    desc: 'Protect office workstations and remote user laptops from malware and zero-day threats.',
    icon: Laptop,
    color: 'text-violet-600'
  },
  {
    title: 'Vulnerability Assessment',
    desc: 'Scan networks and systems regularly to find, patch, and eliminate security flaws.',
    icon: Eye,
    color: 'text-cyan-600'
  },
  {
    title: 'Backup & Recovery',
    desc: 'Automate disaster recovery pathways to restore business assets within target SLAs.',
    icon: Database,
    color: 'text-amber-600'
  },
  {
    title: 'Security Audits',
    desc: 'Review corporate hardware configurations and policy logs to verify industry compliance.',
    icon: FileCheck,
    color: 'text-emerald-600'
  }
];

export function SecurityCompliance() {
  return (
    <section className="py-24 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Zero Trust Security"
          tagIcon={ShieldCheck}
          title="Security &"
          titleHighlight="Compliance"
          description="Protecting your infrastructure, users and data."
          className="mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityServices.map((item, idx) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(15,23,42,0.06)' }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-gray-200/80 p-8 rounded-[24px] h-full flex flex-col justify-between hover:border-primary-500 transition-colors shadow-sm group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon size={22} className={item.color} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 font-heading">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
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
