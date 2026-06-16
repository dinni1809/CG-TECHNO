'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@cg-techno/utils';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { trackCTA, trackServiceInterest } from '@/lib/analytics';

const mapServiceInterestName = (title: string) => {
  if (title === 'Software & Licensing') return 'Software Licensing';
  if (title === 'Biometric & Attendance') return 'Biometric Attendance';
  if (title === 'AMC & Support') return 'AMC Support';
  if (title === 'Access Automation') return 'Access Automation';
  return title;
};


export function ServicesClient() {
  const solutionCards = [
    {
      id: 'enterprise-it',
      title: 'IT Infrastructure',
      desc: 'Servers, storage, networking, deployment, upgrades, and enterprise-scale infrastructure management.',
      image: '/images/services/it-infrastructure.jpg',
    },
    {
      id: 'software-licensing',
      title: 'Software & Licensing',
      desc: 'Microsoft Licensing, Microsoft 365, enterprise software procurement, compliance, and deployment.',
      image: '/images/services/software-licensing.jpg',
    },
    {
      id: 'security-surveillance',
      title: 'Security Systems',
      desc: 'CCTV, surveillance, monitoring systems, access control, and enterprise security infrastructure.',
      image: '/images/services/security-systems.jpg',
    },
    {
      id: 'biometric-attendance',
      title: 'Biometric & Attendance',
      desc: 'Face recognition, attendance systems, visitor management, and workforce tracking solutions.',
      image: '/images/services/biometric-attendance.jpg',
    },
    {
      id: 'access-control',
      title: 'Access Automation',
      desc: 'Boom barriers, flap barriers, turnstiles, RFID, and smart access control systems.',
      image: '/images/services/access-automation.jpg',
    },
    {
      id: 'boom-barriers',
      title: 'Boom Barriers',
      desc: 'Smart boom barrier systems for offices, apartments, factories, warehouses, campuses, and secure facilities. Complete supply, installation, RFID integration, automation, maintenance, and support.',
      image: '/images/services/boom-barriers.jpg',
    },
    {
      id: 'electronics-engineering',
      title: 'Electronics Integration',
      desc: 'Custom electronics deployment, industrial electronics, hardware integration, and troubleshooting.',
      image: '/images/services/electronics-integration.jpg',
    },
    {
      id: 'networking-connectivity',
      title: 'Networking Solutions',
      desc: 'Structured cabling, Wi-Fi deployment, fiber connectivity, routers, switches, and WAN infrastructure.',
      image: '/images/services/networking-solutions.jpg',
    },
    {
      id: 'amc-support',
      title: 'AMC & Support',
      desc: 'Preventive maintenance, remote support, on-site service, and long-term technical assistance.',
      image: '/images/services/amc-support.jpg',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Consultation & Site Audit',
      desc: 'We start by understanding your business needs. Our senior engineers audit your premises, check existing infrastructure, and analyze capacity requirements.'
    },
    {
      step: '02',
      title: 'Custom Blueprint Planning',
      desc: 'We design the architecture, draft network cabling maps, select certified licensing, specify camera focal arcs, and plan structural hardware layouts.'
    },
    {
      step: '03',
      title: 'Execution & Deployment',
      desc: 'Our certified execution teams procure OEM hardware, run fiber lines, mount CCTV/biometrics, install servers, deploy software, and test connectivity.'
    },
    {
      step: '04',
      title: 'Ongoing SLA Support',
      desc: 'We hand over clean documentation, train your staff, and activate AMC SLAs to run regular preventive scans and deliver instant ticketing help.'
    }
  ];

  return (
    <div className="bg-white">
      
      {/* 1. TOP HERO BANNER (Compact Blue/Navy Gradient) */}
      <section className="relative bg-mesh bg-hero-pattern pt-24 pb-12 lg:pt-28 lg:pb-14 flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
          <AnimatedSection>
            {/* Center Aligned Badge */}
            <div className="inline-flex items-center px-5 py-2 rounded-full text-base font-semibold bg-white/10 border border-white/20 text-white/90 mb-6 font-sans">
              OUR SERVICES
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight font-heading">
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Technology Solutions
              </span>
              <br className="hidden sm:block" /> For Every Business
            </h1>

            {/* Subheading & Tagline */}
            <div className="max-w-4xl mx-auto space-y-3">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-sans">
                CG Techno provides complete technology, networking, security, licensing, automation, infrastructure, electronics integration, and support solutions for businesses of every size.
              </p>
              <p className="text-cyan-300 font-bold text-sm sm:text-base tracking-wide font-sans">
                One Partner. Every Technology Requirement.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. ECOSYSTEM SPLIT SECTION (50 / 50 Layout) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Left Side: Restored Technology Collage Image */}
            <div className="w-full lg:w-1/2 relative">
              <AnimatedSection direction="left">
                <div className="relative group overflow-hidden rounded-[24px] shadow-2xl aspect-[4/3] border border-slate-100">
                  <Image
                    src="/images/services_collage.png"
                    alt="CG Techno Premium Technology Ecosystem"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/15 to-transparent pointer-events-none" />
                </div>
              </AnimatedSection>
            </div>

            {/* Right Side: Technology Ecosystem Details */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
              <AnimatedSection direction="right" delay={0.1}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary-50 border border-primary-100 text-primary-800 uppercase tracking-wider">
                  COMPLETE TECHNOLOGY ECOSYSTEM
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight font-heading leading-tight mt-3">
                  Everything Your Business Needs.<br className="hidden sm:block" />
                  Under One Roof.
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mt-4">
                  From Microsoft Licensing and enterprise IT infrastructure to CCTV surveillance, biometric systems, boom barriers, networking, automation, electronics integration, and AMC support, CG Techno delivers complete end-to-end technology solutions.
                </p>

                {/* Highlighted Box */}
                <div className="bg-primary-50/40 border-l-4 border-primary-800 rounded-r-2xl p-5 shadow-sm">
                  <p className="text-primary-950 font-semibold text-sm sm:text-base leading-relaxed">
                    No matter how small or large your organization is, CG Techno can design, deploy, integrate, and support your complete technology ecosystem.
                  </p>
                </div>

                {/* Trust Pills */}
                <div className="space-y-3.5 pt-2">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Target Organizations We Serve</p>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      'Startups',
                      'SMEs',
                      'Enterprises',
                      'Institutions',
                      'Government Organizations'
                    ].map((pill) => (
                      <div
                        key={pill}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-lg shadow-sm hover:bg-primary-50 hover:border-primary-300 hover:text-primary-900 transition-all duration-150 cursor-default"
                      >
                        <span className="text-primary-800 font-bold text-xs">✓</span>
                        <span>{pill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                  <Link
                    href="/contact"
                    onClick={() => trackCTA('Request Consultation', 'Request Consultation Clicked')}
                    className="inline-flex items-center justify-center gap-2.5 px-6 h-12 bg-primary-800 hover:bg-primary-750 text-white font-bold rounded-xl shadow-[0_4px_14px_rgba(6,20,45,0.15)] hover:shadow-[0_6px_20px_rgba(6,20,45,0.22)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-sm"
                  >
                    Request Consultation
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="#services-grid"
                    onClick={() => trackCTA('Explore Solutions', 'Explore Solutions Clicked')}
                    className="inline-flex items-center justify-center gap-2.5 px-6 h-12 border-2 border-slate-250 text-slate-700 hover:bg-slate-50/50 hover:border-slate-350 hover:scale-[1.01] active:scale-[0.99] font-bold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-sm"
                  >
                    Explore Solutions
                  </Link>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      <section
        id="services-grid"
        className="py-16 sm:py-20 bg-white border-t border-b border-slate-100 overflow-hidden scroll-mt-12 relative"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(37,99,235,0.04) 0%, transparent 70%)'
        }}
      >
        <div id="industries-served" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-14">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight font-heading">
                Technology Solutions We Deliver
              </h2>
              <p className="text-gray-550 text-sm sm:text-base leading-relaxed mt-4 max-w-4xl mx-auto">
                From software licensing and enterprise IT infrastructure to security, networking, biometric systems, boom barriers, electronics integration, and long-term support — CG Techno delivers complete technology ecosystems for organizations of every size.
              </p>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionCards.map((card) => {
              return (
                <StaggerItem key={card.title}>
                  <motion.div
                    id={card.id}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    onClick={() => trackServiceInterest(mapServiceInterestName(card.title))}
                    className="h-full bg-white border border-[#0F172A]/[0.06] rounded-[24px] p-0 shadow-[0_8px_30px_rgba(15,23,42,0.06)] flex flex-col justify-between group scroll-mt-28 overflow-hidden transition-all duration-300 border-t-4 border-primary-800 hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)] cursor-pointer"
                  >
                    {/* Premium Image Banner */}
                    <div className="relative h-[180px] md:h-[200px] lg:h-[220px] w-full overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-108"
                        style={{ transition: 'transform 0.5s ease' }}
                        loading="lazy"
                      />
                      {/* Premium Dark Overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none" 
                        style={{ 
                          background: 'linear-gradient(rgba(15,23,42,0.12), rgba(15,23,42,0.28))' 
                        }} 
                      />
                    </div>

                    {/* Card Body */}
                    <div className="pt-8 px-8 pb-8 flex flex-col justify-between flex-grow">
                      <div className="space-y-4">
                        <h3 className="text-xl md:text-2xl lg:text-[28px] font-bold text-[#0F172A] font-heading leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-[#475569] text-base leading-[1.8] min-h-[96px] md:min-h-[110px] lg:min-h-[115px] line-clamp-4">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. PROCESS SECTION (Timeline UI, 4-Step Process) */}
      <section className="py-16 sm:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-900 border border-primary-200/50 mb-4 uppercase tracking-wider">
                Our Timeline
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight font-heading mt-2">
                Unified Integration Process
              </h2>
              <p className="text-gray-550 text-base sm:text-lg leading-relaxed mt-4">
                A seamless 4-step path to auditing, designing, deploying, and supporting your business technology.
              </p>
            </AnimatedSection>
          </div>

          {/* Timeline UI */}
          <div className="relative">
            {/* Center Line (Hidden on Mobile) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-100 -translate-x-1/2" />

            <div className="space-y-12 lg:space-y-16">
              {processSteps.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={step.step} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    
                    {/* Left content block */}
                    <div className={cn(
                      "lg:col-span-5 flex flex-col",
                      isEven ? "lg:items-end lg:text-right" : "lg:order-last lg:items-start lg:text-left"
                    )}>
                      <AnimatedSection direction={isEven ? 'left' : 'right'}>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-900 text-white font-bold text-lg mb-4 shadow-md font-heading">
                          {step.step}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 font-heading leading-snug">{step.title}</h3>
                        <p className="text-gray-500 text-base leading-relaxed mt-4 max-w-xl">
                          {step.desc}
                        </p>
                      </AnimatedSection>
                    </div>

                    {/* Center Point Icon */}
                    <div className="hidden lg:col-span-2 lg:flex justify-center relative">
                      <div className="w-6 h-6 rounded-full bg-white border-4 border-primary-800 shadow-sm z-20 animate-pulse" />
                    </div>

                    {/* Right spacer block */}
                    <div className="hidden lg:col-span-5 lg:block" />

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      {/* 7. FINAL CTA SECTION (Large Royal Blue background) */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-primary-950 via-primary-850 to-primary-950 relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold mb-8 backdrop-blur-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              SLA-Guaranteed Integrations
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-6 tracking-tight leading-tight">
              Looking For A Technology Partner?
            </h2>
            
            <p className="text-white/70 text-lg sm:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Let&apos;s discuss your requirement and build the right solution for your business. Reach out to coordinate site audits, pricing estimates, and hardware demos.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/contact"
                onClick={() => trackCTA('Contact Us', 'Request Consultation Clicked')}
                className="inline-flex items-center justify-center gap-2.5 px-10 py-5 bg-white text-primary-950 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 text-lg hover:scale-103"
              >
                Contact Us
                <ArrowRight size={20} className="text-primary-950" />
              </Link>
              <Link
                href="/contact?schedule=true"
                onClick={() => trackCTA('Schedule Consultation', 'Request Consultation Clicked')}
                className="inline-flex items-center justify-center gap-2.5 px-10 py-5 border-2 border-white/30 hover:border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-200 text-lg hover:scale-103"
              >
                Schedule Consultation
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
