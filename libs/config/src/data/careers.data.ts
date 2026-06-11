export type EmploymentType = 'Full-Time' | 'Part-Time' | 'Internship' | 'Contract';
export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior';

export const AVAILABLE_ROLES = [
  'IT Support Engineer',
  'Network Administrator',
  'Sales Executive',
  'Business Development Manager',
  'Intern - IT',
  'Intern - Sales & Marketing',
  'Other',
] as const;

export type AvailableRole = (typeof AVAILABLE_ROLES)[number];

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  location: string;
  shortDescription: string;
  responsibilities: string[];
  requirements: string[];
  isActive: boolean;
  postedAt: string;
}

export const jobOpenings: JobOpening[] = [
  {
    id: 'ise-001',
    title: 'IT Support Engineer',
    department: 'Engineering',
    employmentType: 'Full-Time',
    experienceLevel: 'Entry',
    location: 'Bengaluru, Karnataka',
    shortDescription: 'Provide technical support, troubleshoot hardware/software issues, and maintain IT infrastructure for our clients across Bengaluru.',
    responsibilities: [
      'Provide Level 1 and Level 2 IT support to clients',
      'Install and configure desktops, laptops, and peripherals',
      'Diagnose and resolve network and hardware issues',
      'Maintain documentation of systems and incidents',
      'Assist with server and network maintenance',
    ],
    requirements: [
      'Diploma or B.E./B.Tech in Computer Science or Electronics',
      '0–2 years of IT support experience',
      'Knowledge of Windows Server and Active Directory',
      'Basic networking knowledge (TCP/IP, DNS, DHCP)',
      'Good communication skills in English and Kannada',
    ],
    isActive: true,
    postedAt: '2025-04-01',
  },
  {
    id: 'na-001',
    title: 'Network Administrator',
    department: 'Engineering',
    employmentType: 'Full-Time',
    experienceLevel: 'Mid',
    location: 'Bengaluru, Karnataka',
    shortDescription: 'Design, deploy, and maintain enterprise network infrastructure for diverse clients across various industries.',
    responsibilities: [
      'Design and implement LAN/WAN network architectures',
      'Configure and maintain routers, switches, and firewalls',
      'Monitor network performance and troubleshoot issues',
      'Implement network security policies and access controls',
      'Provide technical documentation and reports to clients',
    ],
    requirements: [
      'B.E./B.Tech in Computer Science, Electronics, or IT',
      '2–5 years of network administration experience',
      'Cisco CCNA certification (CCNP preferred)',
      'Experience with Cisco, HP, or Juniper equipment',
      'Strong knowledge of routing protocols (OSPF, BGP)',
    ],
    isActive: true,
    postedAt: '2025-04-05',
  },
  {
    id: 'se-001',
    title: 'Sales Executive',
    department: 'Sales',
    employmentType: 'Full-Time',
    experienceLevel: 'Entry',
    location: 'Bengaluru, Karnataka',
    shortDescription: 'Drive B2B sales of IT infrastructure products and solutions, build client relationships, and achieve monthly revenue targets.',
    responsibilities: [
      'Identify and prospect new business opportunities',
      'Conduct product demonstrations and presentations',
      'Prepare and present customized proposals and quotes',
      'Manage and grow existing client accounts',
      'Meet and exceed monthly sales targets',
    ],
    requirements: [
      'Any graduate (B.E. in IT/Electronics preferred)',
      '0–2 years of B2B sales experience',
      'Strong communication and negotiation skills',
      'Knowledge of IT products and solutions',
      'Willingness to travel within Bengaluru',
    ],
    isActive: true,
    postedAt: '2025-04-10',
  },
  {
    id: 'intern-it-001',
    title: 'Intern - IT',
    department: 'Engineering',
    employmentType: 'Internship',
    experienceLevel: 'Entry',
    location: 'Bengaluru, Karnataka',
    shortDescription: 'Join our engineering team for a hands-on internship in IT infrastructure, networking, and technical support.',
    responsibilities: [
      'Assist in installation and configuration of network equipment',
      'Support senior engineers on client projects',
      'Help with cable management and rack organization',
      'Document technical procedures and configurations',
      'Participate in client site visits and deployments',
    ],
    requirements: [
      'Currently pursuing Diploma or B.E. in Computer Science, Electronics, or IT',
      'Basic knowledge of networking concepts',
      'Eagerness to learn and hands-on approach',
      'Good communication skills',
      'Available for 3–6 month internship',
    ],
    isActive: true,
    postedAt: '2025-04-15',
  },
];

export const companyPerks = [
  {
    icon: 'TrendingUp',
    title: 'Career Growth',
    description: 'Structured career progression with mentorship from industry veterans.',
  },
  {
    icon: 'BookOpen',
    title: 'Learning & Development',
    description: 'Funded certifications (CCNA, CompTIA) and continuous skill development.',
  },
  {
    icon: 'Users',
    title: 'Collaborative Team',
    description: 'Work alongside passionate engineers and business professionals.',
  },
  {
    icon: 'MapPin',
    title: 'Prime Location',
    description: 'Central Bengaluru office with excellent connectivity.',
  },
  {
    icon: 'Shield',
    title: 'Stable Company',
    description: '10+ years in business with a growing, diverse client base.',
  },
  {
    icon: 'Star',
    title: 'Competitive Package',
    description: 'Market-competitive salaries with performance-based incentives.',
  },
];
