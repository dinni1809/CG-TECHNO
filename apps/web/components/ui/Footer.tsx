'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Linkedin, Instagram, Clock } from 'lucide-react';
import { siteConfig, footerLinks } from '@cg-techno/config';
import { trackPhoneClick, trackEmailClick } from '@/lib/analytics';

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname?.startsWith('/admin')) {
    return null;
  }


  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <Image
              src="/logo_transparent.png"
              alt="CG Techno Electronics"
              width={180}
              height={114}
              className="object-contain mb-4 h-16 md:h-20 lg:h-[100px] w-auto transition-all duration-300"
              style={{ width: 'auto', filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.35))' }}
            />
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              {siteConfig.tagline}. Premium IT infrastructure and electronics solutions for enterprises across Bengaluru.
            </p>
            <div className="flex gap-3">
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-800 hover:text-white transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-700 hover:text-white transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors duration-200">Home</Link>
              </li>
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-5">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions & Certifications */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-5">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-xs text-gray-400 hover:text-white transition-colors duration-200">Solutions</Link>
              </li>
              <li>
                <Link href="/services#industries-served" className="text-xs text-gray-400 hover:text-white transition-colors duration-200">Industries Served</Link>
              </li>
              <li>
                <Link href="/services#electronics-engineering" className="text-xs text-gray-400 hover:text-white transition-colors duration-200">Technology Consulting</Link>
              </li>
              <li>
                <Link href="/services#enterprise-it" className="text-xs text-gray-400 hover:text-white transition-colors duration-200">Infrastructure Services</Link>
              </li>
              <li className="pt-3 border-t border-gray-800">
                <span className="text-[10px] font-bold text-cyan-300 block uppercase tracking-wider">Certifications</span>
                <span className="text-[10px] text-gray-400 block mt-1">ISO 9001:2015 QA Certified</span>
                <span className="text-[10px] text-gray-400 block">Safe E-Waste Compliant</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-5">Contact Details</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-primary-400 mt-0.5 shrink-0" />
                <address className="not-italic text-xs text-gray-400 leading-relaxed">
                  {siteConfig.address.line1}<br />
                  {siteConfig.address.line2},<br />
                  {siteConfig.address.city} – {siteConfig.address.pincode}
                </address>
              </li>
              {siteConfig.contactPhone.map((phone) => (
                <li key={phone} className="flex gap-3 items-center">
                  <Phone size={14} className="text-primary-400 shrink-0" />
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    onClick={() => trackPhoneClick(phone)}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex gap-3 items-center">
                <Mail size={14} className="text-primary-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  onClick={() => trackEmailClick(siteConfig.contactEmail)}
                  className="text-xs text-gray-400 hover:text-white transition-colors break-all"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Clock size={14} className="text-primary-400 mt-0.5 shrink-0" />
                <div className="text-xs text-gray-400">
                  <div>{siteConfig.businessHours.weekdays}</div>
                  <div>{siteConfig.businessHours.sunday}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <span>Bengaluru, Karnataka, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
