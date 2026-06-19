import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle2, Target, Eye, Heart, Users, Award, MapPin, Clock, Building, Shield } from 'lucide-react';
import { siteConfig } from '@cg-techno/config';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTABanner } from '@/components/sections/CTABanner';

import { JsonLd } from '@/components/SEO/JsonLd';
import { HeroCTA } from '@/components/ui/HeroCTA';

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn about CG Techno Electronics — Bengaluru's trusted IT infrastructure partner with 10+ years of excellence serving 500+ enterprise clients.",
  keywords: [
    'About CG Techno',
    'Enterprise IT Partner Bangalore',
    'IT Solutions Company Karnataka',
    'Technology Solutions Bengaluru',
  ],
  openGraph: {
    title: 'About Us | CG Techno Electronics',
    description: "Learn about CG Techno Electronics — Bengaluru's trusted IT infrastructure partner with 10+ years of excellence serving 500+ enterprise clients.",
    url: '/about',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'About CG Techno Electronics' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | CG Techno Electronics',
    description: "Learn about CG Techno Electronics — Bengaluru's trusted IT infrastructure partner with 10+ years of excellence serving 500+ enterprise clients.",
    images: ['/og-image.jpg'],
  },
};

const officeImage = 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAEigGmjGNLnTHI2g62hxm5ToTeyFJpNXQLvnNWfeiUd22CJypNp_pVg4E2kcBv8EIP_VRGRKBVOHfsgGgEoJgRRVFv113c3mUAbkJPNmaDylEtHcXz-bJI6g3ieNgXQxXD9XNg=s1360-w1360-h1020-rw';

const values = [
  { icon: Target, title: 'Customer First', description: 'Every decision we make is driven by what\'s best for our clients\' business goals.' },
  { icon: Award, title: 'Quality Assured', description: 'We supply and install only genuine, certified equipment from authorized channels.' },
  { icon: Heart, title: 'Long-term Partnerships', description: 'We build relationships, not transactions — 98% of our clients renew their AMCs.' },
  { icon: Users, title: 'Expert Team', description: 'Our certified engineers bring deep expertise across networking, servers, and surveillance.' },
];

