'use client';

import { motion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2, Factory, FlaskConical, Globe } from 'lucide-react';
import { Reveal } from '@/components/animations/reveal';

const trustBadges = [
  {
    icon: Award,
    title: 'ISO 9001:2024',
    subtitle: 'Quality Management Certified',
    description: 'Certified batch-to-batch consistency and rigorous quality control protocols.',
  },
  {
    icon: FlaskConical,
    title: 'ASTM Standard Validated',
    subtitle: 'ASTM D2783 & ASTM B117',
    description: 'Third-party validated 4-Ball EP load capacity and >1,000h salt spray resistance.',
  },
  {
    icon: ShieldCheck,
    title: 'RoHS & REACH Compliant',
    subtitle: 'Zero SVHC Formulations',
    description: 'Environmentally compliant chemistry meeting European and North American industrial standards.',
  },
  {
    icon: Factory,
    title: 'Vadodara Manufacturing & R&D',
    subtitle: 'Gujarat Industrial Hub',
    description: 'Indigenous synthesis, fast custom sampling, and nationwide batch dispatch from Chhani, Vadodara.',
  },
];

const industrySectors = [
  'Automotive OEMs',
  'Aerospace & Defense Tier-1',
  'CNC Metal Machining',
  'Heavy Engineering',
  'Precision Electroplating',
  'Coating & Surface Treatment',
];

export function CertificationShowcase({ className = '' }: { className?: string }) {
  return (
    <section className={`py-12 sm:py-16 bg-[#F8FAFB] border-y border-gray-200/80 ${className}`}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-4">
              <ShieldCheck className="w-4 h-4 text-[#17A2B8]" />
              <span className="text-xs font-bold tracking-wider uppercase text-[#17A2B8]">
                Verified Industrial Quality & Compliance
              </span>
            </div>
          </Reveal>
          
          <Reveal delay={0.08}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C3E50] tracking-tight">
              Engineered to Global Chemical & Manufacturing Standards
            </h2>
          </Reveal>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <Reveal key={badge.title} delay={idx * 0.08} direction="up">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#17A2B8]/40 transition-all flex flex-col h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E6F7FA] border border-[#D1F2F7] flex items-center justify-center mb-4 shrink-0">
                    <Icon className="w-6 h-6 text-[#17A2B8]" />
                  </div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {badge.subtitle}
                  </div>
                  <h3 className="text-lg font-bold text-[#2C3E50] mb-2">
                    {badge.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mt-auto">
                    {badge.description}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Industry Sector Ticker / Bar */}
        <Reveal delay={0.25}>
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 shrink-0 text-center md:text-left">
              <Globe className="w-5 h-5 text-[#17A2B8]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#2C3E50]">
                Supplying Critical Formulations Across:
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3">
              {industrySectors.map((sector) => (
                <span
                  key={sector}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-xs font-semibold text-[#4A5568]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#17A2B8]" />
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
