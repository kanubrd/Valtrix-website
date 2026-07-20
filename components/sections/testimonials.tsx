'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/animations/reveal';

const threatCards = [
  {
    title: 'Equipment Failure',
    description: 'Poor quality additives lead to chemical degradation, oil sludge, and premature failure of high-speed CNC machines, gearboxes, and pumps.',
    image: '/equipment-failure-v2.png',
    tag: 'ASSET DEGRADATION',
    link: '/products/vam-hs-100',
    alt: 'a damaged industrial gearbox on a factory floor with oil leaking and gears showing severe wear and tear due to chemical failure.',
  },
  {
    title: 'Economic Loss',
    description: 'Supply chain failures cost global manufacturers billions annually — from line stoppages, emergency sourcing premiums, and expedited freight.',
    image: '/economic-loss-v2.png',
    tag: 'FINANCIAL IMPACT',
    link: '/products/sustainable-polyols',
    alt: 'a modern manufacturing facility control room with a large glowing financial dashboard showing factory uptime and supply chain metrics.',
  },
  {
    title: 'Surface Degradation',
    description: 'Unprotected or improperly specified materials degrade rapidly in harsh environments, compounding maintenance costs and compliance risk.',
    image: '/surface-degradation-v2.png',
    tag: 'MATERIAL SCIENCE',
    link: '/products/surface-treatments',
    alt: 'a macro photograph highlighting surface degradation, deep oxidation, and rust textures forming on a structural industrial metal beam.',
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  'ASSET DEGRADATION':  { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444' },
  'FINANCIAL IMPACT': { bg: 'rgba(245, 158, 11, 0.1)', text: '#D97706' },
  'MATERIAL SCIENCE': { bg: 'rgba(23, 162, 184, 0.1)',  text: '#17A2B8' },
};

export function TestimonialsSection() {
  return (
    <section style={{ background: '#ffffff' }} className="pt-10 pb-20 md:pt-14 md:pb-28 border-t border-gray-150">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section label */}
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-10 md:mb-12">
            <div className="h-px w-10 bg-[#17A2B8]" />
            <span className="text-base sm:text-lg font-bold tracking-[8px] uppercase text-[#17A2B8]">
              Why It Matters
            </span>
            <div className="h-px w-10 bg-[#17A2B8]" />
          </div>
        </Reveal>

        {/* Heading row */}
        <div className="mb-16 md:mb-20 text-left">
          <Reveal>
            <h2
              className="font-bold leading-[1.08] mb-6"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#2C3E50',
                letterSpacing: '-0.02em',
              }}
            >
              Material Failure is an Economic Threat.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base sm:text-lg leading-relaxed max-w-3xl" style={{ color: '#6B7280' }}>
              Equipment downtime directly impacts the bottom line. Material failures in industrial
              environments cascade into production delays, compliance violations, and lost revenue.
              Valtrix eliminates this risk at the source.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {threatCards.map((card, idx) => {
            const colors = tagColors[card.tag] || { bg: 'rgba(23,162,184,0.1)', text: '#17A2B8' };
            return (
              <Reveal key={card.title} delay={idx * 0.1}>
                <Link href={card.link} className="block group">
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)' }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden h-full border border-gray-150 shadow-sm"
                    style={{
                      background: '#ffffff',
                      borderRadius: '12px',
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-transparent">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        quality={85}
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="text-[9px] font-bold tracking-[2px] uppercase px-2.5 py-1.5"
                          style={{ 
                            background: colors.bg, 
                            color: colors.text,
                            borderRadius: '4px',
                          }}
                        >
                          {card.tag}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 border-t border-gray-150">
                      <h3
                        className="font-bold mb-3 group-hover:text-[#17A2B8] transition-colors font-sans"
                        style={{ color: '#2C3E50', fontSize: '1.1rem' }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
