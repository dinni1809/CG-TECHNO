import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { siteConfig } from '@cg-techno/config';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ContactForm } from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with CG Techno Electronics. Send an enquiry, request a quote, or visit us at our Bengaluru office.',
};

interface ContactPageProps {
  searchParams?: Promise<{ service?: string; product?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const prefillService = params?.service;
  const prefillProduct = params?.product;

  return (
    <>
      <section className="relative bg-mesh bg-hero-pattern pt-28 pb-20 lg:pt-36 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-white/80 mb-5">
              Get In Touch
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5">
              Let&apos;s Talk{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                IT Solutions
              </span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to transform your IT infrastructure? Our team is available Monday–Saturday
              to discuss your requirements and provide a custom solution.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <AnimatedSection direction="left" className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Visit us at our office or reach out via phone or email. We respond to all enquiries within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-primary-700" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Call Us</div>
                      <div className="space-y-1">
                        {siteConfig.contactPhone.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            className="block text-sm font-medium text-gray-800 hover:text-primary-700 transition-colors"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-blue-700" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Us</div>
                      <a
                        href={`mailto:${siteConfig.contactEmail}`}
                        className="text-sm font-medium text-gray-800 hover:text-primary-700 transition-colors break-all"
                      >
                        {siteConfig.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-emerald-700" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Visit Us</div>
                      <address className="not-italic text-sm text-gray-800 leading-relaxed">
                        <div className="font-semibold">CG Techno Electronics</div>
                        {siteConfig.address.line1}<br />
                        {siteConfig.address.line2},<br />
                        {siteConfig.address.city} – {siteConfig.address.pincode}<br />
                        {siteConfig.address.state}, {siteConfig.address.country}
                      </address>
                      <a
                        href={siteConfig.address.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-primary-700 hover:text-primary-900 transition-colors"
                      >
                        <MapPin size={12} />
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-amber-700" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Business Hours</div>
                      <div className="text-sm text-gray-800 space-y-0.5">
                        <div>{siteConfig.businessHours.weekdays}</div>
                        <div className="text-gray-500">{siteConfig.businessHours.sunday}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1} className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <MessageSquare size={20} className="text-primary-700" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Send Us an Enquiry</h2>
                    <p className="text-xs text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>
                <ContactForm prefillService={prefillService} prefillProduct={prefillProduct} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
