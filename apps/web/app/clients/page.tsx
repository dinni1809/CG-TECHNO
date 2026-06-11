import type { Metadata } from 'next';
import { clients, industries } from '@cg-techno/config';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { CTABanner } from '@/components/sections/CTABanner';

export const metadata: Metadata = {
  title: 'Our Clients',
  description: 'CG Techno Electronics proudly serves 500+ enterprise clients including government agencies, IT companies, hospitals, and banks across Karnataka.',
};

const industryColors: Record<string, string> = {
  Government: 'bg-blue-100 text-blue-700',
  IT: 'bg-violet-100 text-violet-700',
  Healthcare: 'bg-emerald-100 text-emerald-700',
  Banking: 'bg-amber-100 text-amber-700',
};

export default function ClientsPage() {
  return (
    <>
      <section className="relative bg-mesh bg-hero-pattern pt-28 pb-20 lg:pt-36 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-white/80 mb-5">
              Our Clients
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5">
              Trusted by{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                500+ Enterprises
              </span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              From government bodies to IT companies and hospitals — organizations across Karnataka
              trust CG Techno Electronics for their critical IT infrastructure.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
            {[
              { industry: 'Government', count: '25+', color: 'bg-blue-50 text-blue-700 border-blue-100' },
              { industry: 'IT', count: '150+', color: 'bg-violet-50 text-violet-700 border-violet-100' },
              { industry: 'Healthcare', count: '80+', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
              { industry: 'Banking', count: '60+', color: 'bg-amber-50 text-amber-700 border-amber-100' },
            ].map((item) => (
              <div key={item.industry} className={`rounded-2xl p-6 text-center border ${item.color}`}>
                <div className="text-3xl font-bold mb-1 font-heading">{item.count}</div>
                <div className="text-sm font-medium">{item.industry} Clients</div>
              </div>
            ))}
          </AnimatedSection>

          <SectionHeader
            tag="Client Portfolio"
            title="Organizations We"
            titleHighlight="Serve"
            className="mb-12"
          />

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {clients.map((client) => (
              <StaggerItem key={client.id}>
                <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-md hover:border-primary-100 transition-all">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 shadow-md">
                    {client.abbreviation}
                  </div>
                  <div className="text-xs font-semibold text-gray-800 leading-tight mb-2 line-clamp-2">
                    {client.name}
                  </div>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${industryColors[client.industry] || 'bg-gray-100 text-gray-600'}`}>
                    {client.industry}
                  </span>
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
