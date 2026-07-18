'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/animations/reveal';

export function CTABanner() {
  return (
    <section
      className="relative overflow-hidden pt-6 pb-12 md:pt-8 md:pb-16"
      style={{ background: '#ffffff' }}
    >

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center">

        {/* Label */}
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-8 bg-[#17A2B8]" />
            <span className="text-xs font-semibold tracking-[4px] uppercase text-[#17A2B8]">
              Ready to streamline your supply chain?
            </span>
            <div className="h-px w-8 bg-[#17A2B8]" />
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.1}>
          <h2
            className="font-bold leading-[1.08] mb-6 mx-auto"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              color: '#2C3E50',
              letterSpacing: '-0.02em',
              maxWidth: 900,
            }}
          >
            Prevent Machinery Failures with{' '}
            <span style={{ color: '#17A2B8' }}>Advanced Material Protection</span>
          </h2>
        </Reveal>

        {/* Description */}
        <Reveal delay={0.15}>
          <p
            className="mx-auto mb-10 text-base sm:text-lg leading-relaxed text-[#4A5568] max-w-3xl"
          >
            Industrial machinery failures often stem from material degradation, coating failures, and polymer breakdown. 
            Valtrix develops advanced chemical solutions that prevent these failures, extend equipment life, and reduce costly downtime.
          </p>
        </Reveal>

        {/* Trust badges */}
        <Reveal delay={0.2}>
          <div
            className="flex flex-col sm:flex-row justify-center gap-6 text-sm pt-8"
            style={{ borderTop: '1px solid #E5E7EB' }}
          >
            {[
              'Prevent corrosion and wear',
              'Extend equipment lifespan',
              'Reduce maintenance costs',
            ].map((f) => (
              <div key={f} className="flex items-center justify-center gap-2" style={{ color: '#4A5568' }}>
                <CheckCircle size={14} style={{ color: '#17A2B8' }} className="shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
