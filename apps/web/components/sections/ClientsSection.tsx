'use client';

import { motion } from 'framer-motion';
import { clients } from '@cg-techno/config';
import { SectionHeader } from '../ui/SectionHeader';
import { AnimatedSection } from '../ui/AnimatedSection';

const featuredClients = clients.filter((c) => c.featured);
const doubledClients = [...featuredClients, ...featuredClients];

const industryColors: Record<string, string> = {
  Government: 'bg-blue-100 text-blue-700',
  IT: 'bg-violet-100 text-violet-700',
  Healthcare: 'bg-emerald-100 text-emerald-700',
  Banking: 'bg-amber-100 text-amber-700',
};

export function ClientsSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? 'py-16 bg-white' : 'py-20 lg:py-28 bg-white'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Our Clients"
          title="Trusted by"
          titleHighlight="500+ Enterprises"
          description="From government agencies to leading IT companies — organizations across Bengaluru rely on CG Techno Electronics."
          className="mb-14"
        />

        <AnimatedSection className="relative overflow-hidden">
          <div className="flex gap-4 animate-marquee w-max">
            {doubledClients.map((client, i) => (
              <motion.div
                key={`${client.id}-${i}`}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 bg-white border border-gray-100 rounded-2xl px-7 py-5 min-w-[200px] flex flex-col items-center gap-3 shadow-sm hover:shadow-md hover:border-primary-100 transition-all cursor-default"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {client.abbreviation}
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-800 text-center leading-tight line-clamp-2">
                    {client.name}
                  </div>
                  <div className={`mt-2 inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${industryColors[client.industry] || 'bg-gray-100 text-gray-600'}`}>
                    {client.industry}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </AnimatedSection>

        {!compact && (
          <AnimatedSection delay={0.3} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Government Bodies', count: '25+', color: 'text-blue-700', bg: 'bg-blue-50' },
              { label: 'IT Companies', count: '150+', color: 'text-violet-700', bg: 'bg-violet-50' },
              { label: 'Hospitals & Healthcare', count: '80+', color: 'text-emerald-700', bg: 'bg-emerald-50' },
              { label: 'Banks & Finance', count: '60+', color: 'text-amber-700', bg: 'bg-amber-50' },
            ].map((item) => (
              <div key={item.label} className={`${item.bg} rounded-2xl p-6 text-center`}>
                <div className={`text-3xl font-bold ${item.color} font-heading mb-1`}>{item.count}</div>
                <div className="text-sm text-gray-600 font-medium">{item.label}</div>
              </div>
            ))}
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
