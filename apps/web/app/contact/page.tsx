import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageSquare, Loader2 } from 'lucide-react';
import { siteConfig } from '@cg-techno/config';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ContactForm } from '@/components/sections/ContactForm';
import { ContactInfo } from '@/components/sections/ContactInfo';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Suspense } from 'react';
import { JsonLd } from '@/components/SEO/JsonLd';
import { HeroCTA } from '@/components/ui/HeroCTA';


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
            <p className="text-white/70 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed mb-8">
              Ready to transform your IT infrastructure? Our team is available Monday–Saturday
              to discuss your requirements and provide a custom solution.
            </p>
            <div className="flex justify-center">
              <HeroCTA href="#contact-form" label="Contact Our Team" />
            </div>
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
          <div id="contact-form" className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
            <AnimatedSection direction="left" className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3 font-heading">Contact Information</h2>
                <p className="text-gray-650 text-base leading-relaxed">
                  Visit us at our office or reach out via phone or email. We respond to all enquiries within 24 hours.
                </p>
              </div>

              <ContactInfo />
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
