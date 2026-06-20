import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { FloatingCTA } from '@/components/ui/FloatingCTA';
import { siteConfig } from '@cg-techno/config';
import { JsonLd } from '@/components/SEO/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: siteConfig.seo.keywords,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

import { Providers } from './providers';
import { Analytics } from '@/components/SEO/Analytics';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const globalSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        'name': siteConfig.name,
        'url': siteConfig.url,
        'logo': `${siteConfig.url}${siteConfig.logo}`,
        'email': siteConfig.contactEmail,
        'telephone': siteConfig.contactPhone[0],
        'contactPoint': [
          {
            '@type': 'ContactPoint',
            'telephone': siteConfig.contactPhone[0],
            'contactType': 'customer support',
            'email': siteConfig.contactEmailInfo,
            'areaServed': 'IN',
            'availableLanguage': ['en'],
          },
        ],
        'sameAs': [
          siteConfig.social.linkedin,
          siteConfig.social.instagram,
        ].filter(Boolean),
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${siteConfig.url}/#localbusiness`,
        'name': siteConfig.name,
        'image': `${siteConfig.url}${siteConfig.logo}`,
        'telephone': siteConfig.contactPhone[0],
        'email': siteConfig.contactEmailInfo,
        'priceRange': '$$',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': `${siteConfig.address.line1} ${siteConfig.address.line2}`,
          'addressLocality': siteConfig.address.city,
          'postalCode': siteConfig.address.pincode,
          'addressRegion': siteConfig.address.state,
          'addressCountry': 'IN',
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '09:30',
            'closes': '18:30',
          },
        ],
        'url': siteConfig.url,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        'url': siteConfig.url,
        'name': siteConfig.name,
        'publisher': {
          '@id': `${siteConfig.url}/#organization`,
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <JsonLd schema={globalSchema} />
      </head>
      <body className="antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Analytics />
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col">
              <main className="flex-grow">{children}</main>
            </div>
            <Footer />
          </div>
          <FloatingCTA />
        </Providers>
      </body>
    </html>
  );
}

