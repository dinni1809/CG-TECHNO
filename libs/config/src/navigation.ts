export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
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
    { label: 'IT Infrastructure', href: '/services#it-infrastructure' },
    { label: 'CCTV & Surveillance', href: '/services#cctv-surveillance' },
    { label: 'Server Solutions', href: '/services#server-solutions' },
    { label: 'E-Waste Management', href: '/services#e-waste' },
    { label: 'Product Distribution', href: '/services#distribution' },
    { label: 'Rental & Lease', href: '/services#rental-lease' },
  ],
  quickLinks: [
    { label: 'Products', href: '/products' },
    { label: 'Our Clients', href: '/clients' },
    { label: 'Get a Quote', href: '/contact' },
    { label: 'Apply Now', href: '/careers' },
  ],
};
