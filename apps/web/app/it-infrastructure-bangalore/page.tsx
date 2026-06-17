import type { Metadata } from 'next';
import { SEOLandingTemplate } from '@/components/sections/SEOLandingTemplate';
import { JsonLd } from '@/components/SEO/JsonLd';
import { siteConfig } from '@cg-techno/config';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'IT Infrastructure Solutions Bangalore | Corporate IT Office Setup',
  description: 'Looking for professional office IT setups in Bangalore? CG Techno Electronics provides premium infrastructure procurement, firewalls, LAN configuration, and AMC support.',
  keywords: [
    'IT Infrastructure Bangalore',
    'Corporate IT Setup Services',
    'Office Network Configurations',
    'Enterprise Hardware Procurement',
    'LAN Cabling & Firewall Support',
  ],
  openGraph: {
    title: 'IT Infrastructure Solutions Bangalore | Corporate IT Office Setup',
    description: 'Looking for professional office IT setups in Bangalore? CG Techno Electronics provides premium infrastructure procurement, firewalls, LAN configuration, and AMC support.',
    url: '/it-infrastructure-bangalore',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'IT Infrastructure Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Infrastructure Solutions Bangalore | Corporate IT Office Setup',
    description: 'Looking for professional office IT setups in Bangalore? CG Techno Electronics provides premium infrastructure procurement, firewalls, LAN configuration, and AMC support.',
    images: ['/og-image.jpg'],
  },
};

export default function ITInfrastructureBangalore() {
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
        'name': 'IT Infrastructure Solutions Bangalore',
        'item': `${siteConfig.url}/it-infrastructure-bangalore`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: 'IT Infrastructure Bangalore' }]} />
      <SEOLandingTemplate
        titlePrefix="Premium Enterprise"
        titleHighlight="IT Infrastructure Solutions Bangalore"
        tagline="Seamless hardware deployments, server rack configuration, and corporate network cabling for scaling workspaces."
        introText="CG Techno Electronics is Bangalore's trusted integration partner. We specialize in planning, deploying, and managing complex IT setups for high-growth startups, corporate offices, public sector centers, and hospitals. From setting up network racks and structured loops to workstation provisioning, we deliver customized, high-uptime architectures."
        servicePrefill="IT Infrastructure"
        features={[
          'Complete Office IT Workspace Provisioning',
          'Authorized OEM Hardware Sourcing (Dell, HP, Cisco)',
          'Enterprise Network Rack & Cabling Organization',
          'Secure Firewall, WAN, & LAN Integrations',
          'High-Density WiFi 6 Coverage Assessments',
          'On-Call Support & Annual Maintenance Contracts (AMCs)'
        ]}
      />
    </>
  );
}
