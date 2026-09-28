'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/animations/reveal';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  CheckCircle2,
  ChevronLeft, 
  ChevronRight, 
  FlaskConical, 
  ShieldCheck, 
  RefreshCw, 
  Sparkles,
  Settings,
  Layers,
  Zap,
  HelpCircle,
  Activity,
  Award,
  Building2,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { Section, SectionTitle } from '@/components/ui/section';

const iconMap: Record<string, React.ComponentType<any>> = {
  FlaskConical,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Settings,
  Layers
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
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const detailsEl = document.getElementById('selected-product-details');
      if (detailsEl) {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(detailsEl, { offset: -80 });
        } else {
          detailsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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
      
      {/* Hero / Header Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-12 lg:py-16 relative overflow-hidden border-b border-slate-700">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#17A2B8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
            Specialty Chemical Solutions
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            High-performance chemical formulations and advanced materials engineered for industrial protection, chemical stability, and operational excellence.
          </p>
        </div>
      </section>

      {/* Featured Banner: Technical Additive Packages & Formulations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="rounded-2xl bg-white border border-[#17A2B8]/30 p-5 sm:p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="p-3 rounded-xl bg-[#17A2B8]/10 text-[#17A2B8] shrink-0">
              <Sparkles className="h-6 w-6" />
            </span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#17A2B8]">Technical Authority Guide</div>
              <h2 className="text-base sm:text-lg font-bold text-[#2C3E50]">
                Looking for Industrial Additives &amp; ASTM-Benchmarked Formulations?
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Explore our full engineering breakdown across Automotive, Metalworking, Electroplating, and Surface Treatment.
              </p>
            </div>
          </div>
          <Link
            href="/industrial-additives"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#17A2B8] text-white text-xs sm:text-sm font-bold hover:bg-[#138496] transition-all shadow-sm hover:shadow"
          >
            Explore Technical Guide <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Specialty Solutions Interactive Product Catalog */}
      <Section id="solutions-catalog" className="py-16 sm:py-24 bg-[#F8FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-semibold text-[#17A2B8] uppercase tracking-wider mb-3 bg-[#E6F7FA] border border-[#D1F2F7] px-4 py-1.5 rounded-full shadow-sm">
              SPECIALTY CHEMICAL CATALOG
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-3">
              Formulated for Material Protection &amp; Performance
            </h2>
            <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
              Select a specialized formulation below to inspect detailed chemical specifications, protective features, and industrial applications.
            </p>
          </div>

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
                    <div className={`p-3 rounded-lg ${isActive ? 'bg-[#17A2B8] text-white' : 'bg-gray-50 text-[#17A2B8]'}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

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
                          <span className="text-[10px] font-bold text-[#17A2B8] uppercase tracking-wider">Product details &amp; specs</span>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2C3E50]">{activeSolution.title}</h3>
                        </div>
                      </div>

                      {/* Photo Slider with SEO Descriptive Alt Texts */}
                      <div className="relative aspect-[16/10] bg-gray-50 rounded-2xl border border-gray-150 overflow-hidden mb-8 shadow-sm group">
                        {activeSliderImages.length > 0 ? (
                          <div className="relative w-full h-full flex items-center justify-center p-4">
                            <Image
                              src={activeSliderImages[productSlideIndex].src}
                              alt={activeSliderImages[productSlideIndex].alt || `${activeSolution.title} - High-Performance Industrial Chemical Additive by Valtrix Vadodara`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
                              className={`object-contain ${
                                activeSolution.id === 'vamshield-90' && productSlideIndex === 0 ? 'p-1' : 'p-2'
                              }`}
                              priority
                              quality={90}
                            />
                            
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
                        <Link href="/contact" className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#17A2B8] hover:bg-[#0D7A8C] text-white text-sm font-bold shadow-md hover:shadow-lg min-h-[48px] transition-all duration-300" style={{ borderRadius: '12px' }}>
                          <span>Request a Quote Now</span>
                          <ArrowRight size={16} />
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

      {/* NEW CONSOLIDATED SECTION: Custom Industrial Additives & Material Protection */}
      <section id="custom-industrial-additives" className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E6F7FA] text-[#17A2B8] border border-[#D1F2F7] mb-3">
              <Zap size={14} /> Custom Formulations &amp; Substrate Protection
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Custom Industrial Additives &amp; Material Protection
            </h2>
            <p className="text-slate-600 text-base leading-relaxed font-medium">
              Engineered &amp; Synthesized in Vadodara, Gujarat under ISO 9001:2024 quality controls. Valtrix custom additive formulations deliver robust corrosion resistance, eliminate sludge formation, and guarantee up to 45% annual downtime reduction across heavy industrial manufacturing.
            </p>
          </div>

          {/* Solution & Product Benefits Bullet Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            
            {/* 1. Industrial Additives */}
            <div className="bg-[#F8FAFB] p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#17A2B8]/40 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E6F7FA] text-[#17A2B8] flex items-center justify-center font-bold mb-4">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Industrial Additives</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Prevent varnish &amp; oxidation sludge, reduce unexpected downtime up to 45%, and improve fluid efficiency.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 pt-4 border-t border-slate-200">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#17A2B8]" /> 65% Oxidation Sludge Prevention</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#17A2B8]" /> ISO 4406 Cleanliness Line Protection</li>
              </ul>
            </div>

            {/* 2. CNC Lubricants */}
            <div className="bg-[#F8FAFB] p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#17A2B8]/40 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E6F7FA] text-[#17A2B8] flex items-center justify-center font-bold mb-4">
                  <Settings size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">CNC Lubricants</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Protect heavy gearboxes under peak torque and extend fluid drain intervals by 3.0x.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 pt-4 border-t border-slate-200">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#17A2B8]" /> 40% Component Wear Scar Reduction</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#17A2B8]" /> Extreme Pressure (EP) Chelate Shield</li>
              </ul>
            </div>

            {/* 3. Bio-Stable Coolants */}
            <div className="bg-[#F8FAFB] p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#17A2B8]/40 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E6F7FA] text-[#17A2B8] flex items-center justify-center font-bold mb-4">
                  <FlaskConical size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Bio-Stable Coolants</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Extend coolant sump life by 3.5x, improve cutting tool lifespan, and eliminate foul odors.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 pt-4 border-t border-slate-200">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#17A2B8]" /> 48% Extended Cutting Tool Lifespan</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#17A2B8]" /> Formaldehyde-Free Eco Chemistry</li>
              </ul>
            </div>

            {/* 4. Electroplating Solutions */}
            <div className="bg-[#F8FAFB] p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#17A2B8]/40 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E6F7FA] text-[#17A2B8] flex items-center justify-center font-bold mb-4">
                  <Layers size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Electroplating Solutions</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Ensure uniform deposition thickness (±0.5 µm) and reduce bath drag-out chemical waste by 35%.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 pt-4 border-t border-slate-200">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#17A2B8]" /> 94% Cathode Current Efficiency</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#17A2B8]" /> Zero Hydrogen Embrittlement</li>
              </ul>
            </div>

            {/* 5. Surface Treatments */}
            <div className="bg-[#F8FAFB] p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-[#17A2B8]/40 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E6F7FA] text-[#17A2B8] flex items-center justify-center font-bold mb-4">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Surface Treatments</h3>
                <p className="text-slate-600 text-sm mb-4">
                  Deliver 300% ASTM B117 salt-spray corrosion resistance with eco-friendly passivation chemistry.
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-700 pt-4 border-t border-slate-200">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#17A2B8]" /> 1,500+ Hours Salt Spray Barrier</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-[#17A2B8]" /> Hexavalent Chromium-Free</li>
              </ul>
            </div>

            {/* 6. Featured Core Products */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#17A2B8]/20 text-[#17A2B8] flex items-center justify-center font-bold mb-4">
                  <Award size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Featured Core Products</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Proprietary industrial formulations engineered for severe duty environments:
                </p>
              </div>
              <ul className="space-y-2 text-xs font-semibold text-slate-200 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2"><span className="text-[#17A2B8] font-bold">•</span> Rust Converter VAM RC 01</li>
                <li className="flex items-center gap-2"><span className="text-[#17A2B8] font-bold">•</span> Polyurethane Building Blocks</li>
                <li className="flex items-center gap-2"><span className="text-[#17A2B8] font-bold">•</span> High Build Coatings</li>
              </ul>
            </div>

          </div>

          {/* Vadodara, Gujarat Location & Quality Callout */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-700 shadow-lg">
            <div>
              <div className="flex items-center gap-2 text-[#17A2B8] font-bold text-xs uppercase tracking-wider mb-2">
                <Building2 size={16} /> Regional R&amp;D &amp; Manufacturing Plant
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1">
                Engineered &amp; Synthesized in Vadodara, Gujarat
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                Valtrix Advance Material Pvt. Ltd. operates an ISO 9001:2024 certified plant in Vadodara, Gujarat delivering custom additive blending and material protection.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 px-6 py-3 bg-[#17A2B8] hover:bg-[#138496] text-white text-sm font-semibold rounded-xl transition-all duration-200"
            >
              Contact Vadodara Plant
            </Link>
          </div>

        </div>
      </section>



      {/* Proven Results Section */}
      <Section className="bg-white py-16 sm:py-24">
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

      {/* ── Engineering Procedure: HowTo Guide Section (AEO & Process SEO) ── */}
      <section id="conversion-procedure" className="py-16 sm:py-24 bg-[#F8FAFB] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E6F7FA] text-[#17A2B8] border border-[#D1F2F7] mb-3">
              <Sparkles size={14} /> Standard Operating Procedure (SOP)
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              How to Convert CNC Machine Sumps to VAM-CoolSyn™ Biostable Fluids
            </h2>
            <p className="text-slate-600 text-base leading-relaxed font-medium">
              A 5-step engineering conversion protocol validated by Valtrix field chemists to prevent bacterial shock, eliminate foaming, and maximize tool life during fluid changeovers.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Steps Column */}
            <div className="lg:col-span-8 space-y-4">
              {[
                {
                  step: 1,
                  title: 'In-System Cleaner & Biocide Pre-Treatment',
                  desc: 'Add 1% to 2% VAM System Cleaner concentrate directly to the depleted coolant 8 hours prior to shutdown while running regular production to penetrate biofilm in coolant lines.',
                  tag: 'T - 8 Hours'
                },
                {
                  step: 2,
                  title: 'Mechanical Sump Drain & Tramp Oil Extraction',
                  desc: 'Completely pump out depleted fluid, vacuum settled swarf and metallic chips from the sump bottom, and skim all free tramp oil from hydraulic leaks.',
                  tag: 'Step 2'
                },
                {
                  step: 3,
                  title: 'Demineralized Water High-Pressure Rinse',
                  desc: 'Circulate a 1% light rinse batch through machine lines for 15 minutes to flush dislodged fungal particulates, then pump dry.',
                  tag: 'Step 3'
                },
                {
                  step: 4,
                  title: 'Fresh VAM-CoolSyn™ Charge & Refractometer Calibration',
                  desc: 'Charge the sump with fresh demineralized water and add VAM-CoolSyn™ concentrate to achieve an 8%–10% Brix refractometer reading (Brix factor 1.0).',
                  tag: 'Step 4'
                },
                {
                  step: 5,
                  title: '48-Hour Fluid Telemetry & pH Baseline Verification',
                  desc: 'Verify initial pH stabilizes at 9.2–9.4. Check tramp oil coalescer operation and record refractometer readings daily for continuous biostatic equilibrium.',
                  tag: 'Verification'
                }
              ].map((s) => (
                <div key={s.step} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F7FA] text-[#17A2B8] font-black text-base flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-base text-[#2C3E50]">{s.title}</h3>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 shrink-0">{s.tag}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Specs / Tool Sidebar */}
            <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-2xl border border-gray-200/80 shadow-xs">
              <h3 className="font-bold text-[#2C3E50] text-base mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-[#17A2B8]" /> Conversion Requirements
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-gray-600">
                <div>
                  <strong className="block text-[#2C3E50] mb-1">Tools Required:</strong>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Optical / Digital Brix Refractometer</li>
                    <li>Calibrated Digital pH Meter (pH 0–14)</li>
                    <li>Sump Vacuum Cleaner &amp; Sludge Pump</li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <strong className="block text-[#2C3E50] mb-1">Supplies Needed:</strong>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>VAM System Cleaner Concentrate</li>
                    <li>VAM-CoolSyn™ Biostable Coolant</li>
                    <li>Demineralized / RO Makeup Water (&lt;100 ppm hardness)</li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <strong className="block text-[#2C3E50] mb-1">Total Estimated Time:</strong>
                  <p>Approximately 4 hours per machine tool.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <Section className="bg-[#2C3E50] text-white text-center py-12 sm:py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
          Ready to Eliminate Machinery Downtime &amp; Optimize Chemistries?
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Consult directly with Valtrix chemical engineers in Vadodara, Gujarat for custom additive formulations, sample requests, and technical audits tailored to your plant.
        </p>
         <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
           <Link href="/contact" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#17A2B8] hover:bg-[#138496] text-white font-semibold shadow-md min-h-[48px]" style={{ borderRadius: '12px' }}>
             Contact Technical Engineering Team <ArrowRight size={18} />
           </Link>
         </motion.div>
      </Section>
    </div>
  );
}

