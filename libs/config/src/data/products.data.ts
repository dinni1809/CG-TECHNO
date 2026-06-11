export type ProductCategory = 'Networking' | 'Servers' | 'CCTV' | 'UPS' | 'Accessories' | 'Storage';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand?: string;
  shortDescription: string;
  imageUrl?: string;
  specifications?: Record<string, string>;
  enquiryLabel?: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'cisco-catalyst-2960',
    name: 'Cisco Catalyst 2960-X Series Switch',
    category: 'Networking',
    brand: 'Cisco',
    shortDescription: '24-port Gigabit Ethernet switch with PoE+ support for enterprise LAN deployments.',
    specifications: {
      Ports: '24x GE PoE+, 4x SFP',
      'PoE Budget': '370W',
      'Switching Capacity': '108 Gbps',
      'Management': 'Web UI / CLI',
    },
    enquiryLabel: 'Enquire Now',
    featured: true,
  },
  {
    id: 'hikvision-ip-4mp',
    name: 'Hikvision 4MP IR Dome Camera',
    category: 'CCTV',
    brand: 'Hikvision',
    shortDescription: '4MP full HD IP dome camera with IR night vision up to 30m and H.265+ compression.',
    specifications: {
      Resolution: '4MP (2560×1440)',
      'Night Vision': 'Up to 30m IR',
      Connectivity: 'Ethernet (PoE)',
      Weatherproofing: 'IP67',
      Compression: 'H.265+',
    },
    enquiryLabel: 'Get Pricing',
    featured: true,
  },
  {
    id: 'dell-poweredge-r740',
    name: 'Dell PowerEdge R740 Server',
    category: 'Servers',
    brand: 'Dell',
    shortDescription: '2U rack server with Intel Xeon Scalable processors, ideal for enterprise workloads.',
    specifications: {
      Processor: 'Intel Xeon Scalable (up to 28 cores)',
      Memory: 'Up to 3TB DDR4',
      Storage: 'Up to 16x 2.5" drives',
      'Form Factor': '2U Rack',
      RAID: 'PERC H730P / H740P',
    },
    enquiryLabel: 'Request Quote',
    featured: true,
  },
  {
    id: 'apc-smart-ups-3000',
    name: 'APC Smart-UPS 3000VA',
    category: 'UPS',
    brand: 'APC',
    shortDescription: '3000VA rack-mount UPS with pure sine wave output and intelligent battery management.',
    specifications: {
      Capacity: '3000VA / 2700W',
      'Form Factor': '2U Rack / Tower',
      'Battery Runtime': '8-10 min at full load',
      'Output Waveform': 'Pure Sine Wave',
      'Input Voltage': '220-230V',
    },
    enquiryLabel: 'Enquire Now',
    featured: true,
  },
  {
    id: 'hp-proliant-dl380',
    name: 'HP ProLiant DL380 Gen10',
    category: 'Servers',
    brand: 'HP',
    shortDescription: 'Industry-leading dual-socket 2U rack server for mixed workload performance and scalability.',
    specifications: {
      Processor: 'Intel Xeon Scalable (3rd Gen)',
      Memory: 'Up to 6TB DDR4',
      Storage: '12 LFF or 24 SFF drives',
      'Form Factor': '2U Rack',
    },
    enquiryLabel: 'Request Quote',
    featured: false,
  },
  {
    id: 'tp-link-wifi6-router',
    name: 'TP-Link AX6000 Wi-Fi 6 Router',
    category: 'Networking',
    brand: 'TP-Link',
    shortDescription: 'Tri-band Wi-Fi 6 router delivering up to 6000Mbps for high-density office environments.',
    specifications: {
      Standard: 'Wi-Fi 6 (802.11ax)',
      Speed: '6000 Mbps',
      Bands: 'Tri-Band',
      Ports: '1x 2.5G WAN, 8x 1G LAN',
      Security: 'WPA3, Firewall',
    },
    enquiryLabel: 'Enquire Now',
    featured: false,
  },
  {
    id: 'hikvision-nvr-16ch',
    name: 'Hikvision 16-Channel NVR',
    category: 'CCTV',
    brand: 'Hikvision',
    shortDescription: '16-channel network video recorder supporting up to 12MP cameras with H.265+ encoding.',
    specifications: {
      Channels: '16',
      Resolution: 'Up to 12MP',
      Compression: 'H.265+ / H.265 / H.264',
      Storage: '2x SATA HDD bays (up to 10TB each)',
      Connectivity: '2x RJ-45 (Gigabit)',
    },
    enquiryLabel: 'Get Pricing',
    featured: false,
  },
  {
    id: 'kingston-32gb-ddr4',
    name: 'Kingston 32GB DDR4 ECC RAM',
    category: 'Accessories',
    brand: 'Kingston',
    shortDescription: '32GB DDR4 ECC registered memory module for workstations and servers.',
    specifications: {
      Capacity: '32GB',
      Type: 'DDR4 ECC Registered',
      Speed: '3200MHz',
      Compatibility: 'Intel / AMD server platforms',
    },
    enquiryLabel: 'Enquire Now',
    featured: false,
  },
  {
    id: 'synology-nas-ds920',
    name: 'Synology DiskStation DS920+',
    category: 'Storage',
    brand: 'Synology',
    shortDescription: '4-bay NAS solution for SMB file sharing, backup, and multimedia streaming.',
    specifications: {
      'Drive Bays': '4 (expandable to 9)',
      Processor: 'Intel Celeron J4125 (4-core)',
      RAM: '4GB DDR4 (expandable to 8GB)',
      Connectivity: '2x 1GbE LAN',
      'Max Raw Capacity': '72TB',
    },
    enquiryLabel: 'Request Quote',
    featured: false,
  },
];

export const productCategories: { id: string; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'Networking', label: 'Networking' },
  { id: 'Servers', label: 'Servers' },
  { id: 'CCTV', label: 'CCTV' },
  { id: 'UPS', label: 'UPS' },
  { id: 'Storage', label: 'Storage' },
  { id: 'Accessories', label: 'Accessories' },
];
