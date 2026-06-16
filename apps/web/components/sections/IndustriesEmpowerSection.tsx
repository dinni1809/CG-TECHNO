'use client';

import Link from 'next/link';
import { 
  Briefcase, GraduationCap, Activity, Factory, ShoppingBag, 
  Home, Building2, Warehouse, Landmark, Laptop, ArrowRight 
} from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const industries = [
  {
    icon: Briefcase,
    name: 'Corporate Offices',
    desc: 'Structured network cabling, boardroom tech integration, high-density secure Wi-Fi, and software licensing audits.',
    accent: 'from-blue-600 to-indigo-650'
  },
  {
    icon: GraduationCap,
    name: 'Educational Institutions',
    desc: 'Campus-wide secure Wi-Fi deployment, high-definition smart classrooms, and biometric student logging systems.',
    accent: 'from-emerald-600 to-teal-650'
  },
  {
    icon: Activity,
    name: 'Hospitals & Healthcare',
    desc: 'High-availability data backbones, server virtualizations, IP surveillance, and compliant network deployments.',
    accent: 'from-violet-600 to-purple-650'
  },
  {
    icon: Factory,
    name: 'Manufacturing Units',
    desc: 'Rugged perimeter security networks, industrial electronics maintenance, fail-safe backups, and access barriers.',
    accent: 'from-slate-600 to-zinc-700'
  },
  {
    icon: ShoppingBag,
    name: 'Retail Businesses',
    desc: 'Multi-location store camera integrations, secure POS networking systems, and local NVR security hubs.',
    accent: 'from-rose-500 to-pink-600'
  },
  {
    icon: Home,
    name: 'Apartments & Communities',
    desc: 'Intelligent security solutions, smart vehicle access control barriers, turnstiles, and unified CCTV systems.',
    accent: 'from-amber-500 to-orange-650'
  },
  {
    icon: Building2,
    name: 'Hotels & Hospitality',
    desc: 'Centralized Wi-Fi management, centralized guest access portals, IP surveillance, and building automation IoT.',
    accent: 'from-cyan-500 to-blue-650'
  },
  {
    icon: Warehouse,
    name: 'Warehouses & Logistics',
    desc: 'Wide-area Wi-Fi infrastructure, smart tracking, boom barriers, and 24/7 centralized monitoring setup.',
    accent: 'from-teal-500 to-emerald-600'
  },
  {
    icon: Landmark,
    name: 'Government Organizations',
    desc: 'Compliant secure IT setups, government network configurations, and robust visitor entry automation systems.',
    accent: 'from-blue-700 to-indigo-900'
  },
  {
    icon: Laptop,
    name: 'Startups & Scaleups',
    desc: 'Workstation rentals, quick Microsoft 365 licensing setup, cloud hosting setups, and scalable IT designs.',
    accent: 'from-orange-600 to-red-650'
  }
];

export function IndustriesEmpowerSection() {
  return (
    <section className="py-28 lg:py-36 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Industries We Empower"
          tagIcon={Briefcase}
          title="Enterprise Tech Tailored For"
          titleHighlight="Every Industry Sector"
          description="We customize our licensing, infrastructure, surveillance, and automated entry solutions to meet the specific operational and regulatory requirements of your industry."
          className="mb-20"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <StaggerItem key={ind.name} className="h-full">
                <div className="group h-full bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-card-hover hover:border-slate-200 transition-all duration-300 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${ind.accent} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 font-heading leading-snug">{ind.name}</h3>
                    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">{ind.desc}</p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-slate-50 flex items-center text-xs font-semibold text-primary-800">
                    SLA Audited & Approved
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
