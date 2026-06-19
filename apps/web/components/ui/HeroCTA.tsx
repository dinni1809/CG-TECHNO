'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { trackCTA } from '@/lib/analytics';

interface HeroCTAProps {
  href: string;
  label: string;
  actionName?: string;
  className?: string;
}

export function HeroCTA({
  href,
  label,
  actionName = 'Request Consultation Clicked',
  className = 'inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-primary-950 font-bold rounded-xl shadow-lg hover:bg-slate-50 transition-all text-base',
}: HeroCTAProps) {
  const isHash = href.startsWith('#');

  if (isHash) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <a
          href={href}
          onClick={() => trackCTA(label, actionName)}
          className={className}
        >
          {label}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Link
        href={href}
        onClick={() => trackCTA(label, actionName)}
        className={className}
      >
        {label}
      </Link>
    </motion.div>
  );
}
