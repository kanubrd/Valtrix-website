'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/animations/reveal';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import industriesData from '@/data/content/industries.json';

const tagColors: Record<string, { bg: string; text: string }> = {
  'AUTOMOTIVE & GEN':   { bg: 'rgba(23, 162, 184, 0.1)', text: '#17A2B8' },
  'METALWORKING':       { bg: 'rgba(23, 162, 184, 0.1)', text: '#17A2B8' },
  'ELECTROPLATING':     { bg: 'rgba(23, 162, 184, 0.1)', text: '#17A2B8' },
  'SURFACE TREATMENT':   { bg: 'rgba(23, 162, 184, 0.1)', text: '#17A2B8' },
};

export function HomeIndustriesSection() {
  // Use data from industries.json
  const industries = industriesData;

  return (
    <section className="py-20 md:py-28 bg-white border-t border-gray-150">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section label & heading */}
        <div className="mb-16">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#17A2B8]" />
              <span className="text-xs font-semibold tracking-[4px] uppercase text-[#17A2B8]">
                Target Sectors
              </span>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <Reveal>
              <h2
                className="font-bold leading-[1.08]"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#2C3E50',
                  letterSpacing: '-0.02em',
                }}
              >
                Custom Chemistry for{' '}
                <span style={{ color: '#17A2B8' }}>Core Industries.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base sm:text-lg leading-relaxed text-[#6B7280]">
                We engineer tailor-made additive packages and chemical formulations that meet the rigorous performance demands of global manufacturing sectors.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Industries Grid (4-column row matching the style of the threat cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry: any, idx: number) => {
            const colors = tagColors[industry.tag] || { bg: 'rgba(23,162,184,0.1)', text: '#17A2B8' };
            return (
              <Reveal key={industry.title} delay={idx * 0.08} direction="up">
                <Link href={`/industries/${industry.slug}`} className="block group h-full">
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)' }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden h-full border border-gray-150 shadow-sm flex flex-col justify-between"
                    style={{
                      background: '#ffffff',
                      borderRadius: '12px',
                    }}
                  >
                    <div>
                      {/* Image section */}
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <Image
                          src={industry.listingImage}
                          alt={industry.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          loading="lazy"
                          quality={80}
                        />
                        {/* Tag over image */}
                        <div
                          className="absolute bottom-4 left-4 text-[10px] font-bold tracking-[1.5px] uppercase py-1.5 px-3"
                          style={{
                            background: colors.bg,
                            color: colors.text,
                            borderRadius: '4px',
                            backdropFilter: 'blur(4px)',
                            border: '1px solid rgba(23,162,184,0.18)',
                          }}
                        >
                          {industry.tag}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-[#2C3E50] mb-3 leading-snug group-hover:text-[#17A2B8] transition-colors">
                          {industry.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-500 line-clamp-3">
                          {industry.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom CTA bar */}
                    <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#17A2B8]">
                      <span>Explore Solutions</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200" />
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
