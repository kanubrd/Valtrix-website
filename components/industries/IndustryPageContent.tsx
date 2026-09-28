'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/animations/reveal';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle, 
  Car, 
  Wrench, 
  Factory, 
  Zap, 
  Shield, 
  Droplets, 
  Sparkles, 
  Layers, 
  Beaker, 
  Droplet,
  ChevronRight,
  Truck,
  HardHat,
  ShieldCheck,
  Play,
  Pause,
  Video
} from 'lucide-react';
import { Industry } from '@/lib/content-utils';

const iconMap: Record<string, React.ComponentType<any>> = {
  Car,
  Wrench,
  Factory,
  Zap,
  Shield,
  Droplets,
  Sparkles,
  Layers,
  Beaker,
  Droplet,
  Truck,
  HardHat,
  ShieldCheck
};

interface IndustryPageContentProps {
  industry: Industry;
}

export function IndustryPageContent({ industry }: IndustryPageContentProps) {
  const {
    title,
    tagColor,
    hero,
    overview,
    applications,
    applicationsSectionSubtitle = 'Comprehensive solutions for your industry needs',
    segments,
    segmentsSectionTitle = 'Market Segments',
    segmentsSectionSubtitle = 'Tailored solutions for every segment',
    segmentsSectionImage,
    segmentsSectionAnimatedImage,
    products,
    productsSectionSubtitle = 'Professional-grade chemistry',
    benefits,
    benefitsSectionTitle = 'Key Benefits',
    benefitsSectionSubtitle = 'Our solutions deliver proven performance improvements',
    cta
  } = industry;

  const isMetalworking = industry.slug === 'metalworking';
  const isElectroplating = industry.slug === 'electroplating';
  const isSurfaceTreatment = industry.slug === 'surface-treatment';

  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full bg-white" style={{ marginTop: '108px', boxShadow: 'inset 0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium font-sans">
            <Link href="/" className="hover:text-[#17A2B8] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/industries" className="hover:text-[#17A2B8] transition-colors">Industries</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#2C3E50] truncate font-semibold">{title}</span>
          </nav>
        </div>
        {/* Hero Image */}
        <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
          <Image
            src={hero.image}
            alt={hero.imageAlt || title}
            fill
            className={`${hero.imageObjectFit === 'object-cover' ? 'object-cover' : 'object-contain'} object-center`}
            priority
            quality={100}
            sizes="100vw"
          />
        </div>

        {/* Spacing Section */}
        <div className="w-full h-16 bg-white"></div>

        {/* Text Content */}
        <div className="pb-12 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div>
              {hero.heroTagline && (
                <span className="inline-block text-sm font-semibold text-[#17A2B8] uppercase tracking-wider mb-3">
                  {hero.heroTagline}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C3E50] mb-3 leading-tight">
                {hero.title || title}
              </h1>
              <p className="text-base sm:text-lg text-gray-700 max-w-3xl leading-relaxed">
                {hero.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Industry Overview</h2>
              {overview.map((paragraph, idx) => (
                <p key={idx} className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Applications</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {applicationsSectionSubtitle}
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {applications.map((app, idx) => {
              const IconComponent = iconMap[app.icon || ''] || Factory;
              return (
                <Reveal key={idx} direction="up" delay={idx * 0.1}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={app.image}
                        alt={app.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        quality={85}
                      />
                    </div>
                    <div className="p-8">
                      <div className="w-14 h-14 rounded-full bg-[#17A2B8]/10 flex items-center justify-center mb-6">
                        <IconComponent className="w-7 h-7 text-[#17A2B8]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{app.title}</h3>
                      <p className="text-gray-600">{app.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Market Segments Section */}
      {segmentsSectionImage ? (
        <section className="py-20 bg-[#F0F4F8] border-y border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Content Cards */}
              <div className="lg:col-span-6 space-y-6">
                <Reveal direction="up">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17A2B8]/10 text-[#0D5C75] text-xs font-semibold uppercase tracking-wider mb-3">
                      {isMetalworking ? 'Fluid Technology' : isElectroplating ? 'Surface Finishing' : isSurfaceTreatment ? 'Process Technologies' : 'Segment Coverage'}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#2D3748] tracking-tight mb-3">
                      {segmentsSectionTitle}
                    </h2>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                      {segmentsSectionSubtitle}
                    </p>
                  </div>
                </Reveal>

                <div className="space-y-4 pt-1">
                  {segments.map((segment, idx) => {
                    const IconComponent = iconMap[segment.icon || ''] || (isMetalworking ? (idx === 0 ? Droplets : idx === 1 ? Layers : ShieldCheck) : isElectroplating ? (idx === 0 ? Layers : idx === 1 ? Sparkles : Zap) : isSurfaceTreatment ? (idx === 0 ? Layers : idx === 1 ? Droplets : Sparkles) : (idx === 0 ? Car : idx === 1 ? Wrench : Truck));
                    return (
                      <Reveal key={idx} direction="up" delay={idx * 0.1}>
                        <div className="group relative bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 hover:border-[#17A2B8]/50 hover:-translate-y-0.5">
                          <div className="flex items-start gap-4 sm:gap-5">
                            <div className="w-12 h-12 rounded-xl bg-[#F0F4F8] text-[#17A2B8] flex items-center justify-center shrink-0 group-hover:bg-[#17A2B8] group-hover:text-white transition-colors duration-300 shadow-inner">
                              <IconComponent className="w-6 h-6 transition-transform group-hover:scale-110" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1.5">
                                <h3 className="text-lg sm:text-xl font-bold text-[#2D3748] group-hover:text-[#0D5C75] transition-colors">
                                  {segment.name}
                                </h3>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#17A2B8] group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                              </div>
                              <p className="text-slate-600 text-sm leading-relaxed">
                                {segment.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Visual Composite Video / Animated GIF Feed */}
              <div className="lg:col-span-6">
                <Reveal direction="left" delay={0.2}>
                  <div 
                    className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group select-none"
                    style={{ aspectRatio: '4 / 3.5' }}
                  >


                    <button
                      type="button"
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      aria-label={isVideoPlaying ? 'Pause Facility Simulation' : 'Play Facility Simulation'}
                      className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-slate-900/85 hover:bg-slate-900 text-white backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-md hover:scale-105 transition-all text-xs font-medium cursor-pointer"
                    >
                      {isVideoPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-teal-400 fill-teal-400" />
                          <span>Pause Loop</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-teal-400 fill-teal-400" />
                          <span>Play Video</span>
                        </>
                      )}
                    </button>

                    {/* Animated Video / Motion Container */}
                    <motion.div
                      className="relative w-full h-full"
                      style={{ willChange: 'transform' }}
                      animate={isVideoPlaying ? {
                        scale: [1, 1.035, 1],
                        x: [0, -2, 0],
                        y: [0, 1.5, 0]
                      } : { scale: 1, x: 0, y: 0 }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Image
                        src={
                          isVideoPlaying
                            ? (segmentsSectionAnimatedImage ||
                               (isMetalworking
                                 ? '/metalworking-solutions-animated.webp'
                                 : isElectroplating
                                 ? '/plating-solutions-animated.webp'
                                 : isSurfaceTreatment
                                 ? '/treatment-technologies-animated.webp'
                                 : '/market-segments-automotive-animated.webp'))
                            : (segmentsSectionImage ||
                               (isMetalworking
                                 ? '/metalworking-solutions.webp'
                                 : isElectroplating
                                 ? '/plating-solutions.webp'
                                 : isSurfaceTreatment
                                 ? '/treatment-technologies.webp'
                                 : '/market-segments-automotive.webp'))
                        }
                        alt={
                          isMetalworking
                            ? 'Metalworking Fluid Precision Machining Solutions'
                            : isElectroplating
                            ? 'Electroplating and Brightener Chemical Solutions'
                            : isSurfaceTreatment
                            ? 'Surface Treatment and Pre-Treatment Technology'
                            : 'Automotive & Industrial Ecosystem'
                        }
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        loading="lazy"
                        unoptimized={isVideoPlaying}
                        quality={90}
                      />
                    </motion.div>

                    {/* Ambient Lighting Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-75 group-hover:opacity-60 transition-opacity pointer-events-none" />
                    
                    {/* Bottom Status Tag */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-white/80 shadow-lg flex items-center justify-between z-10 pointer-events-none">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#17A2B8] flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${isVideoPlaying ? 'bg-[#17A2B8] animate-pulse' : 'bg-slate-400'}`} />
                          {isMetalworking
                            ? 'Live Coolant & Machining Simulation'
                            : isElectroplating
                            ? 'Live Electroplating Process Simulation'
                            : isSurfaceTreatment
                            ? 'Live Surface Pre-Treatment Simulation'
                            : 'Live Industrial Simulation'}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-[#2D3748]">
                          {isMetalworking
                            ? 'Soluble Oils • Semi-Synthetic • Synthetic Fluids'
                            : isElectroplating
                            ? 'Nickel Plating • Chrome Plating • Copper Plating'
                            : isSurfaceTreatment
                            ? 'Phosphate Conversion • Silane Pre-Treatment • Anodizing Solutions'
                            : 'OEM • Aftermarket • Heavy Equipment'}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-[#17A2B8]/10 text-[#17A2B8] flex items-center justify-center shrink-0">
                        <Video className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{segmentsSectionTitle}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {segmentsSectionSubtitle}
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {segments.map((segment, idx) => (
                <Reveal key={idx} direction="up" delay={idx * 0.1}>
                  <div className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={segment.image}
                        alt={segment.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"
                        quality={85}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{segment.name}</h3>
                      <p className="text-gray-600">{segment.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {productsSectionSubtitle}
              </p>
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto">
            {products.map((product, idx) => (
              <Reveal key={idx} direction="up" delay={idx * 0.1}>
                <div className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow mb-8">
                  <span className="text-sm font-semibold text-[#17A2B8] uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  {product.features && product.features.length > 0 && (
                    <ul className="space-y-3 mb-6">
                      {product.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#17A2B8] shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#17A2B8] hover:text-[#0D7A8C] transition-colors"
                  >
                    Learn More &rarr;
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{benefitsSectionTitle}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {benefitsSectionSubtitle}
              </p>
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => {
              // Check if benefit has format "Title: Description" (like in metalworking)
              const hasColon = benefit.includes(':');
              let displayTitle = benefit;
              let displayDesc = '';
              if (hasColon) {
                const parts = benefit.split(':');
                displayTitle = parts[0].trim();
                displayDesc = parts.slice(1).join(':').trim();
              }

              return (
                <Reveal key={idx} direction="up" delay={idx * 0.05}>
                  <div className="flex gap-4 items-start p-4 rounded-xl border border-gray-100 hover:border-[#17A2B8]/20 hover:bg-gray-50/50 transition-all">
                    <CheckCircle className="w-6 h-6 text-[#17A2B8] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-gray-900">{displayTitle}</h4>
                      {displayDesc && <p className="text-gray-600 mt-1 text-sm leading-relaxed">{displayDesc}</p>}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#17A2B8] to-[#0D7A8C] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Reveal direction="up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">{cta.title}</h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={cta.primaryButton.href}
                className="px-8 py-4 bg-white text-[#0D7A8C] font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
              >
                {cta.primaryButton.text}
              </Link>
              {cta.secondaryButton && (
                <Link
                  href={cta.secondaryButton.href}
                  className="px-8 py-4 border border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                >
                  {cta.secondaryButton.text}
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
