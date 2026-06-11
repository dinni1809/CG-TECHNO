'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, HardDrive, Network, Server, ArrowRight, Award } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';
import Link from 'next/link';

const showcaseProjects = [
  {
    client: 'Karnataka State Police',
    logoText: 'KSP',
    title: 'Command Center & 100+ IP CCTV Deployment',
    category: 'Surveillance & Security',
    description: 'Designed and deployed a high-definition CCTV security command center, facilitating real-time monitoring and high-capacity secure digital storage setups.',
    outcomes: ['100+ Live Camera Streams', 'Zero-latency feeds', '30-day backups storage'],
    icon: ShieldCheck,
    accent: 'from-blue-600 to-primary-900',
  },
  {
    client: 'Infosys BPM',
    logoText: 'IBPM',
    title: 'Data Center Rack & Server Optimization',
    category: 'Server Solutions',
    description: 'Reconfigured modular server racks, installed hot/cold aisle containment, and optimized database storage networks for enterprise workflows.',
    outcomes: ['30% cooling efficiency gain', 'High-availability RAID 6 arrays', '10G uplink backups'],
    icon: Server,
    accent: 'from-violet-600 to-indigo-900',
  },
  {
    client: 'Manipal Hospitals',
    logoText: 'MH',
    title: 'Fiber Optic Network Cabling & Wi-Fi 6 Core',
    category: 'Structured Cabling',
    description: 'Installed robust backbone fiber optic cabling, interconnecting multiple floors with high-speed CAT6 drops and zero-interference access points.',
    outcomes: ['Gigabit intranet speed', 'HIPAA-compliant networks', 'Seamless AP handovers'],
    icon: Network,
    accent: 'from-emerald-600 to-teal-900',
  },
  {
    client: 'Wipro Limited',
    logoText: 'WIP',
    title: 'Workstation Scaling & Hardware Lease (500+)',
    category: 'IT Rentals & Leasing',
    description: 'Supplied, configured, and deployed 500+ corporate laptops and systems, enabling smooth scale-up operations for offshore delivery teams.',
    outcomes: ['Rapid 72-hour dispatch', 'Pre-configured domain setups', 'On-site AMC replacement'],
    icon: HardDrive,
    accent: 'from-amber-600 to-orange-900',
  },
];

export function ProjectShowcase() {
  return (
    <section className="py-28 lg:py-36 bg-gray-50 border-t border-gray-150 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Case Studies"
          tagIcon={Award}
          title="Case Studies &"
          titleHighlight="Project Showcase"
          description="A visual look at the enterprise projects and hardware rollouts completed by CG Techno Electronics across Bengaluru."
          className="mb-20"
        />

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {showcaseProjects.map((project) => {
            const Icon = project.icon;
            return (
              <StaggerItem key={project.client}>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between h-full group hover:shadow-card-hover hover:border-gray-250 transition-all duration-300">
                  {/* Top Bar Banner */}
                  <div className={`p-8 bg-gradient-to-r ${project.accent} text-white flex items-center justify-between`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-base shadow-inner">
                        {project.logoText}
                      </div>
                      <div>
                        <h4 className="font-bold text-base tracking-wide">{project.client}</h4>
                        <p className="text-xs text-white/70 uppercase tracking-widest font-semibold">{project.category}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-10 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-800 transition-colors font-heading">
                        {project.title}
                      </h3>
                      <p className="text-gray-650 text-base leading-relaxed mb-8">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Key Outcomes</h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {project.outcomes.map((out) => (
                          <li key={out} className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center flex items-center justify-center h-full">
                            <span className="text-xs font-bold text-gray-800 leading-snug">
                              {out}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-sm text-gray-550 font-semibold">Enterprise SLA Checked</span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-800 hover:text-primary-700 transition-colors"
                    >
                      <span>Consult Similar Setup</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="text-center mt-16">
          <Link href="/contact" className="btn-primary inline-flex">
            Discuss Your Project Setup
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
