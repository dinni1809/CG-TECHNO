'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Package2, MessageSquare } from 'lucide-react';
import { products } from '@cg-techno/config';
import { cn } from '@cg-techno/utils';
import { SectionHeader } from '../ui/SectionHeader';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const categoryColors: Record<string, string> = {
  Networking: 'bg-blue-50 text-blue-700 border-blue-100',
  Servers: 'bg-violet-50 text-violet-700 border-violet-100',
  CCTV: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  UPS: 'bg-amber-50 text-amber-700 border-amber-100',
  Storage: 'bg-cyan-50 text-cyan-700 border-cyan-100',
  Accessories: 'bg-gray-100 text-gray-700 border-gray-200',
};

interface ProductsSectionProps {
  compact?: boolean;
  filterCategory?: string;
}

export function ProductsSection({ compact = false, filterCategory }: ProductsSectionProps) {
  const displayProducts = filterCategory && filterCategory !== 'all'
    ? products.filter((p) => p.category === filterCategory)
    : compact
    ? products.filter((p) => p.featured)
    : products;

  return (
    <section className={cn(compact ? 'py-16 bg-gray-50' : 'py-20 lg:py-28 bg-white')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!filterCategory && (
          <SectionHeader
            tag="Product Portfolio"
            title="Enterprise-Grade"
            titleHighlight="Hardware"
            description="We supply and install genuine products from the world's leading IT hardware brands. No pricing listed — enquire for custom quotes tailored to your requirements."
            className="mb-14"
          />
        )}

        {displayProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Package2 size={48} className="mx-auto mb-4 opacity-50" />
            <p>No products in this category yet. Check back soon.</p>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <StaggerItem key={product.id}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(0,0,0,0.1)' }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden group h-full flex flex-col"
                >
                  <div className="h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative">
                    <Package2 size={56} className="text-gray-200" />
                    {product.brand && (
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-bold text-gray-500 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gray-200">
                          {product.brand}
                        </span>
                      </div>
                    )}
                    <span className={cn(
                      'absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border',
                      categoryColors[product.category] || 'bg-gray-100 text-gray-600 border-gray-200'
                    )}>
                      {product.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-800 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                      {product.shortDescription}
                    </p>

                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                      <div className="mb-5 space-y-1.5">
                        {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between text-xs">
                            <span className="text-gray-400 font-medium">{key}</span>
                            <span className="text-gray-700 font-semibold">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/contact?product=${encodeURIComponent(product.name)}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 border-2 border-primary-800 text-primary-800 text-sm font-semibold rounded-lg hover:bg-primary-800 hover:text-white transition-all duration-200"
                    >
                      <MessageSquare size={14} />
                      {product.enquiryLabel || 'Enquire Now'}
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {compact && (
          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary inline-flex">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
