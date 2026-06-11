export const siteConfig = {
  name: 'CG Techno Electronics',
  tagline: 'Premium IT Infrastructure & Electronics Solutions',
  description:
    'CG Techno Electronics is a Bengaluru-based IT infrastructure and electronics solutions company, providing end-to-end IT setup, CCTV surveillance, server solutions, and more.',
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
    defaultTitle: 'CG Techno Electronics — IT Infrastructure & Electronics Solutions, Bengaluru',
    titleTemplate: '%s | CG Techno Electronics',
    defaultDescription:
      'Leading IT infrastructure, CCTV surveillance, server solutions, and e-waste management company in Bengaluru. Enterprise-grade solutions for businesses of all sizes.',
    ogImage: '/og-image.jpg',
    keywords: [
      'IT infrastructure Bangalore',
      'CCTV surveillance Bengaluru',
      'server solutions',
      'network setup',
      'IT support',
      'e-waste management',
      'hardware rental',
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
