import type { Metadata } from 'next';
import { CheckCircle2, Target, Eye, Heart, Users, Award, MapPin, Clock } from 'lucide-react';
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
      <section className="relative bg-mesh bg-hero-pattern pt-28 pb-20 lg:pt-36 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-white/80 mb-5">
              Our Story
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5">
              About{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                CG Techno
              </span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              A decade of building the digital backbone of Bengaluru&apos;s enterprises —
              one network, one server, one solution at a time.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Our Track Record"
            title="Solid Foundations of"
            titleHighlight="Credibility & Trust"
            className="mb-14 text-center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <AnimatedSection direction="up" delay={0.05} className="bg-gradient-to-br from-primary-900 to-primary-750 text-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <Award size={24} className="text-cyan-300" />
                </div>
                <h3 className="text-3xl font-bold font-heading mb-2">10+ Years</h3>
                <h4 className="text-sm font-bold text-cyan-200 uppercase tracking-wider mb-2">Of Experience</h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  Established in Bengaluru, serving Karnataka with reliable corporate tech integrations since 2014.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.1} className="bg-gradient-to-br from-indigo-900 to-indigo-750 text-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <Users size={24} className="text-cyan-300" />
                </div>
                <h3 className="text-3xl font-bold font-heading mb-2">500+</h3>
                <h4 className="text-sm font-bold text-cyan-200 uppercase tracking-wider mb-2">Enterprise Clients</h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  From major hospitals to banking houses, our client roster represents trusted Indian industry leaders.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.15} className="bg-gradient-to-br from-emerald-950 to-emerald-800 text-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <CheckCircle2 size={24} className="text-cyan-300" />
                </div>
                <h3 className="text-3xl font-bold font-heading mb-2">1,000+</h3>
                <h4 className="text-sm font-bold text-cyan-200 uppercase tracking-wider mb-2">Projects Delivered</h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  Flawlessly executed structured cabling networks, network racks, and secure enterprise servers.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2} className="bg-gradient-to-br from-rose-950 to-rose-800 text-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <Clock size={24} className="text-cyan-300" />
                </div>
                <h3 className="text-3xl font-bold font-heading mb-2">24/7/365</h3>
                <h4 className="text-sm font-bold text-cyan-200 uppercase tracking-wider mb-2">Support SLA</h4>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                  Dedicated maintenance teams ensure round-the-clock emergency support for network outages.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="up" delay={0.25} className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-4 border-l-4 border-l-primary-850">
            <MapPin size={24} className="text-primary-850 shrink-0" />
            <div>
              <div className="font-bold text-gray-900 text-sm">Corporate Headquarters</div>
              <div className="text-xs sm:text-sm text-gray-650 mt-0.5">{siteConfig.address.full}</div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <AnimatedSection direction="left">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-5">
                  <Target size={24} className="text-primary-800" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower businesses with reliable, cutting-edge IT infrastructure that drives growth,
                  enhances security, and maximizes operational efficiency — delivered with unmatched
                  expertise and customer commitment.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 h-full">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-5">
                  <Eye size={24} className="text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be Karnataka&apos;s most trusted IT infrastructure partner — known for technical excellence,
                  transparent practices, and long-term partnerships that scale with our clients&apos; ambitions.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <SectionHeader
            tag="Our Values"
            title="What Drives"
            titleHighlight="Everything We Do"
            className="mb-12"
          />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <value.icon size={22} className="text-primary-800" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
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
