import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight, Network, Camera, Cctv, Server, Laptop, ShieldCheck, Database, Router, Cloud, Shield, BriefcaseBusiness, Recycle, Package, Award, Clock, CheckCircle2, Zap
} from 'lucide-react';
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
  Network,
  Camera,
  Cctv,
  Server,
  Laptop,
  ShieldCheck,
  Database,
  Router,
  Cloud,
  Shield,
  BriefcaseBusiness,
  Recycle,
  Package,
};

const trustBadges = [
  { icon: ShieldCheck, label: 'Certified Engineers' },
  { icon: Award, label: '10+ Years Experience' },
  { icon: Clock, label: '24/7 Support SLA' },
  { icon: CheckCircle2, label: 'Quality Assured' },
  { icon: Zap, label: 'Rapid Deployment' },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative bg-mesh bg-hero-pattern pt-24 pb-12 lg:pt-28 lg:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center px-5 py-2 rounded-full text-base font-semibold bg-white/10 border border-white/20 text-white/90 mb-8">
              What We Offer
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Our IT{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
              End-to-end technology solutions designed to optimize your IT infrastructure,
              enhance security, and drive operational efficiency.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pt-10 pb-28 lg:pt-14 lg:pb-36 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
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
                        'lg:col-span-2 p-10 lg:p-14 flex flex-col justify-center bg-gradient-to-br',
                        service.gradient
                      )}>
                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-8 shadow-inner">
                          <Icon size={28} className="text-white" />
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-heading">{service.title}</h2>
                        <p className="text-white leading-relaxed text-base">{service.longDescription}</p>
                      </div>

                      <div className="lg:col-span-3 p-10 lg:p-14 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider font-heading">What&apos;s Included</h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {service.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-3.5 text-base text-gray-750">
                                <div className={cn('mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br shadow-sm', service.gradient)}>
                                  <span className="text-white text-xs font-bold">✓</span>
                                </div>
                                <span className="leading-snug">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Value-Add Trust Strip */}
                          <div className="mb-10 pt-8 border-t border-gray-100">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              {trustBadges.slice(0, 4).map((badge) => {
                                const BadgeIcon = badge.icon;
                                return (
                                  <div key={badge.label} className="flex items-center gap-3 text-gray-700">
                                    <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 bg-gradient-to-br shadow-sm', service.gradient)}>
                                      <BadgeIcon size={18} />
                                    </div>
                                    <span className="text-sm font-semibold leading-tight">{badge.label}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div>
                          <Link
                            href={service.ctaHref}
                            className={cn(
                              'inline-flex items-center gap-2.5 px-8 py-4 text-base font-bold rounded-xl text-white bg-gradient-to-br transition-all hover:opacity-90 hover:gap-3.5 shadow-lg',
                              service.gradient
                            )}
                          >
                            {service.ctaLabel}
                            <ArrowRight size={18} />
                          </Link>
                        </div>
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
