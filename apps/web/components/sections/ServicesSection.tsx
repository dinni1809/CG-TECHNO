'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Network, Camera, Cctv, Server, Laptop, ShieldCheck, Database, Router, Cloud, Shield, BriefcaseBusiness, Recycle, Package, ArrowRight
} from 'lucide-react';
import { services } from '@cg-techno/config';
import { cn } from '@cg-techno/utils';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

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

export function ServicesSection({ compact = false }: { compact?: boolean }) {
  const displayServices = compact ? services : services;

  return (
    <section className={cn('bg-gray-50', compact ? 'py-20' : 'py-28 lg:py-36')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Comprehensive IT Solutions"
          tagIcon={Shield}
          title="Comprehensive IT"
          titleHighlight="Solutions"
          description="From infrastructure setup to ongoing support — we provide the full spectrum of IT and electronics solutions to keep your business running at peak performance."
          className="mb-20"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {displayServices.map((service) => {
            const Icon = iconMap[service.icon] || Server;
            return (
              <StaggerItem key={service.id}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
                  transition={{ duration: 0.25 }}
                  className="group relative bg-white rounded-3xl p-10 border border-gray-100 h-full flex flex-col overflow-hidden"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center mb-6">
                    <Icon size={28} className="text-blue-600 shrink-0" strokeWidth={2} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-800 transition-colors font-heading">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-6 flex-1">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-gray-500">
                        <div className={cn('mt-1.5 w-2 h-2 rounded-full shrink-0 bg-gradient-to-br', service.gradient)} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.ctaHref}
                    className={cn(
                      'inline-flex items-center gap-2 text-base font-bold transition-all duration-200',
                      'text-slate-900 group-hover:text-primary-800',
                      'hover:gap-3'
                    )}
                  >
                    {service.ctaLabel}
                    <ArrowRight size={18} />
                  </Link>

                  <div className={cn(
                    'absolute top-0 right-0 w-36 h-36 rounded-bl-full opacity-5 bg-gradient-to-br pointer-events-none',
                    service.gradient
                  )} />
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {!compact && (
          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary inline-flex">
              View All Services
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
