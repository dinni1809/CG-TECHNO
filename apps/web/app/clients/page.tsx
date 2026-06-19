import type { Metadata } from 'next';
import { clients, industries, siteConfig } from '@cg-techno/config';
import { Users } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { CTABanner } from '@/components/sections/CTABanner';
import { JsonLd } from '@/components/SEO/JsonLd';
import { HeroCTA } from '@/components/ui/HeroCTA';

export const metadata: Metadata = {
  title: 'Our Clients',
  description: 'CG Techno Electronics proudly serves 500+ enterprise clients including government agencies, IT companies, hospitals, and banks across Karnataka.',
  keywords: [
    'CG Techno Clients',
    'Enterprise IT Customers Bangalore',
    'Government IT Contractor Karnataka',
    'Hospital Infrastructure Projects',
  ],
  openGraph: {
    title: 'Our Clients | CG Techno Electronics',
    description: 'CG Techno Electronics proudly serves 500+ enterprise clients including government agencies, IT companies, hospitals, and banks across Karnataka.',
    url: '/clients',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'CG Techno Client Base' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Clients | CG Techno Electronics',
    description: 'CG Techno Electronics proudly serves 500+ enterprise clients including government agencies, IT companies, hospitals, and banks across Karnataka.',
    images: ['/og-image.jpg'],
  },
};

const industryColors: Record<string, string> = {
  Government: 'bg-blue-100 text-blue-700',
  IT: 'bg-violet-100 text-violet-700',
  Healthcare: 'bg-emerald-100 text-emerald-700',
  Banking: 'bg-amber-100 text-amber-700',
};

export default function ClientsPage() {
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
        'name': 'Our Clients',
        'item': `${siteConfig.url}/clients`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <section className="relative bg-mesh bg-hero-pattern pt-24 pb-12 lg:pt-28 lg:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-base font-semibold bg-white/10 border border-white/20 text-white/90 mb-8">
              <Users size={16} className="text-blue-300" />
              <span>Trusted Clients</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                500+ Enterprises
              </span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed mb-8">
              From government bodies to IT companies and hospitals — organizations across Karnataka
              trust CG Techno Electronics for their critical IT infrastructure.
            </p>
            <div className="flex justify-center">
              <HeroCTA href="/contact" label="Partner With Us" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="pt-10 pb-28 lg:pt-14 lg:pb-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-20">
            {[
              { industry: 'Government', count: '25+', color: 'bg-blue-50 text-blue-700 border-blue-100' },
              { industry: 'IT', count: '150+', color: 'bg-violet-50 text-violet-700 border-violet-100' },
              { industry: 'Healthcare', count: '80+', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
              { industry: 'Banking', count: '60+', color: 'bg-amber-50 text-amber-700 border-amber-100' },
            ].map((item) => (
              <div key={item.industry} className={`rounded-3xl p-8 text-center border shadow-sm ${item.color}`}>
                <div className="text-4xl lg:text-5xl font-bold mb-2 font-heading">{item.count}</div>
                <div className="text-base font-semibold">{item.industry} Clients</div>
              </div>
            ))}
          </AnimatedSection>

          <SectionHeader
            tag="Trusted Clients"
            tagIcon={Users}
            title="Organizations We"
            titleHighlight="Serve"
            className="mb-16"
          />

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7">
            {clients.map((client) => (
              <StaggerItem key={client.id}>
                <div className="bg-white border border-gray-100 rounded-3xl p-7 text-center hover:shadow-md hover:border-primary-100 transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-md">
                      {client.abbreviation}
                    </div>
                    <div className="text-sm font-bold text-gray-800 leading-snug mb-3 line-clamp-2">
                      {client.name}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${industryColors[client.industry] || 'bg-gray-100 text-gray-600'}`}>
                      {client.industry}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <ProjectShowcase />
      <CTABanner />
    </>
  );
}
