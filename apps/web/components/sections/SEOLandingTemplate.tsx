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
      <section className="relative bg-mesh bg-hero-pattern pt-24 pb-12 lg:pt-28 lg:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-base font-semibold bg-white/10 border border-white/20 text-white/90 mb-8">
            <ShieldCheck size={16} className="text-blue-300" />
            <span>Bengaluru Enterprise IT Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            {titlePrefix}{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed">
            {tagline}
          </p>
        </div>
      </section>

      {/* Main Details and Form */}
      <section className="pt-10 pb-28 lg:pt-14 lg:pb-36 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20 items-start">
            
            {/* Service details */}
            <div className="lg:col-span-3 space-y-10">
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-750 border border-primary-100 mb-6 shadow-sm">
                  <ShieldCheck size={14} className="text-primary-800" />
                  <span>Enterprise Deployment</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-5 font-heading">
                  Enterprise-Grade Deployment in Bangalore
                </h2>
                <p className="text-gray-650 text-base leading-relaxed mb-8">
                  {introText}
                </p>
                <div className="flex items-center gap-4 p-5 bg-primary-50 rounded-2xl border border-primary-100">
                  <MapPin size={22} className="text-primary-800 shrink-0" />
                  <span className="text-sm sm:text-base text-primary-900 font-semibold">
                    {locationDetails}
                  </span>
                </div>
              </div>

              {/* Scope Features Grid */}
              <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-750 border border-primary-100 mb-6 shadow-sm">
                  <CheckCircle2 size={14} className="text-primary-800" />
                  <span>Scope of Work</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 font-heading">
                  Technical Specifications & Scope
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3.5 text-base text-gray-750">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <CheckCircle2 size={14} className="stroke-[3]" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service SLA details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-800 flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base lg:text-lg text-gray-900 mb-1.5 font-heading">OEM Warranties</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      We supply and install genuine equipment from authorized brand distributors.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 shadow-sm">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base lg:text-lg text-gray-900 mb-1.5 font-heading">AMC Support Options</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Enjoy peace of mind with our 24/7 Annual Maintenance Contracts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 sticky top-28">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shadow-inner shrink-0">
                    <MessageSquare size={24} className="text-primary-750" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg font-heading">Consult our Engineers</h3>
                    <p className="text-sm text-gray-500">We respond to Bangalore queries within 2 hours</p>
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
