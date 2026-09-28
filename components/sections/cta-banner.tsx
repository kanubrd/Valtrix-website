'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, ShieldCheck, TrendingDown, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { Reveal } from '@/components/animations/reveal';

const metricCards = [
  {
    icon: TrendingDown,
    stat: '42%',
    label: 'Downtime Reduction',
    detail: 'Validated across CNC cutting operations and industrial gear assemblies.',
  },
  {
    icon: ShieldCheck,
    stat: '1,000+ Hrs',
    label: 'ASTM B117 Salt Spray',
    detail: 'Non-chromate corrosion passivation on steel and multi-metal substrates.',
  },
  {
    icon: Clock,
    stat: '3.4x',
    label: 'Fluid Drain Extension',
    detail: 'MoDTC & advanced biostabilizers eliminate sludge and premature oil breakdown.',
  },
];

export function CTABanner() {
  return (
    <section
      className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24"
      style={{ background: '#ffffff' }}
    >
      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center">

        {/* Label */}
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#17A2B8]" />
            <span className="text-xs font-semibold tracking-[4px] uppercase text-[#17A2B8]">
              Ready to eliminate unplanned downtime?
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
              maxWidth: 960,
            }}
          >
            Prevent Machinery Failures with{' '}
            <span style={{ color: '#17A2B8' }}>Advanced Material Chemistry</span>
          </h2>
        </Reveal>

        {/* Description */}
        <Reveal delay={0.15}>
          <p
            className="mx-auto mb-10 text-base sm:text-lg leading-relaxed text-[#4A5568] max-w-3xl"
          >
            Industrial machinery failures often stem from material degradation, coating failures, and thermal polymer breakdown. 
            Valtrix engineers custom chemical formulations in Vadodara that prevent these failures, multiply equipment service life, and protect operational margins.
          </p>
        </Reveal>

        {/* Metric Cards Infographic */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-12">
          {metricCards.map((m, idx) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.label} delay={0.18 + idx * 0.08}>
                <div className="bg-[#F8FAFB] border border-gray-200/80 rounded-2xl p-6 text-center hover:border-[#17A2B8]/40 transition-colors h-full flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F7FA] border border-[#D1F2F7] flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-[#17A2B8]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#2C3E50] mb-1">
                    {m.stat}
                  </div>
                  <div className="text-xs font-bold text-[#17A2B8] uppercase tracking-wider mb-2">
                    {m.label}
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    {m.detail}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Action-Oriented Buttons */}
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-white text-base tracking-wide rounded-xl shadow-md hover:shadow-lg transition-all min-h-[52px]"
                style={{ background: '#17A2B8' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0D7A8C')}
                onMouseLeave={e => (e.currentTarget.style.background = '#17A2B8')}
              >
                <span>Request a Quote Now</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-[#2C3E50] bg-white hover:bg-[#E6F7FA] border border-gray-200 hover:border-[#17A2B8]/40 rounded-xl text-base tracking-wide transition-all min-h-[52px]"
            >
              <PhoneCall size={18} className="text-[#17A2B8]" />
              <span>Consult with a Chemical Engineer</span>
            </Link>
          </div>
        </Reveal>

        {/* Trust badges */}
        <Reveal delay={0.35}>
          <div
            className="flex flex-col sm:flex-row justify-center gap-6 text-sm pt-8 border-t border-gray-200"
          >
            {[
              'Guaranteed Batch-to-Batch Consistency',
              'Direct R&D Plant Formulation in Vadodara',
              'ISO 9001:2024 & ASTM Validated Solutions',
            ].map((f) => (
              <div key={f} className="flex items-center justify-center gap-2" style={{ color: '#4A5568' }}>
                <CheckCircle size={15} style={{ color: '#17A2B8' }} className="shrink-0" />
                <span className="text-xs sm:text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
