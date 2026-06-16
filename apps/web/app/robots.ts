import { MetadataRoute } from 'next';
import { siteConfig } from '@cg-techno/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
