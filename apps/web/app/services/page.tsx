import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Server, Camera, Database, Recycle, Package, MonitorSmartphone } from 'lucide-react';
import { services } from '@cg-techno/config';
import { cn } from '@cg-techno/utils';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { CTABanner } from '@/components/sections/CTABanner';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive IT infrastructure services including IT setup, CCTV surveillance, server solutions, e-waste management, product distribution, and rental services.',
};

const iconMap: Record<string, React.ElementType> = {
  Server, Camera, Database, Recycle, Package, MonitorSmartphone,
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative bg-mesh bg-hero-pattern pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-white/80 mb-5">
              What We Offer
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
              Our IT{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              End-to-end technology solutions designed to optimize your IT infrastructure,
              enhance security, and drive operational efficiency.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Server;
              const isEven = i % 2 === 0;
              return (
                <AnimatedSection key={service.id} delay={0.05 * i}>
                  <div
                    id={service.id}
                    className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow scroll-mt-24"
                  >
                    <div className={cn(
                      'grid grid-cols-1 lg:grid-cols-5 items-stretch',
                      !isEven && 'lg:flex-row-reverse'
                    )}>
                      <div className={cn(
                        'lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br',
                        service.gradient
                      )}>
                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                          <Icon size={28} className="text-white" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">{service.title}</h2>
                        <p className="text-white/80 leading-relaxed text-sm">{service.longDescription}</p>
                      </div>

                      <div className="lg:col-span-3 p-8 lg:p-12">
                        <h3 className="text-base font-bold text-gray-900 mb-5 uppercase tracking-wider">What&apos;s Included</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                              <div className={cn('mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br', service.gradient)}>
                                <span className="text-white text-xs font-bold">✓</span>
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={service.ctaHref}
                          className={cn(
                            'inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl text-white bg-gradient-to-br transition-all hover:opacity-90 hover:gap-3 shadow-lg',
                            service.gradient
                          )}
                        >
                          {service.ctaLabel}
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
