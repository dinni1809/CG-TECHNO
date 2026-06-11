import type { Metadata } from 'next';
import { SEOLandingTemplate } from '@/components/sections/SEOLandingTemplate';

export const metadata: Metadata = {
  title: 'Structured Network Cabling Services Bangalore | CG Techno',
  description: 'Certified CAT6 and fiber optic structured cabling services in Bangalore. We plan and clean server room layouts, routing paths, patch panels, and switch arrays.',
};

export default function NetworkCablingBangalore() {
  return (
    <SEOLandingTemplate
      titlePrefix="Structured Enterprise"
      titleHighlight="Network Cabling Services Bangalore"
      tagline="Connect your workstations and servers with clean, high-speed CAT6 drops, backbone fiber terminations, and professional patch panel organize workflows."
      introText="Reduce network lag and packet loss with clean physical networks. CG Techno Electronics offers structured network cabling services for multi-floor offices, warehouses, and data hubs in Bangalore. We organize chaotic server rooms, plan overhead conduit trays, label ports, and sweep routes with signal checkers to ensure flawless internet bandwidth distribution."
      servicePrefill="IT Infrastructure"
      features={[
        'Certified CAT6 / CAT6A / CAT7 Ethernet Cabling',
        'Single-Mode & Multi-Mode Fiber Optic Link Splicing',
        'Chaotic Patch Panel Cleanup & Cable Re-tagging',
        'Conduit Installation (Overhead Cable Trays, Under-floor)',
        'VoIP IP Phone Line Cabling Integrations',
        'Fluke Diagnostic Sweep & Packet Loss Checks'
      ]}
    />
  );
}
