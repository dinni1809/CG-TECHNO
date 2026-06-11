'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, HardDrive, Network, Server, ArrowRight } from 'lucide-react';
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
    <section className="py-20 lg:py-28 bg-gray-50 border-t border-gray-150 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Our Deployments"
          title="Case Studies &"
          titleHighlight="Project Showcase"
          description="A visual look at the enterprise projects and hardware rollouts completed by CG Techno Electronics across Bengaluru."
          className="mb-14"
        />

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {showcaseProjects.map((project) => {
            const Icon = project.icon;
            return (
              <StaggerItem key={project.client}>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between h-full group hover:shadow-card-hover hover:border-gray-200 transition-all duration-300">
                  {/* Top Bar Banner */}
                  <div className={`p-6 bg-gradient-to-r ${project.accent} text-white flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                        {project.logoText}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm tracking-wide">{project.client}</h4>
                        <p className="text-[10px] text-white/70 uppercase tracking-widest">{project.category}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-800 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Key Outcomes</h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {project.outcomes.map((out) => (
                          <li key={out} className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-center">
                            <span className="text-[11px] font-bold text-gray-800 leading-tight block">
                              {out}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer Link */}
                  <div className="p-6 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-semibold">Enterprise SLA Checked</span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-800 hover:text-primary-700 transition-colors"
                    >
                      <span>Consult Similar Setup</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
