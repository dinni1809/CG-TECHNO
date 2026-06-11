import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { SupportCTAStrip } from '@/components/sections/SupportCTAStrip';
import { PartnerBrands } from '@/components/sections/PartnerBrands';
import { StatsSection } from '@/components/sections/StatsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AboutSnapshot } from '@/components/sections/AboutSnapshot';
import { IndustriesServed } from '@/components/sections/IndustriesServed';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { ClientsSection } from '@/components/sections/ClientsSection';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { CTABanner } from '@/components/sections/CTABanner';
import { siteConfig } from '@cg-techno/config';

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SupportCTAStrip />
      <PartnerBrands />
      <StatsSection />
      <ServicesSection compact />
      <AboutSnapshot />
      <IndustriesServed />
      <ProductsSection compact />
      <ClientsSection compact />
      <ProjectShowcase />
      <CTABanner />
    </>
  );
}
