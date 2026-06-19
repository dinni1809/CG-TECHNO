'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const partners = [
  { name: 'Microsoft', color: 'group-hover:text-[#F25022]' },
  { name: 'Google', color: 'group-hover:text-[#4285F4]' },
  { name: 'AWS', color: 'group-hover:text-[#FF9900]' },
  { name: 'VMware', color: 'group-hover:text-[#0095D9]' },
  { name: 'Cisco', color: 'group-hover:text-[#1BA0D7]' },
  { name: 'Dell', color: 'group-hover:text-[#007DB8]' },
  { name: 'HP', color: 'group-hover:text-[#0096D6]' },
  { name: 'Lenovo', color: 'group-hover:text-[#E21C26]' },
  { name: 'Adobe', color: 'group-hover:text-[#FF0000]' }
];

export function TechnologyPartners() {
  return (
    <section className="py-24 bg-white border-b border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Global Ecosystem"
          tagIcon={Network}
          title="Technology Partners"
          titleHighlight="& Ecosystem"
          description="Trusted integrations with the world's leading technology developers."
          className="mb-16"
        />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((partner, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-50 border border-gray-150 rounded-2xl h-24 flex items-center justify-center cursor-default shadow-sm group hover:bg-white hover:border-primary-400 hover:shadow-md transition-all duration-300"
              >
                <span className={`text-xl sm:text-2xl font-black tracking-tight text-gray-400 grayscale group-hover:grayscale-0 transition-all font-sans ${partner.color}`}>
                  {partner.name}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
