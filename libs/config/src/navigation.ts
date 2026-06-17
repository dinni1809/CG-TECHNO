export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Clients', href: '/clients' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const navCTA = {
  label: 'Enquire Now',
  href: '/contact',
};

export const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/about#team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Enterprise IT Infrastructure', href: '/services#enterprise-it' },
    { label: 'Software & Licensing', href: '/services#software-licensing' },
    { label: 'Security & Surveillance', href: '/services#security-surveillance' },
    { label: 'Biometric & Attendance', href: '/services#biometric-attendance' },
    { label: 'Access Control & Automation', href: '/services#access-control' },
    { label: 'Networking & Connectivity', href: '/services#networking-connectivity' },
    { label: 'Electronics & Engineering', href: '/services#electronics-engineering' },
    { label: 'Smart Building Solutions', href: '/services#smart-buildings' },
    { label: 'AMC & Support Services', href: '/services#amc-support' },
  ],
  quickLinks: [
    { label: 'Solutions', href: '/services' },
    { label: 'Our Clients', href: '/clients' },
    { label: 'Get a Quote', href: '/contact' },
    { label: 'Apply Now', href: '/careers' },
  ],
};
