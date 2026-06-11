import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { PartnerBrands } from '@/components/sections/PartnerBrands';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { IndustriesServed } from '@/components/sections/IndustriesServed';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { StatsSection } from '@/components/sections/StatsSection';
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
      <PartnerBrands />
      <ServicesSection compact />
      <IndustriesServed />
      <ProjectShowcase />
      <StatsSection />
      <CTABanner />
    </>
  );
}
