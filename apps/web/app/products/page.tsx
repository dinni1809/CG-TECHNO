'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, ArrowRight, ShieldCheck, Network, Server, Zap, Monitor, Award } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { CTABanner } from '@/components/sections/CTABanner';

const solutionSections = [
  {
    id: 'cctv-surveillance',
    title: 'CCTV & Surveillance Systems',
    tag: 'Surveillance & Security',
    icon: ShieldCheck,
    image: '/images/products/cctv.png',
    description: 'Ensure 24/7 security and peace of mind with our commercial-grade CCTV solutions. We design, deploy, and support complete surveillance ecosystems—from high-definition camera arrays to central control center video walls and secure backup storage units.',
    products: ['Dome Cameras', 'Bullet Cameras', 'PTZ Cameras', 'DVR', 'NVR', 'Remote Monitoring'],
    brands: ['Hikvision', 'CP Plus', 'Dahua'],
    ctaText: 'Request Design & Quote',
  },
  {
    id: 'networking-connectivity',
    title: 'Networking & Connectivity Solutions',
    tag: 'IT Infrastructure',
    icon: Network,
    image: '/images/products/networking.png',
    description: 'Establish a high-speed, secure, and reliable communication backbone. Our services include enterprise-grade fiber backbones, structured CAT6 cabling, secure firewall arrays, managed switches, and high-density wireless access points with zero-handoff roaming.',
    products: ['Switches', 'Routers', 'Access Points', 'Firewalls', 'Structured Cabling'],
    brands: ['Cisco', 'D-Link', 'TP-Link', 'Ubiquiti'],
    ctaText: 'Consult Network Architecture',
  },
  {
    id: 'server-datacenter',
    title: 'Server & Data Center Solutions',
    tag: 'Enterprise Computing',
    icon: Server,
    image: '/images/products/server.png',
    description: 'Power your mission-critical applications with robust server setups. We provision, install, and optimize high-density racks, tower application servers, and SAN/NAS storage arrays designed for high virtualization workloads and redundant backups.',
    products: ['Rack Servers', 'Tower Servers', 'Storage Servers', 'Backup Solutions', 'Virtualization'],
    brands: ['Dell', 'HP', 'Lenovo'],
    ctaText: 'Configure Server SLA',
  },
  {
    id: 'power-backup',
    title: 'Power Backup & UPS Solutions',
    tag: 'Power & Continuity',
    icon: Zap,
    image: '/images/products/ups.png',
    description: 'Protect sensitive electronics and ensure uninterrupted operational continuity. We configure industrial online double-conversion UPS systems, advanced battery bank arrays, and power distribution units (PDUs) to prevent loss of data during utility blackouts.',
    products: ['Online UPS', 'Industrial UPS', 'Battery Backup Systems', 'Power Distribution Units'],
    brands: ['APC', 'Eaton', 'Numeric'],
    ctaText: 'Request Power Audit',
  },
  {
    id: 'it-hardware',
    title: 'IT Hardware & Workplace Solutions',
    tag: 'Workforce Enablement',
    icon: Monitor,
    image: '/images/products/workplace.png',
    description: 'Equip your workforce with high-quality systems, displays, and accessories. We facilitate customized bulk leasing, workstation deployments, and corporate IT setups tailored to your engineering, design, and office operations.',
    products: ['Laptops', 'Desktops', 'Workstations', 'Printers', 'Monitors', 'Accessories'],
    brands: ['HP', 'Dell', 'Lenovo', 'Acer'],
    ctaText: 'Request Bulk Hardware Quote',
  },
];

const BRAND_ASSETS: Record<string, string> = {
  hikvision: '/logos/hikvision.svg',
  cisco: '/logos/cisco.svg',
  dell: '/logos/dell.svg',
  hp: '/logos/hp.svg',
  lenovo: '/logos/lenovo.svg',
  apc: '/logos/apc.svg',
};

const BRAND_DISPLAY_NAMES: Record<string, string> = {
  apc: 'APC by Schneider Electric',
  hikvision: 'Hikvision',
  cpplus: 'CP Plus',
  dahua: 'Dahua',
  cisco: 'Cisco',
  dell: 'Dell',
  hp: 'HP',
  lenovo: 'Lenovo',
  dlink: 'D-Link',
  tplink: 'TP-Link',
  ubiquiti: 'Ubiquiti',
  eaton: 'Eaton',
  numeric: 'Numeric',
  acer: 'Acer',
};

export default function ProductsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-mesh bg-hero-pattern pt-24 pb-12 lg:pt-28 lg:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-base font-semibold bg-white/10 border border-white/20 text-white/90 mb-8">
              <Package size={16} className="text-blue-300 animate-pulse" />
              <span>B2B Portfolio</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Enterprise{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 bg-clip-text text-transparent">
                Solutions Showcase
              </span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
              We design, deploy, and supply certified IT infrastructure, power backup systems, and enterprise surveillance networks from the world&apos;s leading manufacturers.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Solutions Sections */}
      <section className="py-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-36 my-12 lg:my-20">
          {solutionSections.map((section, index) => {
            const isEven = index % 2 === 1;
            const IconComponent = section.icon;

            return (
              <AnimatedSection key={section.id}>
                <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Left/Right Side: Large Image */}
                  <div className="w-full lg:w-1/2">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-gray-150 group"
                    >
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-w-1024px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </motion.div>
                  </div>

                  {/* Left/Right Side: Detailed Content */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-primary-50 text-primary-800 border border-primary-100 mb-4 w-max">
                      <IconComponent size={14} className="text-primary-700" />
                      <span>{section.tag}</span>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mb-4 tracking-tight">
                      {section.title}
                    </h2>
                    
                    <p className="text-gray-650 text-base leading-relaxed mb-6">
                      {section.description}
                    </p>

                    {/* Products We Offer list */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Products We Offer</h4>
                      <div className="flex flex-wrap gap-2">
                        {section.products.map((p) => (
                          <span key={p} className="bg-primary-50/70 text-primary-800 text-xs font-medium px-3.5 py-1.5 rounded-xl border border-primary-100/50">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Brand logos/names */}
                    <div className="flex flex-col gap-3 py-4 border-t border-b border-gray-100/80 my-6">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Authorized Brands</span>
                      <div className="flex flex-wrap items-center gap-3">
                        {section.brands.map((brandName) => {
                          const slug = brandName.toLowerCase().replace(/[\s-]/g, '');
                          const asset = BRAND_ASSETS[slug];
                          const displayName = BRAND_DISPLAY_NAMES[slug] || brandName;
                          
                          return (
                            <div 
                              key={brandName} 
                              className="flex items-center gap-3 bg-gray-50/50 border border-gray-100/85 hover:border-gray-200 hover:bg-gray-50 rounded-xl px-4 py-2.5 h-14 transition-all duration-200 select-none shadow-sm"
                            >
                              {asset ? (
                                <div className="relative h-9 w-[76px] flex items-center justify-center shrink-0">
                                  <Image
                                    src={asset}
                                    alt={brandName}
                                    fill
                                    className="object-contain opacity-90 hover:opacity-100 transition-opacity"
                                  />
                                </div>
                              ) : (
                                <div className="w-9 h-9 rounded-lg bg-primary-50/50 border border-primary-100/30 flex items-center justify-center text-primary-700 shrink-0">
                                  <Award size={18} />
                                </div>
                              )}
                              <span className="text-xs font-medium text-slate-800 leading-none">
                                {displayName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-2">
                      <Link href="/contact" className="btn-primary inline-flex items-center gap-2 group">
                        <span>{section.ctaText}</span>
                        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
