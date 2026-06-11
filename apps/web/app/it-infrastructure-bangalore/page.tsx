import type { Metadata } from 'next';
import { SEOLandingTemplate } from '@/components/sections/SEOLandingTemplate';

export const metadata: Metadata = {
  title: 'IT Infrastructure Solutions Bangalore | Corporate IT Office Setup',
  description: 'Looking for professional office IT setups in Bangalore? CG Techno Electronics provides premium infrastructure procurement, firewalls, LAN configuration, and AMC support.',
};

export default function ITInfrastructureBangalore() {
  return (
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
  );
}
