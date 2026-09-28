'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';

// Dynamically import modals (loaded on first interaction)
const QuoteModal = dynamic(() => import('@/components/modals/quote-modal').then((mod) => ({ default: mod.QuoteModal })), {
  ssr: false,
  loading: () => null,
});

export function HeroSection() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [mounted,     setMounted]     = useState(false);

  useEffect(() => { setMounted(true); }, []);


  return (
    <>
      <section style={{ background: '#FFFFFF' }} className="overflow-hidden pt-[100px] md:pt-0">
        {/* ── Full-width hero banner image ── */}
        <div
          className="w-full relative overflow-hidden aspect-[1916/821] md:aspect-auto md:h-[clamp(400px,48vw,620px)]"
          style={{
            marginTop: '0px',
            boxShadow: 'inset 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#0F172A',
          }}
        >
          <Image
            src="/hero-banner-clean.webp"
            alt="Valtrix Advance Material - Creating Novel Materials & Additives to Enhance Material Life"
            fill
            priority
            sizes="100vw"
            quality={100}
            unoptimized
            className="object-contain md:object-cover object-center"
            style={{
              filter: 'contrast(1.02) brightness(1.01)',
            }}
          />

          {/* ── Animated Chemical Formulas in Middle-Right ── */}
          <div
            className="pointer-events-none absolute right-[6%] sm:right-[10%] md:right-[14%] lg:right-[16%] top-[48%] -translate-y-1/2 flex items-center gap-6 sm:gap-10 md:gap-14 lg:gap-16 select-none z-20"
            aria-hidden="true"
          >
            {/* H2O Molecule - Gentle Dancing Float */}
            <motion.div
              animate={{
                y: [-7, 6, -9, 5, -7],
                x: [-5, 6, -4, 5, -5],
                rotate: [-2.5, 3, -1.8, 2.2, -2.5],
                scale: [1, 1.04, 0.97, 1.03, 1],
              }}
              transition={{
                duration: 6.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] drop-shadow-[0_0_14px_rgba(255,255,255,0.65)]"
            >
              <svg
                viewBox="0 0 160 140"
                className="w-16 sm:w-24 md:w-32 lg:w-40 h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* H2O Text */}
                <text
                  x="80"
                  y="34"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="var(--font-outfit), system-ui, sans-serif"
                  fontSize="32"
                  fontWeight="600"
                  letterSpacing="1"
                >
                  H<tspan fontSize="20" dy="8">2</tspan><tspan fontSize="32" dy="-8">O</tspan>
                </text>

                {/* Central Oxygen */}
                <text
                  x="80"
                  y="82"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#FFFFFF"
                  fontFamily="var(--font-outfit), system-ui, sans-serif"
                  fontSize="30"
                  fontWeight="400"
                >
                  O
                </text>

                {/* Left Bond */}
                <line
                  x1="66"
                  y1="90"
                  x2="48"
                  y2="108"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Left Hydrogen */}
                <text
                  x="36"
                  y="120"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#FFFFFF"
                  fontFamily="var(--font-outfit), system-ui, sans-serif"
                  fontSize="28"
                  fontWeight="400"
                >
                  H
                </text>

                {/* Right Bond */}
                <line
                  x1="94"
                  y1="90"
                  x2="112"
                  y2="108"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Right Hydrogen */}
                <text
                  x="124"
                  y="120"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#FFFFFF"
                  fontFamily="var(--font-outfit), system-ui, sans-serif"
                  fontSize="28"
                  fontWeight="400"
                >
                  H
                </text>
              </svg>
            </motion.div>

            {/* CO2 Molecule - Gentle Dancing Float (offset timing) */}
            <motion.div
              animate={{
                y: [5, -7, 4, -5, 5],
                x: [4, -5, 5, -4, 4],
                rotate: [2, -2.5, 1.8, -1.8, 2],
                scale: [0.99, 1.02, 1.04, 0.98, 0.99],
              }}
              transition={{
                duration: 7.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="flex flex-col items-center filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] drop-shadow-[0_0_14px_rgba(255,255,255,0.65)]"
            >
              <svg
                viewBox="0 0 170 120"
                className="w-18 sm:w-26 md:w-34 lg:w-42 h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* CO2 Text */}
                <text
                  x="85"
                  y="34"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="var(--font-outfit), system-ui, sans-serif"
                  fontSize="32"
                  fontWeight="600"
                  letterSpacing="1"
                >
                  CO<tspan fontSize="20" dy="8">2</tspan>
                </text>

                {/* Left Oxygen */}
                <text
                  x="26"
                  y="85"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#FFFFFF"
                  fontFamily="var(--font-outfit), system-ui, sans-serif"
                  fontSize="30"
                  fontWeight="400"
                >
                  O
                </text>

                {/* Left Double Bond */}
                <line
                  x1="43"
                  y1="80"
                  x2="67"
                  y2="80"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="43"
                  y1="90"
                  x2="67"
                  y2="90"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Center Carbon */}
                <text
                  x="85"
                  y="85"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#FFFFFF"
                  fontFamily="var(--font-outfit), system-ui, sans-serif"
                  fontSize="30"
                  fontWeight="400"
                >
                  C
                </text>

                {/* Right Double Bond */}
                <line
                  x1="103"
                  y1="80"
                  x2="127"
                  y2="80"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <line
                  x1="103"
                  y1="90"
                  x2="127"
                  y2="90"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Right Oxygen */}
                <text
                  x="144"
                  y="85"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#FFFFFF"
                  fontFamily="var(--font-outfit), system-ui, sans-serif"
                  fontSize="30"
                  fontWeight="400"
                >
                  O
                </text>
              </svg>
            </motion.div>
          </div>

          {/* Bottom gradient fade (desktop only so mobile image details remain 100% visible and uncropped) */}
          <div
            className="hidden md:block pointer-events-none absolute bottom-0 left-0 right-0 h-28"
            style={{
              background: 'linear-gradient(to bottom, transparent, #FFFFFF)',
            }}
          />
        </div>

        {/* ── Content below image ── */}
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 pb-0">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-4" style={{ background: '#17A2B8' }} />
            <span className="text-xs font-semibold tracking-[4px] uppercase" style={{ color: '#17A2B8' }}>
              Valtrix Advance Material Pvt. Ltd
            </span>
          </motion.div>

          {/* Heading + right column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12">

            {/* Left: heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.55 }}
              className="font-bold leading-[1.08]"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                color: '#2C3E50',
                letterSpacing: '-0.02em',
              }}
            >
              Valtrix — Creating Novel Materials & Additives to{' '}
              <span style={{ color: '#17A2B8' }}>Enhance Material Life.</span>
            </motion.h1>

            {/* Right: description + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.65 }}
            >
              <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed mb-6">
                Valtrix engineers custom industrial additive packages, high-lubricity metalworking fluids, and corrosion-resistant surface treatments in Vadodara to extend machinery life and prevent unplanned downtime.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <motion.button
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsQuoteOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-white text-base tracking-wide rounded-xl shadow-md hover:shadow-lg transition-all min-h-[56px] text-center"
                  style={{ background: '#17A2B8' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#0D7A8C')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#17A2B8')}
                >
                  <span>Request a Quote Now</span>
                  <ArrowRight size={18} />
                </motion.button>
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-[#2C3E50] bg-[#F8FAFB] hover:bg-[#E6F7FA] border border-gray-200 hover:border-[#17A2B8]/40 rounded-xl text-base tracking-wide transition-all min-h-[56px] text-center"
                >
                  Explore Solutions
                </Link>
              </div>
            </motion.div>
          </div>

        </div>

      </section>

      {/* ── Quote Modal (dynamically loaded) ── */}
      {mounted && <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />}
    </>
  );
}
