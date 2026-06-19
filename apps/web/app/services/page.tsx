import type { Metadata } from 'next';
import { ServicesClient } from './ServicesClient';
import { JsonLd } from '@/components/SEO/JsonLd';
import { siteConfig } from '@cg-techno/config';

export const metadata: Metadata = {
  title: 'Complete Technology & Electronics Solutions Services',
  description: 'CG Techno delivers end-to-end technology solutions: Microsoft licensing, server infrastructure, CCTV surveillance, biometrics, access control, structured cabling, AMC contracts, and custom electronics engineering.',
  keywords: [
    'Technology Services Bangalore',
    'IT Solutions Provider India',
    'CCTV & Surveillance Installations',
    'Biometric Attendance Systems',
    'Microsoft OS Licensing Partners',
    'Enterprise Networking Services',
  ],
  openGraph: {
    title: 'Complete Technology & Electronics Solutions Services | CG Techno Electronics',
    description: 'CG Techno delivers end-to-end technology solutions: Microsoft licensing, server infrastructure, CCTV surveillance, biometrics, access control, structured cabling, AMC contracts, and custom electronics engineering.',
    url: '/services',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'CG Techno Technology Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Technology & Electronics Solutions Services | CG Techno Electronics',
    description: 'CG Techno delivers end-to-end technology solutions: Microsoft licensing, server infrastructure, CCTV surveillance, biometrics, access control, structured cabling, AMC contracts, and custom electronics engineering.',
    images: ['/og-image.jpg'],
  },
};

export default function ServicesPage() {
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
        'name': 'Services',
        'item': `${siteConfig.url}/services`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <ServicesClient />
    </>
  );
}
