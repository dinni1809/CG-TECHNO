'use client';

import { CheckCircle2, ShieldCheck, MapPin, Award, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { ContactForm } from './ContactForm';
import { siteConfig } from '@cg-techno/config';

interface SEOLandingProps {
  titlePrefix: string;
  titleHighlight: string;
  tagline: string;
  introText: string;
  features: string[];
  servicePrefill: string;
  locationDetails?: string;
}

export function SEOLandingTemplate({
  titlePrefix,
  titleHighlight,
  tagline,
  introText,
  features,
  servicePrefill,
  locationDetails = 'Available across Bengaluru: Electronic City, Whitefield, Koramangala, Indiranagar, Manyata Tech Park, Sampangiramanagar, and surrounding areas.',
}: SEOLandingProps) {
  return (
    <>
      {/* Hero Header */}
      <section className="relative bg-mesh bg-hero-pattern pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-white/80 mb-5">
            Bengaluru Enterprise IT Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
            {titlePrefix}{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {tagline}
          </p>
        </div>
      </section>

      {/* Main Details and Form */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            
            {/* Service details */}
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                  Enterprise-Grade Deployment in Bangalore
                </h2>
                <p className="text-gray-650 text-sm leading-relaxed mb-6">
                  {introText}
                </p>
                <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl border border-primary-100">
                  <MapPin size={20} className="text-primary-800 shrink-0" />
                  <span className="text-xs sm:text-sm text-primary-900 font-medium">
                    {locationDetails}
                  </span>
                </div>
              </div>

              {/* Scope Features Grid */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider font-heading">
                  Service Inclusions
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-gray-750">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={12} className="stroke-[3]" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service SLA details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-800 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 mb-1">OEM Warranties</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      We supply only genuine products from authorized brand distributors.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 mb-1">AMC Support Options</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Enjoy peace of mind with our 24/7 Annual Maintenance Contracts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <MessageSquare size={20} className="text-primary-750" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">Consult our Engineers</h3>
                    <p className="text-xs text-gray-500">We respond to Bangalore queries within 2 hours</p>
                  </div>
                </div>
                <ContactForm prefillService={servicePrefill} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
