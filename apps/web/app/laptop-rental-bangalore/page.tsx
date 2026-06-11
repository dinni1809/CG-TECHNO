import type { Metadata } from 'next';
import { SEOLandingTemplate } from '@/components/sections/SEOLandingTemplate';

export const metadata: Metadata = {
  title: 'Laptop & Desktop Rental Services Bangalore | CG Techno',
  description: 'Bulk corporate laptop and desktop rentals in Bangalore. High-performance configurations (Intel i5/i7/Ryzen), fast provisioning, flexible leases, and immediate AMC repairs.',
};

export default function LaptopRentalBangalore() {
  return (
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
  );
}
