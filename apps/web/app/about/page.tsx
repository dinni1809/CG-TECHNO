import type { Metadata } from 'next';
import { CheckCircle2, Target, Eye, Heart, Users, Award, MapPin, Clock, Building } from 'lucide-react';
import { siteConfig } from '@cg-techno/config';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about CG Techno Electronics — Bengaluru\'s trusted IT infrastructure partner with 10+ years of excellence serving 500+ enterprise clients.',
};

const values = [
  { icon: Target, title: 'Customer First', description: 'Every decision we make is driven by what\'s best for our clients\' business goals.' },
  { icon: Award, title: 'Quality Assured', description: 'We supply and install only genuine, certified products from authorized channels.' },
  { icon: Heart, title: 'Long-term Partnerships', description: 'We build relationships, not transactions — 98% of our clients renew their AMCs.' },
  { icon: Users, title: 'Expert Team', description: 'Our certified engineers bring deep expertise across networking, servers, and surveillance.' },
];

export default function AboutPage() {
  return (
    <>
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
            <p className="text-white/70 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
              A decade of building the digital backbone of Bengaluru&apos;s enterprises —
              one network, one server, one solution at a time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pt-10 pb-6 lg:pt-14 lg:pb-8 bg-white">
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

      <section className="pt-10 pb-28 lg:pt-12 lg:pb-36 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            <AnimatedSection direction="left">
              <div className="bg-white rounded-3xl p-10 border border-gray-100 h-full shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6 shadow-inner">
                  <Target size={26} className="text-primary-800" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Our Mission</h3>
                <p className="text-gray-650 text-base leading-relaxed">
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
                <p className="text-gray-650 text-base leading-relaxed">
                  To be Karnataka&apos;s most trusted IT infrastructure partner — known for technical excellence,
                  transparent practices, and long-term partnerships that scale with our clients&apos; ambitions.
                </p>
              </div>
            </AnimatedSection>
          </div>

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
                  <p className="text-base text-gray-650 leading-relaxed">{value.description}</p>
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
