'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { productCategories } from '@cg-techno/config';
import { cn } from '@cg-techno/utils';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { CTABanner } from '@/components/sections/CTABanner';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  return (
    <>
      <section className="relative bg-mesh bg-hero-pattern pt-24 pb-12 lg:pt-28 lg:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-base font-semibold bg-white/10 border border-white/20 text-white/90 mb-8">
              <Package size={16} className="text-blue-300" />
              <span>Product Portfolio</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Enterprise{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Hardware
              </span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
              Genuine products from the world&apos;s leading brands. No pricing listed —
              contact us for custom quotes tailored to your budget and requirements.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-gray-100 sticky top-20 lg:top-24 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {productCategories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  'flex-shrink-0 px-6 py-3 rounded-full text-base font-semibold transition-all duration-200',
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
