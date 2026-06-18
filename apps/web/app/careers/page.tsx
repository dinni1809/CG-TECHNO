import type { Metadata } from 'next';
import { Briefcase, TrendingUp, BookOpen, Users, Star, Shield, Award, Cpu, Compass, CheckCircle2 } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ApplicationForm } from '@/components/sections/ApplicationForm';

import { JsonLd } from '@/components/SEO/JsonLd';
import { siteConfig } from '@cg-techno/config';
import { HeroCTA } from '@/components/ui/HeroCTA';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the CG Techno Electronics team. We are always looking for talented professionals, fresh graduates, interns, technicians, and engineers.',
  keywords: [
    'Careers at CG Techno',
    'IT Jobs Bangalore',
    'Surveillance Engineer Jobs Bengaluru',
    'Networking Jobs Karnataka',
    'Hardware Engineering Trainees',
  ],
  openGraph: {
    title: 'Careers | CG Techno Electronics',
    description: 'Join the CG Techno Electronics team. We are always looking for talented professionals, fresh graduates, interns, technicians, and engineers.',
    url: '/careers',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'CG Techno Careers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | CG Techno Electronics',
    description: 'Join the CG Techno Electronics team. We are always looking for talented professionals, fresh graduates, interns, technicians, and engineers.',
    images: ['/og-image.jpg'],
  },
};

const companyPerks = [
  {
    icon: TrendingUp,
    title: 'Growth Opportunities',
    description: 'Work on real enterprise technology projects.',
  },
  {
    icon: Cpu,
    title: 'Hands-On Experience',
    description: 'Gain practical exposure to infrastructure, networking, security, and electronics deployments.',
  },
  {
    icon: BookOpen,
    title: 'Learning Culture',
    description: 'Continuous technical learning and industry exposure.',
  },
  {
    icon: Users,
    title: 'Supportive Team',
    description: 'Work alongside experienced professionals and certified engineers.',
  },
  {
    icon: Award,
    title: 'Career Advancement',
    description: 'Grow from trainee level to leadership positions.',
  },
  {
    icon: Compass,
    title: 'Diverse Projects',
    description: 'Exposure across multiple industries and technologies.',
  },
];

export default function CareersPage() {
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
        'name': 'Careers',
        'item': `${siteConfig.url}/careers`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      {/* SECTION 1 — HERO */}
      <section className="relative bg-mesh bg-hero-pattern pt-24 pb-12 lg:pt-28 lg:pb-14 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-white/80 mb-5">
              <Briefcase size={16} className="text-blue-300" />
              <span>CAREERS AT CG TECHNO</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight font-heading">
              Build Technology.<br />
              Build Infrastructure.<br />
              Build Your Future.
            </h1>
            <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              Join a team that delivers enterprise technology, networking, security, automation, software licensing, and electronics solutions across businesses, institutions, and industries.
            </p>
            <div className="flex justify-center">
              <HeroCTA href="#apply" label="Apply Now" actionName="Apply Now Clicked" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SECTION 2 — WHY WORK WITH CG TECHNO */}
      <section className="pt-10 pb-20 lg:pt-14 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Why CG Techno"
            tagIcon={Award}
            title="Perks of Working"
            titleHighlight="With Us"
            className="mb-12"
          />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {companyPerks.map((perk) => {
              const Icon = perk.icon;
              return (
                <StaggerItem key={perk.title}>
                  <div className="bg-gray-55 rounded-3xl p-6 text-center border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all group h-full flex flex-col justify-center">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors shrink-0">
                      <Icon size={22} className="text-primary-700" />
                    </div>
                    <div className="text-sm font-bold text-gray-900 mb-2 leading-snug">{perk.title}</div>
                    <div className="text-sm text-gray-500 leading-snug">{perk.description}</div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* SECTION 3 — JOIN OUR TEAM & APPLICATION PORTAL */}
      <section className="py-24 bg-gray-50 border-t border-gray-100" id="apply">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}


