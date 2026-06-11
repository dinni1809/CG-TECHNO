import type { Metadata } from 'next';
import { SEOLandingTemplate } from '@/components/sections/SEOLandingTemplate';

export const metadata: Metadata = {
  title: 'CCTV Installation & Commercial Surveillance Bangalore | CG Techno',
  description: 'Protect your office, warehouse, or commercial site with premium IP CCTV camera installation in Bangalore. We integrate HD NVR networks, motion tracking, and remote feeds.',
};

export default function CCTVInstallationBangalore() {
  return (
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
  );
}
