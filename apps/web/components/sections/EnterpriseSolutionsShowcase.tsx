'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import Image from 'next/image';
import { SectionHeader } from '../ui/SectionHeader';

const solutions = [
  {
    title: 'IT Infrastructure',
    image: '/images/services/it-infrastructure.jpg',
  },
  {
    title: 'Software & Licensing',
    image: '/images/services/software-licensing.jpg',
  },
  {
    title: 'Security Systems',
    image: '/images/services/security-systems.jpg',
  },
  {
    title: 'Biometric & Attendance',
    image: '/images/services/biometric-attendance.jpg',
  },
  {
    title: 'Access Automation',
    image: '/images/services/access-automation.jpg',
  },
  {
    title: 'Boom Barriers',
    image: '/images/services/boom-barriers.jpg',
  },
  {
    title: 'Networking Solutions',
    image: '/images/services/networking-solutions.jpg',
  },
  {
    title: 'Electronics Integration',
    image: '/images/services/electronics-integration.jpg',
  },
  {
    title: 'AMC & Support',
    image: '/images/services/amc-support.jpg',
  },
];

export function EnterpriseSolutionsShowcase() {
  // Double the list for seamless marquee effect
  const doubledSolutions = [...solutions, ...solutions];

  return (
    <section className="py-20 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Enterprise Solutions"
          tagIcon={Briefcase}
          title="Enterprise Solutions"
          titleHighlight="We Deliver"
          description="From software licensing and networking to security, automation, infrastructure, and support — everything your business needs under one technology partner."
          className="mb-16 text-center"
        />

        <div className="relative overflow-hidden w-full">
          <div className="flex gap-10 animate-marquee w-max py-2 hover:[animation-play-state:paused]">
            {doubledSolutions.map((solution, i) => (
              <motion.div
                key={`${solution.title}-${i}`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative flex flex-col group min-w-[300px] w-[300px] h-[200px] bg-white border border-gray-100 rounded-[16px] overflow-hidden shadow-sm hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)] transition-shadow duration-300 cursor-default"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    sizes="300px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    priority={i < 4}
                    loading={i >= 4 ? "lazy" : undefined}
                  />
                  {/* Premium Dark Gradient Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.35))',
                    }}
                  />
                  {/* Solution Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white text-lg font-semibold tracking-tight">
                      {solution.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
