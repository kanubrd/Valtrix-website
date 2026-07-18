'use client';

import { motion } from 'framer-motion';
import { Reveal } from '@/components/animations/reveal';
import { Section, SectionTitle } from '@/components/ui/section';
import { Award, Zap, Globe, ShieldCheck } from 'lucide-react';

const stats = [
  {
    icon: Award,
    value: '99.4%',
    label: 'On-Time SLA',
    description: 'Meeting rigorous manufacturing and supply timeline requirements consistently.'
  },
  {
    icon: Zap,
    value: '24–48h',
    label: 'Formulation Dispatch',
    description: 'Fast turnaround times on custom compound adjustments and validation reports.'
  },
  {
    icon: Globe,
    value: '25+',
    label: 'Countries Served',
    description: 'Exporting specialty materials globally with unified compliance standards.'
  },
  {
    icon: ShieldCheck,
    value: '100%',
    label: 'Batch Traceability',
    description: 'All shipments standard-matched with complete mill sheets and SDS/TDS copies.'
  }
];

export function WhyValtrixSection() {
  return (
    <Section className="bg-[#F8FAFB] py-16 sm:py-24 border-t border-b border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          subtitle="PROVEN PERFORMANCE" 
          title="Why B2B Leaders Choose Valtrix" 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} delay={idx * 0.1} direction="up" className="h-full">
                <motion.div 
                  whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)' }}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm h-full flex flex-col justify-between transition-all duration-300 ease-in-out"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#E6F7FA] flex items-center justify-center text-[#17A2B8] mb-5">
                      <Icon size={24} />
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#2C3E50] tracking-tight mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-bold text-[#17A2B8] uppercase tracking-wider mb-3">
                      {stat.label}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans mt-auto">
                    {stat.description}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
