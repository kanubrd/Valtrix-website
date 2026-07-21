'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/animations/reveal';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, ChevronLeft, ChevronRight, FlaskConical, ShieldCheck, RefreshCw, Sparkles } from 'lucide-react';
import { Section, SectionTitle } from '@/components/ui/section';
const iconMap: Record<string, React.ComponentType<any>> = {
  FlaskConical,
  ShieldCheck,
  RefreshCw,
  Sparkles
};

export function SolutionsContent({ solutionsData }: { solutionsData: any }) {
  const [selectedId, setSelectedId] = useState<string>('suscat-i');
  const [productSlideIndex, setProductSlideIndex] = useState(0);

  // Sync state with query parameters e.g. ?product=suscat-i
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryProduct = params.get('product');
      if (queryProduct && solutionsData.solutions.some((s: any) => s.id === queryProduct)) {
        setSelectedId(queryProduct);
        setProductSlideIndex(0);
      }
    }
  }, []);

  const activeSolution = solutionsData.solutions.find((s: any) => s.id === selectedId) || solutionsData.solutions[0];
  const activeSliderImages = activeSolution.sliderImages || [];
  
  const handleSelectProduct = (id: string) => {
    setSelectedId(id);
    setProductSlideIndex(0);
    
    // Smooth scroll to the details section on mobile
    if (window.innerWidth < 1024) {
      const detailsEl = document.getElementById('selected-product-details');
      if (detailsEl) {
        detailsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const nextSliderImage = () => {
    if (activeSliderImages.length > 0) {
      setProductSlideIndex((i) => (i + 1) % activeSliderImages.length);
    }
  };

  const prevSliderImage = () => {
    if (activeSliderImages.length > 0) {
      setProductSlideIndex((i) => (i - 1 + activeSliderImages.length) % activeSliderImages.length);
    }
  };

  return (
    <div className="pt-20 sm:pt-[92px]">
      {/* Top Banner Section */}
      <section className="bg-white py-12 border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold text-[#17A2B8] uppercase tracking-wider mb-4 bg-[#E6F7FA] border border-[#D1F2F7] px-4 py-1.5 rounded-full shadow-sm">
            OUR PRODUCT RANGE
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-3 leading-tight">
            One Platform. Every Material.{' '}
            <span className="text-[#17A2B8]">Full Visibility.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed max-w-2xl mx-auto font-medium">
            Explore advanced specialty chemical formulations and additive packages designed to optimize your manufacturing workflows. Click on a product card below to see detailed specifications, technical details, and applications.
          </p>
        </div>
      </section>

      {/* Main Catalog Section */}
      <Section id="solutions" className="py-16 sm:py-24 bg-[#F8FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Product Cards List */}
            <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4 overflow-x-auto lg:overflow-x-visible lg:max-h-[750px] lg:overflow-y-auto pr-1 pb-4 lg:pb-0 scrollbar-thin">
              {solutionsData.solutions.map((product: any) => {
                const isActive = product.id === selectedId;
                const IconComponent = iconMap[product.icon] || FlaskConical;
                return (
                  <motion.button
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-start text-left gap-4 p-4 rounded-xl border transition-all duration-300 w-[280px] sm:w-[320px] lg:w-full shrink-0 ${
                      isActive
                        ? 'bg-white border-[#17A2B8] shadow-md ring-1 ring-[#17A2B8]/10'
                        : 'bg-white hover:bg-gray-50 border-gray-150 shadow-sm'
                    }`}
                  >
                    {/* Icon Column */}
                    <div className={`p-3 rounded-lg ${isActive ? 'bg-[#17A2B8] text-white' : 'bg-gray-50 text-[#17A2B8]'}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Text Column */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#2C3E50] text-base mb-1 truncate">{product.title}</h3>
                      <p className="text-[#6B7280] text-xs leading-normal line-clamp-2">{product.description}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Right Column: Selected Product Details */}
            <AnimatePresence mode="wait">
              {activeSolution && (
                <motion.div
                  key={activeSolution.id}
                  id="selected-product-details"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 bg-white rounded-2xl border border-gray-150 shadow-md p-6 sm:p-8 lg:p-10 w-full"
                >
                  <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    
                    {/* Inner Left: Details */}
                    <div className="flex-1">
                      {/* Product Header */}
                      <div className="flex items-center gap-3.5 mb-6">
                        <div className="p-3 bg-[#E6F7FA] text-[#17A2B8] rounded-xl">
                          {(() => {
                            const IconComponent = iconMap[activeSolution.icon] || FlaskConical;
                            return <IconComponent className="w-7 h-7" />;
                          })()}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#17A2B8] uppercase tracking-wider">Product details</span>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C3E50]">{activeSolution.title}</h2>
                        </div>
                      </div>

                      {/* Photo Slider */}
                      <div className="relative aspect-[16/10] bg-gray-50 rounded-2xl border border-gray-150 overflow-hidden mb-8 shadow-sm group">
                        {activeSliderImages.length > 0 ? (
                          <div className="relative w-full h-full flex items-center justify-center p-4">
                            <Image
                              src={activeSliderImages[productSlideIndex].src}
                              alt={activeSliderImages[productSlideIndex].alt}
                              fill
                              className={`object-contain ${
                                activeSolution.id === 'vamshield-90' && productSlideIndex === 0 ? 'p-1' : 'p-2'
                              }`}
                              priority
                              quality={90}
                            />
                            
                            {/* Slide Nav buttons */}
                            {activeSliderImages.length > 1 && (
                              <>
                                <button
                                  onClick={prevSliderImage}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-700 hover:bg-white hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 duration-200"
                                >
                                  <ChevronLeft size={18} />
                                </button>
                                <button
                                  onClick={nextSliderImage}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-700 hover:bg-white hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 duration-200"
                                >
                                  <ChevronRight size={18} />
                                </button>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-150">
                            <span className="text-gray-400 text-sm font-semibold">No Image Available</span>
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
                          <span className="text-xs font-semibold text-gray-700 uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md inline-block">
                            Product Photo {activeSliderImages.length > 1 && `${productSlideIndex + 1}/${activeSliderImages.length}`}
                          </span>
                        </div>
                      </div>

                      {/* Overview */}
                      <p className="text-[#6B7280] text-sm sm:text-base leading-relaxed mb-6">
                        {activeSolution.details.overview}
                      </p>

                      {/* Key Features */}
                      <div className="mb-8">
                        <p className="text-xs font-semibold text-[#2C3E50] uppercase tracking-wider mb-4">Key Features</p>
                        <div className="space-y-3">
                          {activeSolution.features.map((f: string) => (
                            <div key={f} className="flex items-start gap-3">
                              <CheckCircle size={16} className="text-[#17A2B8] shrink-0 mt-0.5" />
                              <span className="text-sm text-[#2C3E50] leading-relaxed">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Specifications */}
                      <div className="mb-8">
                        <p className="text-xs font-semibold text-[#17A2B8] uppercase tracking-wider mb-4">Specifications</p>
                        <div className="grid gap-2.5">
                          {activeSolution.details.specs.map((spec: any, idx: number) => (
                            <div key={idx} className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-[#F8FAFB] border border-gray-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#17A2B8] shrink-0 mt-1.5" />
                              <span className="text-sm text-[#2C3E50] leading-relaxed">
                                <strong>{spec.label}:</strong> {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Applications */}
                      <div className="mb-8">
                        <p className="text-xs font-semibold text-[#17A2B8] uppercase tracking-wider mb-3">Applications</p>
                        <div className="flex flex-wrap gap-2">
                          {activeSolution.details.applications.map((app: string) => (
                            <span key={app} className="px-3 py-1.5 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] text-xs font-medium text-[#2C3E50]">
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
                        <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#17A2B8] text-white text-sm font-semibold shadow-sm hover:shadow min-h-[48px]" style={{ borderRadius: '12px' }}>
                          Contact Us <ArrowRight size={16} />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* Results */}
      <Section className="bg-white">
        <SectionTitle 
          subtitle={solutionsData.results.sectionTitle.subtitle} 
          title={solutionsData.results.sectionTitle.title} 
          description={solutionsData.results.sectionTitle.description} 
        />
        <div className="mt-8 sm:mt-12 space-y-4 max-w-3xl mx-auto">
          {solutionsData.results.items.map((item: any, idx: number) => (
             <Reveal key={item.benefit} delay={idx * 0.1} direction="left">
               <motion.div whileHover={{ x: 6 }} className="flex gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl border border-gray-150 hover:border-[#D1F2F7] hover:shadow transition-all">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#E6F7FA] rounded-xl shrink-0">
                   <span className="text-[#17A2B8] font-bold text-base sm:text-lg">{idx + 1}</span>
                 </div>
                 <div>
                   <h3 className="font-bold text-[#2C3E50] mb-1 text-sm sm:text-base">{item.benefit}</h3>
                   <p className="text-[#6B7280] text-sm">{item.description}</p>
                 </div>
               </motion.div>
             </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-[#2C3E50] text-white text-center py-12 sm:py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">Get Started With a No-Commitment Sourcing Request</h2>
        <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Tell us what you need. We&apos;ll show you what we can source, at what price, and how fast — before you commit to anything.
        </p>
         <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
           <Link href="/contact" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#17A2B8] text-white font-semibold shadow-md min-h-[48px]" style={{ borderRadius: '12px' }}>
             Contact Us <ArrowRight size={18} />
           </Link>
         </motion.div>
      </Section>
    </div>
  );
}
