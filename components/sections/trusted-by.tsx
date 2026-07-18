'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Car, Layers, Compass, Cog } from 'lucide-react';
import { Reveal } from '@/components/animations/reveal';

const industries = [
  { icon: Car, label: 'Tier-1 Automotive Partner' },
  { icon: Cpu, label: 'Electronics & Component Manufacturer' },
  { icon: ShieldCheck, label: 'Defense Sourced Supplier' },
  { icon: Layers, label: 'Specialty Polymers Processing' },
  { icon: Compass, label: 'Aerospace Components Tier' },
  { icon: Cog, label: 'Heavy Engineering & Machinery' },
];

export function TrustedBy() {
  return (
    <section className="bg-white border-b border-gray-100 py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 font-sans">
          Trusted across critical industrial supply chains
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
          {industries.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.05} direction="up">
              <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-50 hover:border-[#D1F2F7] bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all duration-300 text-center h-28 group">
                <item.icon size={28} className="text-gray-400 group-hover:text-[#17A2B8] transition-colors mb-2.5 shrink-0" />
                <span className="text-[10px] font-bold text-[#2C3E50] tracking-wide leading-tight px-1 font-sans">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
