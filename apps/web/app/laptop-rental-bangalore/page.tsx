import type { Metadata } from 'next';
import { SEOLandingTemplate } from '@/components/sections/SEOLandingTemplate';
import { JsonLd } from '@/components/SEO/JsonLd';
import { siteConfig } from '@cg-techno/config';

export const metadata: Metadata = {
  title: 'Laptop & Desktop Rental Services Bangalore',
  description: 'Bulk corporate laptop and desktop rentals in Bangalore. High-performance configurations (Intel i5/i7/Ryzen), fast provisioning, flexible leases, and immediate AMC repairs.',
  keywords: [
    'Laptop Rental Bangalore',
    'Bulk Desktop Hiring Bengaluru',
    'Corporate IT Rentals India',
    'Rent Laptops for Offices Karnataka',
    'IT Workstation Rental Bangalore',
  ],
  openGraph: {
    title: 'Laptop & Desktop Rental Services Bangalore | CG Techno',
    description: 'Bulk corporate laptop and desktop rentals in Bangalore. High-performance configurations (Intel i5/i7/Ryzen), fast provisioning, flexible leases, and immediate AMC repairs.',
    url: '/laptop-rental-bangalore',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Laptop Rental Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laptop & Desktop Rental Services Bangalore | CG Techno',
    description: 'Bulk corporate laptop and desktop rentals in Bangalore. High-performance configurations (Intel i5/i7/Ryzen), fast provisioning, flexible leases, and immediate AMC repairs.',
    images: ['/og-image.jpg'],
  },
};

export default function LaptopRentalBangalore() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': siteConfig.url,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Laptop & Desktop Rental Services Bangalore',
        'item': `${siteConfig.url}/laptop-rental-bangalore`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <SEOLandingTemplate
        titlePrefix="Bulk Corporate"
        titleHighlight="Laptop & Desktop Rental Services Bangalore"
        tagline="Scale your teams instantly with high-configuration systems, enterprise security pre-installations, and simple leasing options."
        introText="Keep capital expenditures low while scaling your team. CG Techno Electronics provides bulk laptop and desktop rental services in Bangalore for corporate offices, call centers, developers, and training bootcamps. Our devices are pre-installed with required software packages, certified by security sweeps, and backed by immediate replacement support."
        servicePrefill="Rental & Lease"
        features={[
          'Bulk Laptop Hirings (Core i5, Core i7, Ryzen, MacBook)',
          'Enterprise High-Spec Desktop & Workstation Rentals',
          'Custom Software & Domain Configurations Pre-loaded',
          'Fast 48-Hour Dispatch & System Setup across Bangalore',
          'Direct Swap Out Support (Defective Unit Replacements)',
          'Flexible Monthly, Quarterly, or Annual Leasing Terms'
        ]}
      />
    </>
  );
}
