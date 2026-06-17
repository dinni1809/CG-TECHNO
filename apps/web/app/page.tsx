import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/HeroSection';
import { CompletePartnerSection } from '@/components/sections/CompletePartnerSection';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { StatsSection } from '@/components/sections/StatsSection';
import { CTABanner } from '@/components/sections/CTABanner';
import { siteConfig } from '@cg-techno/config';

const PartnerBrands = dynamic(() => import('@/components/sections/PartnerBrands').then(mod => mod.PartnerBrands));
const EnterpriseSolutionsShowcase = dynamic(() => import('@/components/sections/EnterpriseSolutionsShowcase').then(mod => mod.EnterpriseSolutionsShowcase));
const IndustriesEmpowerSection = dynamic(() => import('@/components/sections/IndustriesEmpowerSection').then(mod => mod.IndustriesEmpowerSection));


export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: '/',
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.seo.ogImage],
  },
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
