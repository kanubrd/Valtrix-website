'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Industry } from '@/lib/content-utils';

type IndustryListing = Pick<Industry, 'slug' | 'title' | 'tag' | 'description' | 'listingImage'>;

// Fallback data used when no industries are loaded from the CMS yet
const fallbackIndustries: IndustryListing[] = [
  {
    slug: 'automotive',
    title: 'Automotive & General Industries',
    tag: 'AUTOMOTIVE & INDUSTRIAL SOLUTIONS',
    description: 'Reliable specialty chemical solutions engineered for automotive manufacturing and diverse industrial applications.',
    listingImage: '/automotive-category.avif',
  },
  {
    slug: 'metalworking',
    title: 'Metal Working Fluids & Lubricants',
    tag: 'METALWORKING',
    description: 'High-performance lubricants and metalworking solutions designed to improve machining efficiency, reduce wear, and extend equipment life.',
    listingImage: '/metalworking-category.avif',
  },
  {
    slug: 'electroplating',
    title: 'Electroplating & Brighteners',
    tag: 'ELECTROPLATING',
    description: 'Advanced electroplating chemicals and brighteners that enhance coating quality, corrosion resistance, and surface appearance.',
    listingImage: '/electroplating-category.avif',
  },
  {
    slug: 'surface-treatment',
    title: 'Surface Treatment',
    tag: 'SURFACE TREATMENT',
    description: 'Specialized surface treatment technologies that improve adhesion, durability, and protection for industrial components.',
    listingImage: '/surface-treatment-category.avif',
  },
];

interface IndustriesContentProps {
  industries?: IndustryListing[];
}

export function IndustriesContent({ industries }: IndustriesContentProps) {
  const displayIndustries = industries && industries.length > 0 ? industries : fallbackIndustries;

  return (
    <div className="pt-20 sm:pt-[92px]">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden bg-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/industries-hero.jpeg"
            alt="Industries Banner"
            fill
            className="object-contain object-center"
            style={{ objectPosition: 'center 60%' }}
            priority
            quality={100}
            sizes="100vw"
          />
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* Text Section Below Image */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-xs font-semibold text-white bg-[#17A2B8] uppercase tracking-wider mb-4 px-4 py-1.5 rounded-full shadow-lg">
              OUR INDUSTRIES
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-3 leading-tight">
              Innovative Chemical Solutions
              <br />
              <span className="text-[#17A2B8]">for Diverse Industries</span>
            </h1>
            <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed font-medium">
              Delivering advanced solutions in metalworking, electroplating, surface treatment, 
              and automotive industries through sustainable chemistry.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Industries Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {displayIndustries.map((industry) => (
              <div key={industry.slug} className="relative h-[400px] rounded-[20px] overflow-hidden shadow-lg">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={industry.listingImage}
                    alt={industry.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    loading="lazy"
                    style={{ filter: 'brightness(1.15) contrast(1.05) saturate(1.1)' }}
                  />
                  {/* Light bottom gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end">
                  {/* Frosted text backdrop for readability */}
                  <div
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 60%, transparent 100%)',
                      backdropFilter: 'blur(2px)',
                      WebkitBackdropFilter: 'blur(2px)',
                      padding: '32px',
                      borderRadius: '0 0 20px 20px',
                    }}
                  >
                    <h3
                      className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight"
                      style={{
                        textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {industry.title}
                    </h3>
                    <p
                      className="text-base text-white leading-relaxed mb-4 font-medium"
                      style={{
                        textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                        lineHeight: '1.7',
                      }}
                    >
                      {industry.description}
                    </p>

                    {/* Arrow Icon - Clickable Link */}
                    <div className="flex items-center justify-end">
                      <Link
                        href={`/industries/${industry.slug}`}
                        className="w-12 h-12 rounded-full bg-[#17A2B8] flex items-center justify-center cursor-pointer hover:bg-[#0D7A8C] transition-colors"
                        aria-label={`View ${industry.title}`}
                      >
                        <ArrowRight className="w-6 h-6 text-white" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#17A2B8] to-[#0D7A8C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            Ready to Transform Your Industrial Processes?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-white/90 mb-8"
          >
            Connect with our technical experts to discover how our specialty chemical solutions can optimize your operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#17A2B8] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Contact Us
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300"
            >
              View Solutions
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
