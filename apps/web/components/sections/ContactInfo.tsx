'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@cg-techno/config';
import { trackPhoneClick, trackEmailClick } from '@/lib/analytics';

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm">
        <div className="flex gap-5">
          <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0 shadow-inner">
            <Phone size={22} className="text-primary-700" />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Call Us</div>
            <div className="space-y-1.5 font-sans">
              {siteConfig.contactPhone.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  onClick={() => trackPhoneClick(phone)}
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
              onClick={() => trackEmailClick(siteConfig.contactEmail)}
              className="text-base font-semibold text-gray-800 hover:text-primary-700 transition-colors break-all font-sans"
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
            <address className="not-italic text-base text-gray-800 leading-relaxed font-sans">
              <div className="font-bold mb-1">CG Techno Electronics</div>
              {siteConfig.address.line1}<br />
              {siteConfig.address.line2},<br />
              {siteConfig.address.city} – {siteConfig.address.pincode}<br />
              <span className="text-gray-450 block mt-1 text-sm font-medium">{siteConfig.address.country}</span>
            </address>
            <a
              href={siteConfig.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-800 hover:text-primary-700 transition-colors mt-4"
            >
              Open in Google Maps
              <span className="text-xs">↗</span>
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
            <div className="text-base text-gray-800 space-y-1.5 font-medium font-sans">
              <div>{siteConfig.businessHours.weekdays}</div>
              <div className="text-gray-450">{siteConfig.businessHours.sunday}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContactInfo;