export default function AboutPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': siteConfig.url,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'About Us',
        'item': `${siteConfig.url}/about`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      {/* 1. About Hero / Company Story */}
      <section className="relative bg-mesh bg-hero-pattern pt-24 pb-12 lg:pt-28 lg:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center px-5 py-2 rounded-full text-base font-semibold bg-white/10 border border-white/20 text-white/90 mb-8">
              Our Story
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                CG Techno
              </span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed mb-8">
              CG Techno Electronics is a trusted IT solutions provider helping organizations modernize infrastructure, secure business operations, and manage cloud environments through expert consulting, managed services, cybersecurity solutions, and enterprise technology support.
            </p>
            <div className="flex justify-center">
              <HeroCTA href="/contact" label="Request Consultation" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. Our Track Record (Moved Up) */}
      <section className="pt-20 pb-6 lg:pt-28 lg:pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Our Track Record"
            tagIcon={Building}
            title="Solid Foundations of"
            titleHighlight="Credibility & Trust"
            className="mb-20 text-center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-0">
            <AnimatedSection direction="up" delay={0.05} className="bg-gradient-to-br from-[#4A5D6E] to-[#243342] text-white rounded-3xl p-10 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between h-full">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 shadow-inner">
                  <Award size={26} className="text-cyan-300" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold font-heading mb-3">10+ Years</h3>
                <h4 className="text-base font-bold text-cyan-200 uppercase tracking-wider mb-3">Of Experience</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  Established in Bengaluru, serving Karnataka with reliable corporate tech integrations since 2014.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1} className="bg-gradient-to-br from-[#5C5768] to-[#2C2735] text-white rounded-3xl p-10 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between h-full">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 shadow-inner">
                  <Users size={26} className="text-cyan-300" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold font-heading mb-3">500+</h3>
                <h4 className="text-base font-bold text-cyan-200 uppercase tracking-wider mb-3">Enterprise Clients</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  From major hospitals to banking houses, our client roster represents trusted Indian industry leaders.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.15} className="bg-gradient-to-br from-[#147B7B] to-[#0A3D3D] text-white rounded-3xl p-10 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between h-full">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 shadow-inner">
                  <CheckCircle2 size={26} className="text-cyan-300" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold font-heading mb-3">1,000+</h3>
                <h4 className="text-base font-bold text-cyan-200 uppercase tracking-wider mb-3">Projects Delivered</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  Flawlessly executed structured cabling networks, network racks, and secure enterprise servers.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2} className="bg-gradient-to-br from-[#9B2C3C] to-[#4E111B] text-white rounded-3xl p-10 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between h-full">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 shadow-inner">
                  <Clock size={26} className="text-cyan-300" />
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold font-heading mb-3">24/7/365</h3>
                <h4 className="text-base font-bold text-cyan-200 uppercase tracking-wider mb-3">Support SLA</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  Dedicated maintenance teams ensure round-the-clock emergency support for network outages.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="pt-16 pb-16 lg:pt-20 lg:pb-20 bg-gray-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <AnimatedSection direction="left">
              <div className="bg-white rounded-3xl p-10 border border-gray-100 h-full shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6 shadow-inner">
                  <Target size={26} className="text-primary-800" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Our Mission</h3>
                <p className="text-gray-655 text-base leading-relaxed">
                  To empower businesses with reliable, cutting-edge IT infrastructure that drives growth,
                  enhances security, and maximizes operational efficiency — delivered with unmatched
                  expertise and customer commitment.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="bg-white rounded-3xl p-10 border border-gray-100 h-full shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 shadow-inner">
                  <Eye size={26} className="text-emerald-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Our Vision</h3>
                <p className="text-gray-655 text-base leading-relaxed">
                  To be Karnataka&apos;s most trusted IT infrastructure partner — known for technical excellence,
                  transparent practices, and long-term partnerships that scale with our clients&apos; ambitions.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 4. Our Presence: Office & Experience Center */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Image Stack First on Mobile */}
            <div className="w-full lg:w-[55%] order-first relative">
              <AnimatedSection direction="left">
                <div className="relative group overflow-hidden rounded-[24px] shadow-2xl aspect-[4/3] border border-slate-100">
                  <Image
                    src={officeImage}
                    alt="CG Techno Electronics Bangalore Office & Experience Center"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-6 left-6 z-20 px-5 py-3.5 bg-gray-950/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl">
                    <div className="text-[10px] sm:text-xs font-bold text-cyan-300 tracking-widest uppercase">CG Techno Electronics</div>
                    <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">Bangalore Office</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column: Content */}
            <div className="w-full lg:w-[45%] space-y-8">
              <AnimatedSection direction="right" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary-50 border border-primary-100 text-primary-800 uppercase tracking-wider">
                  Our Presence
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight font-heading leading-tight mt-3">
                  Our Office & <br />Experience Center
                </h2>
                
                <p className="text-gray-550 text-base sm:text-lg leading-relaxed mt-4">
                  CG Techno Electronics operates from its physical office and experience center in Bangalore, serving organizations with enterprise technology, networking, security, automation, licensing, and electronics solutions.
                </p>

                {/* 2x2 Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                  {/* Feature 1 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-800 flex items-center justify-center shrink-0 shadow-inner">
                      <Building className="w-5 h-5 text-primary-800" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base font-heading">Physical Office</h4>
                      <p className="text-gray-550 text-xs sm:text-sm mt-1">Visit us and meet our technology experts.</p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-800 flex items-center justify-center shrink-0 shadow-inner">
                      <Shield className="w-5 h-5 text-primary-800" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base font-heading">Technology Consultation</h4>
                      <p className="text-gray-550 text-xs sm:text-sm mt-1">Find the right solution for your business.</p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-800 flex items-center justify-center shrink-0 shadow-inner">
                      <Eye className="w-5 h-5 text-primary-800" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base font-heading">Product Demonstrations</h4>
                      <p className="text-gray-550 text-xs sm:text-sm mt-1">Live demonstrations before deployment.</p>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-800 flex items-center justify-center shrink-0 shadow-inner">
                      <Users className="w-5 h-5 text-primary-800" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base font-heading">Client Support</h4>
                      <p className="text-gray-550 text-xs sm:text-sm mt-1">Faster response and personalized assistance.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <a
                    href="https://maps.app.goo.gl/BcC3Gd1TRzYC7qcb8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary-800 hover:bg-primary-750 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    <MapPin size={18} />
                    Visit Our Office
                  </a>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Our Values */}
      <section className="pt-20 pb-28 lg:pt-24 lg:pb-36 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Our Values"
            tagIcon={Award}
            title="What Drives"
            titleHighlight="Everything We Do"
            className="mb-16"
          />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="bg-white rounded-3xl p-8 border border-gray-100 text-center h-full shadow-sm">
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <value.icon size={26} className="text-primary-800" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-xl mb-3 font-heading">{value.title}</h4>
                  <p className="text-base text-gray-655 leading-relaxed">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
