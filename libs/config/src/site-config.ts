export const siteConfig = {
  name: 'CG Techno Electronics',
  tagline: 'Enterprise Technology Solutions Partner',
  description:
    'CG Techno Electronics is a complete technology solutions company providing enterprise IT infrastructure, software licensing, security systems, networking, electronics integration, automation, and support services.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cgtechnoelectronics.com',
  logo: '/logo.png',
  favicon: '/favicon.ico',
  contactEmail: 'cgtechnoelectronics@gmail.com',
  contactEmailInfo: 'info@cgtechnoelectronics.com',
  contactEmailHR: 'hr@cgtechnoelectronics.com',
  contactPhone: ['+91 886 115 8888', '+91 636 331 243', '080 2211 1369'],
  address: {
    line1: '#6/1, Ground Floor, 1st Cross,',
    line2: 'Sampangiramanagar',
    city: 'Bangalore',
    pincode: '560027',
    state: 'Karnataka',
    country: 'India',
    full: '#6/1, Ground Floor, 1st Cross, Sampangiramanagar, Bangalore - 27',
    googleMapsUrl:
      'https://maps.google.com/?q=CG+Techno+Electronics+Sampangiramanagar+Bangalore',
  },
  businessHours: {
    weekdays: 'Monday – Saturday: 9:30 AM – 6:30 PM',
    sunday: 'Sunday: Closed',
  },
  social: {
    linkedin: 'https://linkedin.com/company/cg-techno-electronics',
    instagram: 'https://instagram.com/cgtechnoelectronics',
    twitter: '',
    youtube: '',
    facebook: '',
  },
  seo: {
    defaultTitle: 'CG Techno Electronics — Enterprise Technology Solutions Partner',
    titleTemplate: '%s | CG Techno Electronics',
    defaultDescription:
      'CG Techno Electronics is a complete technology solutions company providing enterprise IT infrastructure, software licensing, security systems, networking, electronics integration, automation, and support services.',
    ogImage: '/og-image.jpg',
    keywords: [
      'Technology Solutions',
      'IT Infrastructure',
      'Microsoft Licensing',
      'Networking Solutions',
      'Security Systems',
      'Biometric Solutions',
      'Boom Barrier Solutions',
      'Electronics Integration',
      'Enterprise Technology Partner',
      'CG Techno Electronics',
    ],
  },
  stats: [
    { label: 'Years of Experience', value: 10, suffix: '+' },
    { label: 'Clients Served', value: 500, suffix: '+' },
    { label: 'Projects Completed', value: 1000, suffix: '+' },
    { label: 'Cities Covered', value: 5, suffix: '+' },
  ],
};

export type SiteConfig = typeof siteConfig;
