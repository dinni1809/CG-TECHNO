import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageSquare, Loader2 } from 'lucide-react';
import { siteConfig } from '@cg-techno/config';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ContactForm } from '@/components/sections/ContactForm';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Suspense } from 'react';
import { JsonLd } from '@/components/SEO/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with CG Techno Electronics. Send an enquiry, request a quote, or visit us at our Bengaluru office.',
  keywords: [
    'Contact CG Techno Electronics',
    'Bangalore IT Support Office',
    'Technology Quote Bangalore',
    'Enquire Structured Cabling',
    'Surveillance System Pricing Bengaluru',
  ],
  openGraph: {
    title: 'Contact Us | CG Techno Electronics',
    description: 'Get in touch with CG Techno Electronics. Send an enquiry, request a quote, or visit us at our Bengaluru office.',
    url: '/contact',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Contact CG Techno Electronics' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | CG Techno Electronics',
    description: 'Get in touch with CG Techno Electronics. Send an enquiry, request a quote, or visit us at our Bengaluru office.',
    images: ['/og-image.jpg'],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': siteConfig.url,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Contact Us',
        'item': `${siteConfig.url}/contact`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />
      <section className="relative bg-mesh bg-hero-pattern pt-24 pb-12 lg:pt-28 lg:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-base font-semibold bg-white/10 border border-white/20 text-white/90 mb-8">
              <Phone size={16} className="text-blue-300" />
              <span>Get In Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Let&apos;s Talk{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                IT Solutions
              </span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
              Ready to transform your IT infrastructure? Our team is available Monday–Saturday
              to discuss your requirements and provide a custom solution.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pt-10 pb-28 lg:pt-14 lg:pb-36 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Contact Us"
            tagIcon={Phone}
            title="Get in Touch with Our"
            titleHighlight="IT Experts"
            description="Have a query about structured cabling, CCTV installation, server solutions, or AMC? Fill out the form or reach out directly to our offices."
            className="mb-16 text-center"
          />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
            <AnimatedSection direction="left" className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3 font-heading">Contact Information</h2>
                <p className="text-gray-650 text-base leading-relaxed">
                  Visit us at our office or reach out via phone or email. We respond to all enquiries within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0 shadow-inner">
                      <Phone size={22} className="text-primary-700" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Call Us</div>
                      <div className="space-y-1.5">
                        {siteConfig.contactPhone.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            className="block text-base font-semibold text-gray-800 hover:text-primary-700 transition-colors"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 shadow-inner">
                      <Mail size={22} className="text-blue-700" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Email Us</div>
                      <a
                        href={`mailto:${siteConfig.contactEmail}`}
                        className="text-base font-semibold text-gray-800 hover:text-primary-700 transition-colors break-all"
                      >
                        {siteConfig.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 shadow-inner">
                      <MapPin size={22} className="text-emerald-700" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Visit Us</div>
                      <address className="not-italic text-base text-gray-800 leading-relaxed">
                        <div className="font-bold mb-1">CG Techno Electronics</div>
                        {siteConfig.address.line1}<br />
                        {siteConfig.address.line2},<br />
                        {siteConfig.address.city} – {siteConfig.address.pincode}<br />
                        {siteConfig.address.state}, {siteConfig.address.country}
                      </address>
                      <a
                        href={siteConfig.address.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-primary-750 hover:text-primary-900 transition-colors"
                      >
                        <MapPin size={13} />
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 shadow-inner">
                      <Clock size={22} className="text-amber-700" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Business Hours</div>
                      <div className="text-base text-gray-800 space-y-1">
                        <div className="font-semibold">{siteConfig.businessHours.weekdays}</div>
                        <div className="text-gray-500 font-medium">{siteConfig.businessHours.sunday}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1} className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shadow-inner shrink-0">
                    <MessageSquare size={24} className="text-primary-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 font-heading mb-0.5">Send Us an Enquiry</h2>
                    <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>
                <Suspense fallback={
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 size={36} className="animate-spin text-primary-800 mb-3" />
                    <p className="text-gray-500 text-sm font-medium">Loading form...</p>
                  </div>
                }>
                  <ContactForm />
                </Suspense>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
