'use client';

import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';
import Image from 'next/image';
import { SectionHeader } from '../ui/SectionHeader';

const brands = [
  { name: 'Dell', description: 'Enterprise Servers & Laptops' },
  { name: 'HP', description: 'Business Systems & Printers' },
  { name: 'Lenovo', description: 'ThinkStation & Server Racks' },
  { name: 'Cisco', description: 'Enterprise Switches & Routers' },
  { name: 'Intel', description: 'Xeon Processor Cores' },
  { name: 'Microsoft', description: 'Azure & Server Operating Systems' },
  { name: 'Hikvision', description: 'NVR & CCTV Security Ecosystems' },
  { name: 'APC', description: 'Smart-UPS & Power Backup' },
];

export function PartnerBrands() {
  // Double the list for seamless marquee effect
  const doubledBrands = [...brands, ...brands];

  return (
    <section className="py-20 bg-gray-50 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Partner Brands"
          tagIcon={Handshake}
          title="Authorized Integration &"
          titleHighlight="Support Partners"
          description="We collaborate with the world's leading IT hardware and infrastructure manufacturers to deliver genuine, high-performance solutions."
          className="mb-16 text-center"
        />
        
        <div className="relative overflow-hidden w-full">
          <div className="flex gap-10 animate-marquee w-max py-2">
            {doubledBrands.map((brand, i) => (
              <motion.div
                key={`${brand.name}-${i}`}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center bg-white border border-gray-100/80 rounded-xl px-8 py-4 min-w-[180px] shadow-sm hover:shadow-md transition-shadow cursor-default"
              >
                <div className="relative w-[140px] h-12 flex items-center justify-center">
                  <Image
                    src={`/logos/${brand.name.toLowerCase()}.svg`}
                    alt={`${brand.name} Logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-medium text-slate-800 mt-2 tracking-tight">
                  {brand.name}
                </span>
                <span className="text-[9px] text-gray-500 font-medium mt-0.5 uppercase text-center leading-tight">
                  {brand.description}
                </span>
              </motion.div>
            ))}
          </div>
          
          {/* Fading side gradients */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
