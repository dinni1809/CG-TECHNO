import type { Metadata } from 'next';
import { ServicesClient } from './ServicesClient';

export const metadata: Metadata = {
  title: 'Complete Technology & Electronics Solutions Services | CG Techno',
  description: 'CG Techno delivers end-to-end technology solutions: Microsoft licensing, server infrastructure, CCTV surveillance, biometrics, access control, structured cabling, AMC contracts, and custom electronics engineering.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
