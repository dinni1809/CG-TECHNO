import type { Metadata } from 'next';
import { SEOLandingTemplate } from '@/components/sections/SEOLandingTemplate';
import { JsonLd } from '@/components/SEO/JsonLd';
import { siteConfig } from '@cg-techno/config';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'CCTV Installation & Commercial Surveillance Bangalore',
  description: 'Protect your office, warehouse, or commercial site with premium IP CCTV camera installation in Bangalore. We integrate HD NVR networks, motion tracking, and remote feeds.',
  keywords: [
    'CCTV Installation Bangalore',
    'Commercial Surveillance Systems',
    'IP Security Cameras Bengaluru',
    'HD CCTV Camera Systems Karnataka',
    'Office Video Surveillance Setups',
  ],
  openGraph: {
    title: 'CCTV Installation & Commercial Surveillance Bangalore | CG Techno',
    description: 'Protect your office, warehouse, or commercial site with premium IP CCTV camera installation in Bangalore. We integrate HD NVR networks, motion tracking, and remote feeds.',
    url: '/cctv-installation-bangalore',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'CCTV Installation Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CCTV Installation & Commercial Surveillance Bangalore | CG Techno',
    description: 'Protect your office, warehouse, or commercial site with premium IP CCTV camera installation in Bangalore. We integrate HD NVR networks, motion tracking, and remote feeds.',
    images: ['/og-image.jpg'],
  },
};

export default function CCTVInstallationBangalore() {
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
        'name': 'CCTV Installation Bangalore',
        'item': `${siteConfig.url}/cctv-installation-bangalore`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: 'CCTV Installation Bangalore' }]} />
      <SEOLandingTemplate
        titlePrefix="Professional HD"
        titleHighlight="CCTV Installation & Commercial Surveillance Bangalore"
        tagline="Protect your assets, logistics hubs, and corporate workspaces with secure, high-definition IP video monitoring networks."
        introText="Secure your facilities using commercial-grade security networks. CG Techno Electronics provides professional surveillance design and camera installation services in Bangalore. We work with leading brands (Hikvision, CP PLUS, Honeywell) to build unified feeds, configure NVR backups, and set up secure control centers."
        servicePrefill="CCTV & Surveillance"
        features={[
          'Commercial IP Camera & Dome System Planning',
          'Command Control Monitor Setup & Wall Screens',
          'HD Night Vision & PTZ Target Tracking Cameras',
          'Multi-Channel NVR System Configuration',
          'Intelligent Motion Alerts & Incident Logging',
          'Secure Hard Drive Arrays for Long-Term Storage'
        ]}
      />
    </>
  );
}
