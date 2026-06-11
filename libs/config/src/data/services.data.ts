export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  color: string;
  gradient: string;
}

export const services: Service[] = [
  {
    id: 'it-infrastructure',
    title: 'IT Infrastructure',
    shortDescription:
      'End-to-end IT infrastructure setup, structured cabling, and hardware procurement for enterprises of all sizes.',
    longDescription:
      'We design, deploy, and maintain enterprise-grade IT infrastructure solutions. From structured network cabling to hardware procurement, our experts ensure your technology backbone is robust, scalable, and future-ready. We handle everything from initial assessment to full deployment and ongoing maintenance.',
    icon: 'Server',
    features: [
      'Structured network cabling (Cat5e/Cat6/Cat6A)',
      'Hardware procurement & installation',
      'LAN/WAN design and deployment',
      'Annual Maintenance Contracts (AMC)',
      'Network rack installation & configuration',
      'Data center setup and consolidation',
    ],
    ctaLabel: 'Request IT Audit',
    ctaHref: '/contact?service=it-infrastructure',
    color: 'text-blue-600',
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    id: 'cctv-surveillance',
    title: 'CCTV & Surveillance',
    shortDescription:
      'Advanced IP camera systems, DVR/NVR solutions, and remote monitoring for complete premises security.',
    longDescription:
      'Protect your business with our comprehensive CCTV and surveillance solutions. We install and configure high-definition IP cameras, NVR/DVR systems, and remote monitoring setups that give you 24/7 visibility of your premises from anywhere in the world.',
    icon: 'Camera',
    features: [
      'HD and 4K IP camera installation',
      'DVR/NVR configuration and setup',
      'Remote monitoring via mobile/web',
      'Night vision and PTZ camera systems',
      'Access control integration',
      'Video analytics and motion detection',
    ],
    ctaLabel: 'Get Security Assessment',
    ctaHref: '/contact?service=cctv-surveillance',
    color: 'text-emerald-600',
    gradient: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'server-solutions',
    title: 'Server Solutions',
    shortDescription:
      'Rack servers, blade servers, NAS/SAN storage, and virtualization solutions for modern data centers.',
    longDescription:
      'Harness the power of enterprise-grade servers and storage solutions. We supply, configure, and maintain rack-mount servers, blade systems, NAS/SAN storage arrays, and full virtualization environments using VMware, Hyper-V, and open-source platforms.',
    icon: 'Database',
    features: [
      'Rack and blade server deployment',
      'NAS/SAN storage configuration',
      'Virtualization (VMware, Hyper-V)',
      'Backup and disaster recovery',
      'Server room design and cooling',
      'Load balancing and high availability',
    ],
    ctaLabel: 'Get Server Quote',
    ctaHref: '/contact?service=server-solutions',
    color: 'text-violet-600',
    gradient: 'from-violet-600 to-purple-800',
  },
  {
    id: 'e-waste',
    title: 'E-Waste Management',
    shortDescription:
      'Certified, eco-friendly IT asset disposal and recycling programs for responsible corporate e-waste management.',
    longDescription:
      'Dispose of your end-of-life IT equipment responsibly. Our certified e-waste management service ensures that all electronics are recycled according to environmental regulations. We provide certified disposal certificates for compliance and corporate sustainability reporting.',
    icon: 'Recycle',
    features: [
      'Certified IT asset disposal',
      'Data destruction and certification',
      'Corporate e-waste pickup programs',
      'Environmental compliance reporting',
      'Asset decommissioning service',
      'Recycling and refurbishment',
    ],
    ctaLabel: 'Schedule Pickup',
    ctaHref: '/contact?service=e-waste',
    color: 'text-green-600',
    gradient: 'from-green-600 to-emerald-700',
  },
  {
    id: 'distribution',
    title: 'Product Distribution',
    shortDescription:
      'Authorized distribution partner for leading IT hardware brands with competitive pricing for bulk enterprise procurement.',
    longDescription:
      'As an authorized distributor, we bring you genuine products from leading IT hardware brands at competitive pricing. Whether you need a single unit or bulk procurement for your entire organization, we ensure authentic products with proper warranty and after-sales support.',
    icon: 'Package',
    features: [
      'Authorized brand distribution',
      'Bulk procurement pricing',
      'Cisco, HP, Dell, Hikvision, and more',
      'Warranty and after-sales support',
      'Quick delivery across Bengaluru',
      'Enterprise framework agreements',
    ],
    ctaLabel: 'Request Catalogue',
    ctaHref: '/contact?service=distribution',
    color: 'text-orange-600',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: 'rental-lease',
    title: 'Rental & Lease',
    shortDescription:
      'Flexible short and long-term rental of laptops, desktops, servers, and networking equipment for any duration.',
    longDescription:
      'Minimize capital expenditure without sacrificing technology quality. Our rental and leasing programs provide access to the latest hardware for events, projects, temporary offices, or long-term business needs — with full maintenance and replacement guarantees.',
    icon: 'MonitorSmartphone',
    features: [
      'Laptop and desktop rental',
      'Server and networking equipment rental',
      'Short-term event and project rental',
      'Long-term leasing with AMC',
      'On-site setup and configuration',
      'Replacement guarantee',
    ],
    ctaLabel: 'Get Rental Quote',
    ctaHref: '/contact?service=rental-lease',
    color: 'text-cyan-600',
    gradient: 'from-cyan-600 to-blue-700',
  },
];
