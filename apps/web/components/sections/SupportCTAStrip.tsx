'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PhoneCall, ShieldAlert, ArrowRight } from 'lucide-react';

export function SupportCTAStrip() {
  return (
    <div className="relative bg-gradient-to-r from-red-600 via-primary-900 to-primary-950 text-white overflow-hidden py-5 shadow-inner border-y border-white/10">
      <div className="absolute inset-0 bg-hero-pattern opacity-5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Header & Alert Message */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 animate-pulse border border-white/20">
              <ShieldAlert size={20} className="text-amber-400" />
            </div>
            <div>
              <h4 className="text-base font-bold tracking-wide">
                Need Immediate IT Support or Emergency Infrastructure Help?
              </h4>
              <p className="text-white/70 text-xs mt-0.5">
                Our certified network engineers are on standby for critical hardware and network outages.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+918861158888"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-semibold transition-all"
            >
              <PhoneCall size={14} className="text-cyan-300" />
              <span>Call Hotline: +91 886 115 8888</span>
            </a>
            
            <Link
              href="/contact"
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-450 text-gray-950 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all group"
            >
              <span>Request Dispatch</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
