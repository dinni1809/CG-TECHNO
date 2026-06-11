'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { productCategories } from '@cg-techno/config';
import { cn } from '@cg-techno/utils';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { CTABanner } from '@/components/sections/CTABanner';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  return (
    <>
      <section className="relative bg-mesh bg-hero-pattern pt-28 pb-20 lg:pt-36 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-white/80 mb-5">
              Product Portfolio
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5">
              Enterprise{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Hardware
              </span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Genuine products from the world&apos;s leading brands. No pricing listed —
              contact us for custom quotes tailored to your budget and requirements.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {productCategories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200',
                  activeCategory === cat.id
                    ? 'bg-primary-800 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <ProductsSection filterCategory={activeCategory === 'all' ? undefined : activeCategory} />
      <CTABanner />
    </>
  );
}
