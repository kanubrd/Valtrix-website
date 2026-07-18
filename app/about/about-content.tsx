'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { Target, Telescope, Lightbulb, CheckCircle2, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function AboutContent() {
  const [showMission, setShowMission] = useState(true);
  const [showVision, setShowVision] = useState(true);

  return (
    <div className="pt-16 sm:pt-20">

      {/* Hero */}
      <Section className="bg-white py-16 sm:py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#17A2B8]" />
            <span className="text-sm font-medium text-[#2C3E50]">About VAM VALTRIX</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#2C3E50] mb-6 leading-tight">
            We Engineer{' '}
            <span className="gradient-text">Advanced Materials</span>{' '}
            for Tomorrow
          </h1>
          <p className="text-lg sm:text-xl text-[#6B7280] leading-relaxed">
            Since 2020, we&apos;ve been creating novel materials and additives that enhance material life, 
            pushing the boundaries of what&apos;s possible in industrial chemistry and manufacturing.
          </p>
        </motion.div>
      </Section>
 
      {/* Mission & Vision */}
      <Section className="bg-white">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Mission */}
          <Reveal direction="left">
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-gray-150">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#E6F7FA] flex items-center justify-center">
                  <Target className="w-7 h-7 text-[#17A2B8]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2C3E50]">Our Mission</h2>
                  <p className="text-sm text-[#6B7280]">What drives us every day</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowMission(!showMission)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors mb-4"
              >
                <span className="font-semibold text-[#2C3E50]">Read Our Mission Statement</span>
                <ChevronDown className={`w-5 h-5 text-[#17A2B8] transition-transform ${showMission ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showMission && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[#6B7280] leading-relaxed p-4 border border-gray-150 rounded-xl bg-white">
                      To create innovative materials and additives that enhance the life and performance of industrial components, 
                      while maintaining our commitment to environmental sustainability and customer success. We strive to be the 
                      trusted partner for manufacturers seeking advanced chemical solutions that improve efficiency, reduce costs, 
                      and extend equipment lifespan.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
 
          {/* Vision */}
          <Reveal direction="right">
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-gray-150">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#E6F7FA] flex items-center justify-center">
                  <Telescope className="w-7 h-7 text-[#17A2B8]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2C3E50]">Our Vision</h2>
                  <p className="text-sm text-[#6B7280]">Where we&apos;re headed</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowVision(!showVision)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors mb-4"
              >
                <span className="font-semibold text-[#2C3E50]">Explore Our Vision</span>
                <ChevronDown className={`w-5 h-5 text-[#17A2B8] transition-transform ${showVision ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showVision && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[#6B7280] leading-relaxed p-4 border border-gray-150 rounded-xl bg-white">
                      To become India&apos;s leading innovator in advanced materials and industrial chemistry, recognized globally 
                      for sustainable solutions that transform manufacturing processes. We envision a future where our materials 
                      enable breakthrough technologies in automotive, aerospace, and renewable energy sectors, contributing to a 
                      more efficient and environmentally conscious industrial landscape.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-white">
        <SectionTitle 
          subtitle="OUR VALUES" 
          title="What We Stand For" 
          description="The principles that guide our work and relationships"
        />
        
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Lightbulb,
              title: 'Innovation',
              description: 'Continuously pushing the boundaries of materials science to create breakthrough solutions.',
              points: ['Research & Development Focus', 'Novel Formulations', 'Technology Integration']
            },
            {
              icon: CheckCircle2,
              title: 'Quality',
              description: 'Uncompromising commitment to excellence in every product and service we deliver.',
              points: ['Rigorous Testing', 'ISO Compliance', 'Customer Satisfaction']
            },
            {
              icon: Target,
              title: 'Sustainability', 
              description: 'Creating eco-friendly solutions that benefit both industry and the environment.',
              points: ['Bio-based Materials', 'Waste Reduction', 'Energy Efficiency']
            }
          ].map((value, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 h-full">
                <div className="w-14 h-14 rounded-xl bg-[#E6F7FA] flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-[#17A2B8]" />
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-3">{value.title}</h3>
                <p className="text-[#6B7280] mb-4">{value.description}</p>
                <ul className="space-y-2">
                  {value.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-[#6B7280]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#17A2B8]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Company Stats */}
      <Section className="bg-[#2C3E50] text-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Our Impact in Numbers</h2>
          <p className="text-gray-300 text-sm sm:text-base">Growing stronger with every innovation</p>
        </div>
        
        <div className="grid grid-cols-4 gap-2 xs:gap-3 sm:gap-8">
          {[
            { number: '2025', label: 'Founded', suffix: '' },
            { number: '5', label: 'Products', suffix: '+' },
            { number: '20', label: 'Happy Clients', suffix: '+' },
            { number: '99', label: 'Client Satisfaction', suffix: '%' }
          ].map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <div className="text-xl xs:text-2xl sm:text-4xl font-bold text-[#17A2B8] mb-1 sm:mb-1.5">
                  {stat.number}{stat.suffix}
                </div>
                <p className="text-[10px] xs:text-xs sm:text-sm text-gray-300 font-medium leading-tight">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>



      {/* CTA */}
      <Section className="bg-white text-center">
        <SectionTitle 
          subtitle="READY TO PARTNER?" 
          title="Let's Build Something Great Together" 
        />
        <div className="max-w-2xl mx-auto mt-8">
          <p className="text-lg text-[#6B7280] mb-8">
            Whether you need custom formulations, technical support, or innovative materials for your next project, 
            we&apos;re here to help you achieve your goals.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#17A2B8] text-white font-semibold rounded-lg hover:bg-[#0D7A8C] transition-colors"
          >
            Start a Conversation
            <Target className="w-5 h-5" />
          </Link>
        </div>
      </Section>
    </div>
  );
}