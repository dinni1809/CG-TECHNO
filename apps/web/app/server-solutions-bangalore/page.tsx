import type { Metadata } from 'next';
import { SEOLandingTemplate } from '@/components/sections/SEOLandingTemplate';

export const metadata: Metadata = {
  title: 'Enterprise Server Solutions & Datacenter Setup Bangalore | CG Techno',
  description: 'Enterprise server installations, SAN/NAS storage, virtualized host environments, and server room optimization in Bangalore. Contact our systems architects.',
};

export default function ServerSolutionsBangalore() {
  return (
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
  );
}
