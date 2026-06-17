import { MetadataRoute } from 'next';
import { siteConfig } from '@cg-techno/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/services',
    '/clients',
    '/careers',
    '/contact',
    '/cctv-installation-bangalore',
    '/it-infrastructure-bangalore',
    '/laptop-rental-bangalore',
    '/network-cabling-bangalore',
    '/server-solutions-bangalore',
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
