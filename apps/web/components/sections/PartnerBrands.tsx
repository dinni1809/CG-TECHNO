'use client';

import { motion } from 'framer-motion';

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
    <section className="py-12 bg-gray-50 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
          Authorized Integration & Support Partners
        </p>
        
        <div className="relative overflow-hidden w-full">
          <div className="flex gap-10 animate-marquee w-max py-2">
            {doubledBrands.map((brand, i) => (
              <motion.div
                key={`${brand.name}-${i}`}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center bg-white border border-gray-100/80 rounded-xl px-8 py-4 min-w-[180px] shadow-sm hover:shadow-md transition-shadow cursor-default"
              >
                <span className="text-xl font-bold font-heading text-gray-800 tracking-tight">
                  {brand.name}
                </span>
                <span className="text-[10px] text-gray-500 font-medium mt-1 uppercase text-center leading-tight">
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
