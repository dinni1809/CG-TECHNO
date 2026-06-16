'use client';

import { motion } from 'framer-motion';
import { Phone, MessageSquare } from 'lucide-react';
import { siteConfig } from '@cg-techno/config';
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics';
import { usePathname } from 'next/navigation';

export function FloatingCTA() {
  const pathname = usePathname();
  
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const primaryPhone = siteConfig.contactPhone[0].replace(/\s/g, '');
  const whatsappNumber = '918861158888'; // Clean format with country code
  const whatsappMsg = encodeURIComponent('Hello CG Techno, I would like to enquire about your IT infrastructure and electronics solutions.');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => trackWhatsAppClick()}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors cursor-pointer group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
        <span className="absolute right-14 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          WhatsApp Chat
        </span>
      </motion.a>

      {/* Call Button */}
      <motion.a
        href={`tel:${primaryPhone}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => trackPhoneClick(siteConfig.contactPhone[0])}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors cursor-pointer group relative"
        aria-label="Call Support"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
        <span className="absolute right-14 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          Call Support
        </span>
      </motion.a>
    </div>
  );
}
