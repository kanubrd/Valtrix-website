'use client';

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
  ChevronRight
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
  Droplet
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
    products,
    productsSectionSubtitle = 'Professional-grade chemistry',
    benefits,
    benefitsSectionTitle = 'Key Benefits',
    benefitsSectionSubtitle = 'Our solutions deliver proven performance improvements',
    cta
  } = industry;

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
