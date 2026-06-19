'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Settings,
  Activity,
  Server,
  RefreshCw,
  Send,
  HardDrive,
  Cloud,
  Wrench,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const managedServices = [
  {
    title: 'Microsoft 365 Administration',
    desc: 'Proactive user licensing, exchange setup, security settings, and support.',
    icon: Settings,
    color: 'text-blue-600',
    serviceParam: 'software-licensing'
  },
  {
    title: 'Azure Management',
    desc: 'Cloud deployment, resource monitoring, backup, scaling, and cost audit.',
    icon: Activity,
    color: 'text-indigo-600',
    serviceParam: 'software-licensing'
  },
  {
    title: 'Server Setup & Maintenance',
    desc: 'Physical and virtual server installation, patch updates, and hardware diagnostics.',
    icon: Server,
    color: 'text-slate-700',
    serviceParam: 'enterprise-it'
  },
  {
    title: 'Data Migration',
    desc: 'Secure file server transfer to cloud repositories with zero data loss checks.',
    icon: RefreshCw,
    color: 'text-teal-600',
    serviceParam: 'software-licensing'
  },
  {
    title: 'Email Migration',
    desc: 'Moving email infrastructure from legacy SMTP/IMAP servers to Microsoft 365 safely.',
    icon: Send,
    color: 'text-cyan-605',
    serviceParam: 'software-licensing'
  },
  {
    title: 'Data Backup Solutions',
    desc: 'Enterprise scheduled local backups and secure off-site cloud storage replication.',
    icon: HardDrive,
    color: 'text-amber-600',
    serviceParam: 'software-licensing'
  },
  {
    title: 'Cloud Infrastructure Management',
    desc: 'Optimizing cloud compute capacity, memory management, and network firewall policies.',
    icon: Cloud,
    color: 'text-sky-600',
    serviceParam: 'software-licensing'
  },
  {
    title: 'IT Support & Troubleshooting',
    desc: 'On-site and remote helpdesk diagnostics for system failures and network outages.',
    icon: Wrench,
    color: 'text-rose-600',
    serviceParam: 'amc-support'
  }
];

export function ManagedITServices() {
  return (
    <section className="py-24 bg-slate-50 border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Managed Solutions"
          tagIcon={ShieldCheck}
          title="Managed IT"
          titleHighlight="Services"
          description="End-to-end IT operations and support for growing businesses."
          className="mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {managedServices.map((item, idx) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(15,23,42,0.06)' }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-gray-200 p-6 rounded-2xl h-full flex flex-col justify-between hover:border-primary-500 transition-colors shadow-sm group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon size={22} className={item.color} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 font-heading">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={`/contact?service=${item.serviceParam}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-800 hover:text-primary-750 transition-all hover:gap-2"
                    >
                      Enquire Now
                      <ArrowRight size={14} />
                    </Link>
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
