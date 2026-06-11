'use client';

import Link from 'next/link';
import { Landmark, Activity, GraduationCap, Building2, Factory, ShoppingBag, Laptop, Warehouse, Briefcase, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const industriesList = [
  {
    icon: Landmark,
    name: 'Government',
    description: 'Compliant IT networking, CCTV security frameworks, and public agency operations setups.',
    accent: 'from-blue-600 to-indigo-600',
  },
  {
    icon: Activity,
    name: 'Healthcare',
    description: 'High-availability cabling, fiber optics connectivity, and data center support for multi-specialty hospitals.',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    icon: GraduationCap,
    name: 'Education',
    description: 'Campus-wide WiFi deployments, smart labs, and student network optimization packages.',
    accent: 'from-orange-500 to-amber-500',
  },
  {
    icon: Building2,
    name: 'Banking',
    description: 'Secure server racks, data confidentiality setups, and fail-safe hardware solutions.',
    accent: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Factory,
    name: 'Manufacturing',
    description: 'Rugged surveillance cabling, server backups, and real-time operations security monitoring.',
    accent: 'from-slate-600 to-zinc-700',
  },
  {
    icon: ShoppingBag,
    name: 'Retail',
    description: 'Distributed retail store camera setups, POS connectivity solutions, and local storage networks.',
    accent: 'from-rose-500 to-pink-500',
  },
  {
    icon: Laptop,
    name: 'IT Companies',
    description: 'Developer workspace deployment, workstation rentals, and complete office LAN/WAN design.',
    accent: 'from-violet-500 to-purple-500',
  },
  {
    icon: Warehouse,
    name: 'Logistics & Warehousing',
    description: 'Warehouse networking infrastructure, CCTV monitoring, inventory connectivity systems, server deployments, and 24/7 operational uptime support.',
    accent: 'from-teal-500 to-emerald-600',
  },
];

export function IndustriesServed() {
  return (
    <section className="py-28 lg:py-36 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Industries We Serve"
          tagIcon={Briefcase}
          title="Enterprise Solutions for"
          titleHighlight="Diverse Industries"
          description="We tailor our IT infrastructure and surveillance deployments to match the exact compliance and operational requirements of your sector."
          className="mb-20"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {industriesList.map((ind, index) => {
            const Icon = ind.icon;
            return (
              <StaggerItem key={`${ind.name}-${index}`}>
                <div className="group h-full bg-white border border-gray-100 rounded-3xl p-9 shadow-sm hover:shadow-card-hover hover:border-gray-250 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ind.accent} text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading">{ind.name}</h3>
                    <p className="text-gray-650 text-base leading-relaxed">{ind.description}</p>
                  </div>
                  <div className="mt-8 pt-5 border-t border-gray-50 flex items-center text-sm font-semibold text-gray-400 group-hover:text-primary-750 transition-colors">
                    SLA Checked & Approved
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="text-center mt-16">
          <Link href="/contact" className="btn-primary inline-flex">
            Consult Our Industry Experts
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
