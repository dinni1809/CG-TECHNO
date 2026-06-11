'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Server, Camera, Database, Recycle, Package, MonitorSmartphone, ArrowRight,
} from 'lucide-react';
import { services } from '@cg-techno/config';
import { cn } from '@cg-techno/utils';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const iconMap: Record<string, React.ElementType> = {
  Server, Camera, Database, Recycle, Package, MonitorSmartphone,
};

export function ServicesSection({ compact = false }: { compact?: boolean }) {
  const displayServices = compact ? services : services;

  return (
    <section className={cn('bg-gray-50', compact ? 'py-16' : 'py-20 lg:py-28')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="What We Do"
          title="Comprehensive IT"
          titleHighlight="Solutions"
          description="From infrastructure setup to ongoing support — we provide the full spectrum of IT and electronics solutions to keep your business running at peak performance."
          className="mb-14"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service) => {
            const Icon = iconMap[service.icon] || Server;
            return (
              <StaggerItem key={service.id}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
                  transition={{ duration: 0.25 }}
                  className="group relative bg-white rounded-2xl p-7 border border-gray-100 h-full flex flex-col overflow-hidden"
                >
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br',
                    service.gradient,
                    'shadow-lg'
                  )}>
                    <Icon size={22} className="text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-1.5 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs text-gray-500">
                        <div className={cn('mt-1 w-1.5 h-1.5 rounded-full shrink-0 bg-gradient-to-br', service.gradient)} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.ctaHref}
                    className={cn(
                      'inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200',
                      service.color,
                      'hover:gap-3'
                    )}
                  >
                    {service.ctaLabel}
                    <ArrowRight size={15} />
                  </Link>

                  <div className={cn(
                    'absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-5 bg-gradient-to-br pointer-events-none',
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
