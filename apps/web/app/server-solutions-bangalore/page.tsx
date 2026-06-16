import type { Metadata } from 'next';
import { SEOLandingTemplate } from '@/components/sections/SEOLandingTemplate';
import { JsonLd } from '@/components/SEO/JsonLd';
import { siteConfig } from '@cg-techno/config';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Enterprise Server Solutions & Datacenter Setup Bangalore',
  description: 'Enterprise server installations, SAN/NAS storage, virtualized host environments, and server room optimization in Bangalore. Contact our systems architects.',
  keywords: [
    'Server Solutions Bangalore',
    'Enterprise Datacenter Setup',
    'Rackmount Server Installations',
    'Virtualized Server Hosting Bengaluru',
    'SAN & NAS Storage Arrays Karnataka',
  ],
  openGraph: {
    title: 'Enterprise Server Solutions & Datacenter Setup Bangalore | CG Techno',
    description: 'Enterprise server installations, SAN/NAS storage, virtualized host environments, and server room optimization in Bangalore. Contact our systems architects.',
    url: '/server-solutions-bangalore',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Server Solutions Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Server Solutions & Datacenter Setup Bangalore | CG Techno',
    description: 'Enterprise server installations, SAN/NAS storage, virtualized host environments, and server room optimization in Bangalore. Contact our systems architects.',
    images: ['/og-image.jpg'],
  },
};

export default function ServerSolutionsBangalore() {
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
        'name': 'Enterprise Server Solutions & Datacenter Setup Bangalore',
        'item': `${siteConfig.url}/server-solutions-bangalore`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: 'Server Solutions Bangalore' }]} />
      <SEOLandingTemplate
        titlePrefix="High-Performance"
        titleHighlight="Server Solutions & Datacenter Setup Bangalore"
        tagline="Scale your database and enterprise storage networks securely with fault-tolerant server systems and hot/cold aisle room designs."
        introText="We support Bengaluru's technology and industrial hubs in building secure, physical database infrastructures. From single tower application server configurations to multi-rack virtualization servers (VMware ESXi, Hyper-V), CG Techno Electronics integrates secure backplanes and redundant cooling pathways to minimize data processing outages."
        servicePrefill="Server Solutions"
        features={[
          'Tower & Rackmount Server Deployment (Dell, Lenovo)',
          'Storage Arrays Integration (SAN/NAS Networks)',
          'RAID Setup & Fault Tolerance System Configs',
          'Hot / Cold Aisle Rack Airflow Optimization',
          'Server Virtualization & Resource Partitioning',
          'Automatic Offsite & Local Backup Scheduling'
        ]}
      />
    </>
  );
}
