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
  image: string;
}

export const services: Service[] = [
  {
    id: 'enterprise-it',
    title: 'Enterprise IT Infrastructure',
    shortDescription: 'Build reliable and scalable IT foundations for growing businesses.',
    longDescription: 'We design, deploy, and maintain enterprise-grade IT infrastructure solutions. From structured cabling to server setups and hardware procurement, our certified engineers ensure your technology backbone is robust, highly secure, and optimized for maximum efficiency.',
    icon: 'Server',
    features: [
      'IT Infrastructure Setup',
      'Server Installation',
      'Server Management',
      'Data Center Solutions',
      'Hardware Procurement',
      'IT AMC Services',
      'Infrastructure Expansion'
    ],
    ctaLabel: 'Request IT Audit',
    ctaHref: '/contact?service=enterprise-it',
    color: 'text-blue-600',
    gradient: 'from-blue-700 to-indigo-900',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'software-licensing',
    title: 'Software & Licensing Solutions',
    shortDescription: 'Authorized licensing and software deployment solutions for businesses of all sizes.',
    longDescription: 'Ensure compliance and reduce software costs. As authorized licensing partners, we provide procurement, consulting, and seamless deployment of Microsoft licensing, corporate operating systems, virtualization software, and security tools tailored to your operational size.',
    icon: 'Cloud',
    features: [
      'Microsoft Licensing',
      'Microsoft 365',
      'Windows Server Licensing',
      'Enterprise Software Procurement',
      'Security Licensing',
      'Compliance Consulting'
    ],
    ctaLabel: 'Consult Software Expert',
    ctaHref: '/contact?service=software-licensing',
    color: 'text-sky-600',
    gradient: 'from-sky-700 to-blue-900',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'security-surveillance',
    title: 'Security & Surveillance Systems',
    shortDescription: 'Protect business assets with intelligent security solutions.',
    longDescription: 'Keep eyes on your assets 24/7 with advanced surveillance networks. We specialize in configuring multi-site IP camera monitoring feeds, smart DVR/NVR backups, real-time video analytics, and central security rooms to secure your corporate or industrial premises.',
    icon: 'Cctv',
    features: [
      'CCTV Installation',
      'IP Surveillance',
      'Video Analytics',
      'Monitoring Solutions',
      'Security Infrastructure',
      'Surveillance Upgrades'
    ],
    ctaLabel: 'Get Security Quote',
    ctaHref: '/contact?service=security-surveillance',
    color: 'text-emerald-600',
    gradient: 'from-emerald-700 to-teal-900',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'biometric-attendance',
    title: 'Biometric & Attendance Systems',
    shortDescription: 'Accurate attendance and workforce management solutions.',
    longDescription: 'Automate workforce management and hours logging. We supply and configure state-of-the-art fingerprint scanners, facial recognition systems, and visitor logging gates, integrating them directly with your HR payroll platforms for automated analytics.',
    icon: 'ShieldCheck',
    features: [
      'Fingerprint Attendance',
      'Face Recognition',
      'Visitor Management',
      'Workforce Tracking',
      'Attendance Analytics',
      'HR Integration'
    ],
    ctaLabel: 'Schedule Demo',
    ctaHref: '/contact?service=biometric-attendance',
    color: 'text-violet-600',
    gradient: 'from-violet-700 to-purple-900',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'access-control',
    title: 'Access Control & Automation',
    shortDescription: 'Secure and automate entry management for organizations.',
    longDescription: 'Direct access control on your perimeter and internal sensitive areas. Our range includes high-duty boom barriers, automatic turnstiles, flap barriers, RFID tags, and automated vehicle access controls synced with central campus monitoring dashboards.',
    icon: 'Router',
    features: [
      'Boom Barriers',
      'Flap Barriers',
      'Turnstile Gates',
      'RFID Systems',
      'Smart Entry Management',
      'Vehicle Access Control'
    ],
    ctaLabel: 'Enquire for Access Control',
    ctaHref: '/contact?service=access-control',
    color: 'text-amber-600',
    gradient: 'from-amber-600 to-orange-900',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'networking-connectivity',
    title: 'Networking & Connectivity',
    shortDescription: 'Reliable networking solutions for uninterrupted connectivity.',
    longDescription: 'Ensure high-speed data flow and zero-packet loss. We build enterprise-grade structured CAT6 cabling, high-performance office WiFi configurations with zero-handoff, fiber optics backbones, and managed router/switch security arrays.',
    icon: 'Network',
    features: [
      'LAN Setup',
      'WAN Solutions',
      'Wi-Fi Deployment',
      'Fiber Networking',
      'Structured Cabling',
      'Router & Switch Configuration'
    ],
    ctaLabel: 'Optimize Network',
    ctaHref: '/contact?service=networking-connectivity',
    color: 'text-cyan-600',
    gradient: 'from-blue-600 to-cyan-900',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'electronics-engineering',
    title: 'Electronics & Engineering Solutions',
    shortDescription: 'End-to-end electronics solutions tailored to business needs.',
    longDescription: 'Whatever your electronics requirement is, CG Techno can solve it. We offer custom electronics design, industrial control systems maintenance, custom automation panels, hardware integration, troubleshooting, and senior technical consultation.',
    icon: 'Zap',
    features: [
      'Industrial Electronics',
      'Custom Electronics Projects',
      'Hardware Integration',
      'Electronic Infrastructure',
      'Control Systems',
      'Troubleshooting Solutions',
      'Electronics Consultation'
    ],
    ctaLabel: 'Consult Engineers',
    ctaHref: '/contact?service=electronics-engineering',
    color: 'text-red-600',
    gradient: 'from-red-700 to-rose-950',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'smart-buildings',
    title: 'Smart Building Solutions',
    shortDescription: 'Transform traditional spaces into smart connected environments.',
    longDescription: 'Leverage IoT to optimize energy consumption and building security. We automate commercial buildings and large academic campuses with centralized lighting, HVAC control, IoT sensor arrays, and unified facility management tools.',
    icon: 'Database',
    features: [
      'Smart Offices',
      'Smart Campuses',
      'Building Automation',
      'IoT Solutions',
      'Centralized Monitoring',
      'Intelligent Infrastructure'
    ],
    ctaLabel: 'Upgrade Facility',
    ctaHref: '/contact?service=smart-buildings',
    color: 'text-teal-600',
    gradient: 'from-teal-700 to-emerald-950',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'amc-support',
    title: 'Annual Maintenance & Support',
    shortDescription: 'Long-term support and maintenance to ensure maximum uptime.',
    longDescription: 'Ensure operations never halt. Our comprehensive and non-comprehensive Annual Maintenance Contracts (AMC) offer regular health checkups, scheduled preventive cleanings, fast emergency response windows, and dedicated remote helpdesk engineers.',
    icon: 'BriefcaseBusiness',
    features: [
      'Preventive Maintenance',
      'On-Site Support',
      'Remote Assistance',
      'Hardware Maintenance',
      'Software Support',
      'Enterprise AMC Contracts'
    ],
    ctaLabel: 'Enquire for AMC',
    ctaHref: '/contact?service=amc-support',
    color: 'text-slate-600',
    gradient: 'from-slate-700 to-zinc-950',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=800'
  }
];
