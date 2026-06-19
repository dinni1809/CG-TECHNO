'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Cpu,
  Mail,
  Layers,
  Shield,
  Camera,
  Database,
  HardDrive,
  Lock,
  Laptop,
  Server,
  Zap
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const expertiseList = [
  {
    title: 'Microsoft 365',
    desc: 'Fully optimized suite licensing, user administration, cloud collaboration, and setup.',
    icon: Cloud,
    color: 'text-blue-600'
  },
  {
    title: 'Microsoft Azure',
    desc: 'Enterprise-grade cloud architectures, hosting solutions, and virtualization.',
    icon: Layers,
    color: 'text-indigo-600'
  },
  {
    title: 'AWS Cloud',
    desc: 'High-availability cloud computing, server setups, and secure management.',
    icon: Cpu,
    color: 'text-amber-600'
  },
  {
    title: 'Google Workspace',
    desc: 'Corporate email setup, collaboration tools, and drive storage services.',
    icon: Mail,
    color: 'text-emerald-600'
  },
  {
    title: 'VMware',
    desc: 'Advanced server virtualization, workload optimization, and sandbox hypervisors.',
    icon: Database,
    color: 'text-cyan-600'
  },
  {
    title: 'Cybersecurity',
    desc: 'Enterprise threat mitigation, active firewall rules, and vulnerability shields.',
    icon: Shield,
    color: 'text-rose-600'
  },
  {
    title: 'CCTV Solutions',
    desc: '24/7 commercial IP camera networks, monitoring software, and DVR setups.',
    icon: Camera,
    color: 'text-emerald-500'
  },
  {
    title: 'Cloud Management',
    desc: 'Active cloud infrastructure provisioning, cost control, and scaling support.',
    icon: Zap,
    color: 'text-violet-600'
  },
  {
    title: 'Data Backup',
    desc: 'Automated local and offsite cloud replication with disaster recovery SLAs.',
    icon: HardDrive,
    color: 'text-blue-500'
  },
  {
    title: 'Email Security',
    desc: 'Advanced anti-spam filters, anti-phishing protection, and secure gateways.',
    icon: Lock,
    color: 'text-teal-600'
  },
  {
    title: 'Endpoint Protection',
    desc: 'Securing workstations, laptops, and mobile assets against malware entry.',
    icon: Laptop,
    color: 'text-purple-600'
  },
  {
    title: 'Server Infrastructure',
    desc: 'Robust rack servers, cabinet management, storage arrays, and routing switches.',
    icon: Server,
    color: 'text-slate-700'
  }
];

export function TechnologyExpertise() {
  return (
    <section className="py-24 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Our Core Competencies"
          tagIcon={Zap}
          title="Technology"
          titleHighlight="Expertise"
          description="Trusted technologies powering modern businesses."
          className="mb-16"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {expertiseList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(15,23,42,0.08)' }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-gray-200/80 p-6 rounded-2xl h-full flex flex-col justify-between hover:border-primary-500 transition-colors shadow-sm group"
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
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
