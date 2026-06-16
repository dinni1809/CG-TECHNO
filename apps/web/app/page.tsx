import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { PartnerBrands } from '@/components/sections/PartnerBrands';
import { EnterpriseSolutionsShowcase } from '@/components/sections/EnterpriseSolutionsShowcase';
import { CompletePartnerSection } from '@/components/sections/CompletePartnerSection';
import { IndustriesEmpowerSection } from '@/components/sections/IndustriesEmpowerSection';
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
      <EnterpriseSolutionsShowcase />
      <CompletePartnerSection />
      <IndustriesEmpowerSection />
      <ProjectShowcase />
      <StatsSection />
      <CTABanner />
    </>
  );
}
