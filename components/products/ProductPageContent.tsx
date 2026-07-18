'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/animations/reveal';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  ArrowLeft, 
  Check, 
  Mail, 
  Phone, 
  ChevronLeft, 
  ChevronRight as ChevronRightIcon 
} from 'lucide-react';
import { Product } from '@/lib/content-utils';
import { QuoteModal } from '@/components/modals/quote-modal';

interface ProductPageContentProps {
  product: Product;
}

export function ProductPageContent({ product }: ProductPageContentProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'quote' | 'sample'>('quote');

  const {
    slug,
    name,
    category,
    tagline,
    description,
    features = [],
    specs = [],
    applications = [],
    industries = [],
    industriesDescription = '',
    calloutNote = '',
    ctas = [],
    images = { hero: null, product: null, gallery: [] },
    phoneNumber = '+919898123983',
    ctaSection = {
      heading: `Interested in ${product.name}?`,
      subtext: 'Contact our technical team for detailed specifications, pricing, and samples.'
    }
  } = product as any; // Cast as any to handle both rich and category structures seamlessly

  // Check if we should use the rich layout (like vamshield-90)
  const isRichLayout = slug === 'vamshield-90' || (images.gallery && images.gallery.length > 0);

  if (isRichLayout) {
    const gallery = images.gallery || [];
    const heroImage = images.hero || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80';

    const nextSlide = () => {
      if (gallery.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % gallery.length);
      }
    };

    const prevSlide = () => {
      if (gallery.length > 0) {
        setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
      }
    };

    return (
      <div>
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden bg-gray-900" style={{ marginTop: '108px' }}>
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt={name}
              fill
              className="object-cover object-center"
              priority
              quality={90}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/70" />
          </div>

          <div className="relative h-full flex items-center px-4">
            <div className="max-w-7xl mx-auto w-full">
              {/* Breadcrumbs inside Hero */}
              <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-medium font-sans mb-4">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRightIcon size={14} className="text-gray-400" />
                <Link href="/solutions" className="hover:text-white transition-colors">Products</Link>
                <ChevronRightIcon size={14} className="text-gray-400" />
                <span className="text-white font-semibold">{name}</span>
              </nav>

              <Link
                href="/industries"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Industries</span>
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="inline-block text-sm font-semibold text-[#17A2B8] uppercase tracking-wider mb-4">
                  {category}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {name}
                </h1>
                <p className="text-xl text-gray-200 max-w-3xl">
                  {tagline}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Description */}
              <Reveal direction="up">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Product Overview</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {description}
                  </p>
                  {product.descriptionExtended && (
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {product.descriptionExtended}
                    </p>
                  )}

                  {features && features.length > 0 && (
                    <>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Key Features</h3>
                      <ul className="space-y-3">
                        {features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#17A2B8]/10 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-4 h-4 text-[#17A2B8]" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* Image Gallery/Carousel */}
                  {gallery.length > 0 && (
                    <div className="mt-12">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Gallery</h3>
                      <div className="relative h-80 rounded-2xl overflow-hidden border border-gray-200 group bg-gray-50 shadow-sm">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={gallery[currentSlide].src}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full p-4 flex items-center justify-center"
                          >
                            <Image
                              src={gallery[currentSlide].src}
                              alt={gallery[currentSlide].alt}
                              fill
                              className="object-contain p-4"
                            />
                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                              {gallery[currentSlide].title || `Image ${currentSlide + 1}`}
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        {/* Slide Navigation */}
                        {gallery.length > 1 && (
                          <>
                            <button
                              onClick={prevSlide}
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-700 hover:bg-white hover:scale-105 transition-all"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              onClick={nextSlide}
                              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-700 hover:bg-white hover:scale-105 transition-all"
                            >
                              <ChevronRightIcon className="w-5 h-5" />
                            </button>

                            <div className="absolute bottom-4 right-4 flex gap-1.5">
                              {gallery.map((_: any, idx: number) => (
                                <button
                                  key={idx}
                                  onClick={() => setCurrentSlide(idx)}
                                  className={`w-2 h-2 rounded-full transition-all ${
                                    idx === currentSlide ? 'bg-[#17A2B8] w-4' : 'bg-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>

              {/* Right Column - Specifications */}
              <Reveal direction="up" delay={0.2}>
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-150 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 ease-in-out">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-150">Technical Specifications</h3>
                  
                  <div className="space-y-4">
                    {specs.map((spec: any, idx: number) => (
                      <div key={idx} className={`pb-3 flex justify-between items-center ${idx < specs.length - 1 ? 'border-b border-gray-150' : ''}`}>
                        <span className="text-sm font-semibold text-gray-500">{spec.label}</span>
                        <span className="text-base font-bold text-gray-900 text-right max-w-[60%]">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {product.packaging && product.packaging.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-150">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Available Packaging</h4>
                      <div className="flex flex-wrap gap-3">
                        {product.packaging.map((size: string) => (
                          <span
                            key={size}
                            className="px-4 py-2 bg-white border border-[#17A2B8] text-[#17A2B8] rounded-xl font-semibold hover:bg-[#17A2B8]/5 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        {applications.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal direction="up">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Applications</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {applications.map((app: any, idx: number) => {
                    const appImage = app.image || 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80';
                    return (
                      <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={appImage}
                            alt={app.title || app}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{app.title || app}</h3>
                          {app.description && <p className="text-gray-600">{app.description}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </section>
        )}

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
              {ctaSection.heading}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-white/90 mb-8"
            >
              {ctaSection.subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <button
                  onClick={() => { setModalMode('quote'); setIsModalOpen(true); }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#17A2B8] font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-md w-full min-h-[48px]"
                >
                  <Mail className="w-5 h-5" />
                  Request a Quote
                </button>
              </motion.div>

              <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <button
                  onClick={() => { setModalMode('sample'); setIsModalOpen(true); }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E6F7FA]/10 border border-[#D1F2F7]/40 text-white font-bold rounded-xl hover:bg-[#E6F7FA]/20 transition-all duration-300 w-full min-h-[48px]"
                >
                  <Check className="w-5 h-5" />
                  Request a Sample
                </button>
              </motion.div>

              <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  href={`/resources/downloads?product=${slug}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 w-full min-h-[48px]"
                >
                  <FileText className="w-5 h-5" />
                  Technical Datasheet
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // Category Layout
  return (
    <div className="pt-20 sm:pt-24 bg-[#F8FAFB] min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium font-sans">
          <Link href="/" className="hover:text-[#17A2B8] transition-colors">Home</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-400">Products</span>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-[#2C3E50] truncate font-semibold">{name}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] text-xs font-bold text-[#17A2B8] mb-4 uppercase tracking-wider font-sans">
            {category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C3E50] mb-6 leading-tight tracking-tight">
            {tagline}
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed mb-8 max-w-3xl">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => { setModalMode('quote'); setIsModalOpen(true); }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#17A2B8] hover:bg-[#0D7A8C] text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] min-h-[48px] text-sm"
            >
              Request a Quote <ArrowRight size={16} />
            </button>

            <button
              onClick={() => { setModalMode('sample'); setIsModalOpen(true); }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E6F7FA] border border-[#D1F2F7] text-[#17A2B8] hover:bg-[#D1F2F7]/50 font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] min-h-[48px] text-sm"
            >
              Request a Sample
            </button>

            <Link
              href={`/resources/downloads?product=${slug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-300 text-[#2C3E50] hover:text-[#17A2B8] hover:border-[#17A2B8] font-bold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] min-h-[48px] text-sm"
            >
              <FileText size={18} /> Technical Datasheet
            </Link>
          </div>
        </div>
      </section>

      {/* Main Specs & Applications */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Specifications */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-150 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 ease-in-out h-fit">
            <h2 className="text-xl sm:text-2xl font-bold text-[#2C3E50] mb-6 border-b border-gray-100 pb-4">
              Technical Specifications
            </h2>
            <div className="space-y-4">
              {specs.map((spec: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#17A2B8] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-[#4A5568] leading-relaxed font-sans">
                    <strong className="text-[#2C3E50] font-bold">{spec.label}:</strong> {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications & Industries */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-150 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 ease-in-out flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2C3E50] mb-6 border-b border-gray-100 pb-4">
                Key Applications
              </h2>
              <div className="grid sm:grid-cols-2 gap-3.5 mb-6">
                {applications.map((app: string) => (
                  <div key={app} className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#F8FAFB] border border-gray-150">
                    <span className="w-2 h-2 rounded-full bg-[#17A2B8] shrink-0" />
                    <span className="text-sm font-bold text-[#2C3E50] leading-none">{app}</span>
                  </div>
                ))}
              </div>

              {industriesDescription && (
                <>
                  <h2 className="text-xl font-bold text-[#2C3E50] mb-4">
                    Target Industries Served
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans mb-4">
                    {industriesDescription}
                  </p>
                </>
              )}
            </div>
            
            {calloutNote && (
              <div className="p-4 bg-[#E6F7FA] border border-[#D1F2F7] rounded-xl text-xs sm:text-sm text-[#4A5568] leading-relaxed mt-6">
                {calloutNote}
              </div>
            )}
          </div>
        </div>
      </section>
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefilledProducts={[name]}
        mode={modalMode}
      />
    </div>
  );
}
