'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award } from 'lucide-react';
import { siteConfig } from '@cg-techno/config';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';
import { SectionHeader } from '../ui/SectionHeader';

function Counter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-28 lg:py-36 bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Key Milestones"
          tagIcon={Award}
          title="CG Techno by the"
          titleHighlight="Numbers"
          description="A snapshot of our growth, client success, and operational excellence over the years."
          light={true}
          className="mb-20 text-center"
        />
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {siteConfig.stats.map((stat, i) => (
            <StaggerItem key={stat.label}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <div className="text-5xl lg:text-7xl font-bold text-white mb-3 font-heading">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-primary-200 text-base lg:text-lg font-semibold">{stat.label}</div>
                <div
                  className="mt-4 mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
                  style={{ opacity: 0.8 }}
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
