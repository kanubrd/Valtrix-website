'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Target,
  Telescope,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Factory,
  Cpu,
  Layers,
  FlaskConical,
  Activity,
  Sparkles,
  Award,
  CircleHelp,
  MapPin,
  Phone,
  Mail,
  Clock,
  FileText
} from 'lucide-react';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { CertificationShowcase } from '@/components/sections/certification-showcase';

const telemetryStats = [
  {
    value: '$260,000',
    label: 'Avg. Hourly Downtime Loss',
    sub: 'In heavy discrete & automotive manufacturing',
    color: 'text-[#2C3E50]'
  },
  {
    value: '82%',
    label: 'Failures from Fluid Breakdown',
    sub: 'Thermal oxidation, micro-pitting, & sludge',
    color: 'text-[#2C3E50]'
  },
  {
    value: '42%',
    label: 'Downtime Reduction',
    sub: 'With Valtrix custom additive formulations',
    color: 'text-[#17A2B8]'
  },
  {
    value: '3.4x',
    label: 'Drain Interval Extension',
    sub: 'Validated in heavy CNC & gear assemblies',
    color: 'text-[#17A2B8]'
  }
];

export default function AboutContent() {
  const [showMission, setShowMission] = useState(true);
  const [showVision, setShowVision] = useState(true);

  return (
    <div className="pt-20 bg-[#FCFCFD] text-[#1A1A1A]">

      {/* ── Section 1: Hero & Corporate Narrative ── */}
      <section id="overview" className="bg-white py-14 sm:py-20 border-b border-gray-150">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-5">
              <Award className="w-4 h-4 text-[#17A2B8]" />
              <span className="text-xs font-bold text-[#2C3E50] uppercase tracking-wider">
                ISO 9001:2024 Certified • Vadodara, Gujarat
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2C3E50] mb-6 leading-[1.12] tracking-tight">
              Pioneering Advanced Industrial Additives &amp;{' '}
              <span className="text-[#17A2B8]">Specialty Chemical Science</span>
            </h1>
            <p className="text-base sm:text-xl text-[#6B7280] leading-relaxed">
              At <strong>Valtrix Advance Material Pvt. Ltd. (VAM)</strong>, we bridge the gap between microscopic molecular engineering and heavy industrial uptime. From our dedicated manufacturing and analytical facility in <strong>Vadodara, Gujarat</strong>, we develop next-generation additive packages that extend component life, eliminate machinery sludge, and drastically lower plant maintenance overhead.
            </p>
          </motion.div>

          {/* Technical Executive Summary Hook Card */}
          <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-[#E6F7FA]/70 via-slate-50 to-blue-50/40 border border-[#17A2B8]/30 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-[#17A2B8] font-bold text-xs uppercase tracking-widest mb-3">
              <Sparkles className="h-4 w-4" /> The Valtrix Engineering Thesis
            </div>
            <p className="text-base sm:text-lg text-[#2C3E50] font-medium leading-relaxed">
              Unplanned industrial downtime is rarely caused by mechanical design flaws—over 80% of premature machine failures stem from <strong>fluid degradation, thermal oxidation, and chemical collapse</strong> under intense shear. Valtrix engineers precision-tailored drop-in additive boosters, biostable metalworking coolants, and non-chromate surface treatments that keep global production lines operating with zero interruption.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Mission, Vision & Principles ── */}
      <section id="mission-vision" className="bg-[#F8FAFB] py-14 sm:py-20 border-b border-gray-150">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <SectionTitle
            subtitle="PURPOSE & DIRECTION"
            title="Our Mission & Strategic Vision"
            description="How materials science drives tangible operational gains for industrial manufacturers"
          />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-10">
            {/* Mission */}
            <Reveal direction="left">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200/80 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#E6F7FA] border border-[#D1F2F7] flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6 text-[#17A2B8]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#2C3E50]">Our Mission</h2>
                      <p className="text-xs text-gray-500 font-medium">Why we formulate every day</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowMission(!showMission)}
                    className="w-full flex items-center justify-between p-3.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors mb-4"
                  >
                    <span className="font-semibold text-xs sm:text-sm text-[#2C3E50]">Read Full Mission Statement</span>
                    <ChevronDown className={`w-4 h-4 text-[#17A2B8] transition-transform ${showMission ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showMission && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-[#4A5568] leading-relaxed p-4 border border-gray-150 rounded-xl bg-slate-50/50 mb-4">
                          To create innovative, high-performance materials and additive packages that dramatically enhance the operational life, thermal stability, and energy efficiency of industrial components. We strive to be the most trusted chemical partner for manufacturers seeking to eliminate unplanned breakdowns while upholding rigorous environmental standards.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2 text-xs text-[#2C3E50] font-semibold">
                  <span className="px-2.5 py-1 rounded-md bg-[#E6F7FA] text-[#17A2B8]">✓ Downtime Elimination</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#E6F7FA] text-[#17A2B8]">✓ Thermal Equilibrium</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#E6F7FA] text-[#17A2B8]">✓ Customer ROI</span>
                </div>
              </div>
            </Reveal>

            {/* Vision */}
            <Reveal direction="right">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200/80 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#E6F7FA] border border-[#D1F2F7] flex items-center justify-center shrink-0">
                      <Telescope className="w-6 h-6 text-[#17A2B8]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#2C3E50]">Our Vision</h2>
                      <p className="text-xs text-gray-500 font-medium">Where our technology leads the industry</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowVision(!showVision)}
                    className="w-full flex items-center justify-between p-3.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors mb-4"
                  >
                    <span className="font-semibold text-xs sm:text-sm text-[#2C3E50]">Explore Our Vision Statement</span>
                    <ChevronDown className={`w-4 h-4 text-[#17A2B8] transition-transform ${showVision ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showVision && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-[#4A5568] leading-relaxed p-4 border border-gray-150 rounded-xl bg-slate-50/50 mb-4">
                          To become India&apos;s foremost manufacturer and global exporter of advanced industrial additives and eco-compliant surface treatments. We envision manufacturing environments where non-toxic, biostatic, and non-chromate formulations completely replace hazardous legacy chemistry without sacrificing extreme-load performance.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2 text-xs text-[#2C3E50] font-semibold">
                  <span className="px-2.5 py-1 rounded-md bg-[#E6F7FA] text-[#17A2B8]">✓ Eco-Compliant Synthesis</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#E6F7FA] text-[#17A2B8]">✓ Global Export Scale</span>
                  <span className="px-2.5 py-1 rounded-md bg-[#E6F7FA] text-[#17A2B8]">✓ Make in India Excellence</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Core Values */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Lightbulb,
                title: 'Scientific Innovation',
                desc: 'Continuous synthesis of liquid MoDTC, organosilanes, and synthetic esters solving thermal breakdown at 800°C.',
                points: ['Custom Pilot Batch R&D', 'Novel Boundary Chemistry', 'Drop-in Miscibility']
              },
              {
                icon: ShieldCheck,
                title: 'Rigorous Quality (ISO 9001:2024)',
                desc: 'Multi-point verification using FT-IR, GC-MS, and ASTM Four-Ball rigs guarantees unyielding batch consistency.',
                points: ['Multi-Point QC Analytics', 'ASTM Standardized Rigs', 'Complete CoA Traceability']
              },
              {
                icon: Target,
                title: 'Responsible Stewardship',
                desc: 'Pioneering non-chromate passivates, zero-SVHC formulas, and biostatic coolants that safeguard machine operators.',
                points: ['RoHS 3 & REACH Compliant', '100% Sludge-Free Conversion', 'Operator Safe pH 9.0–9.4']
              }
            ].map((val, idx) => {
              const Icon = val.icon;
              return (
                <Reveal key={val.title} delay={idx * 0.1}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs h-full flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-[#E6F7FA] border border-[#D1F2F7] flex items-center justify-center mb-4 text-[#17A2B8]">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-[#2C3E50] mb-2">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-4">{val.desc}</p>
                    <ul className="mt-auto space-y-1.5 pt-3 border-t border-gray-100">
                      {val.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2 text-xs font-medium text-[#4A5568]">
                          <CheckCircle2 size={13} className="text-[#17A2B8] shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 3: "Our Advanced Solutions" (4 Additive Categories) ── */}
      <section id="advanced-solutions" className="bg-white py-14 sm:py-20 border-b border-gray-150">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#17A2B8] mb-2">
              <FlaskConical className="h-4 w-4" /> Core Chemical Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2C3E50] tracking-tight mb-4">
              Our Advanced Additive &amp; Chemical Formulations
            </h2>
            <p className="text-base text-[#6B7280] leading-relaxed">
              Industrial additives are the cornerstone of Valtrix&apos;s chemical innovation. We formulate proprietary additive packages engineered to solve distinct tribological and surface finishing challenges across heavy manufacturing.
            </p>
          </div>

          <div className="space-y-12">
            {/* Category 1: Automotive & Drivetrains */}
            <div className="bg-[#F8FAFB] border border-gray-200/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
                    <Factory className="h-4 w-4" /> Automotive &amp; Drivetrains
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#2C3E50] mb-3">
                    1. Powertrain &amp; Heavy-Duty Lubricant Additives
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                    Generic lubricants shear under continuous heavy torque, causing boundary layer failure, planetary gear micro-spalling, and extreme heat. Valtrix formulates concentrated additive boosters featuring liquid-soluble molybdenum dithiocarbamate (MoDTC) that chemically bond to metal surfaces, producing a durable, self-healing tribofilm.
                  </p>

                  <div className="bg-white border-l-4 border-[#17A2B8] p-5 rounded-r-xl mb-6 shadow-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C3E50] mb-3">
                      Technical Specifications &amp; Validated Performance:
                    </h4>
                    <ul className="text-xs sm:text-sm text-[#374151] space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Boundary Friction Coefficient (&mu;):</strong> Reduced down to <strong>0.04</strong> (vs. 0.12–0.15 in commodity oils).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Anti-Wear Chemistry:</strong> Liquid-soluble MoDTC paired with low-activation synthetic ester polymers to replace rapidly shearing ZDDP.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Wear Protection:</strong> <strong>38% documented reduction in gear tooth micro-spalling</strong> over 1,000-hour dynamometer runs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Extreme Pressure Standard:</strong> <strong>ASTM D2783</strong> Four-Ball Weld Load &gt;400 kgf; steady-state wear scar &lt;0.45 mm (<strong>ASTM D4172</strong>).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Drop-in Miscibility:</strong> 100% compatible with API Group I, II, III, and synthetic PAO base stocks.</span>
                      </li>
                    </ul>
                  </div>

                  <Link href="/solutions" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#17A2B8] hover:underline">
                    View Automotive Additives in Solutions Catalog <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="lg:col-span-4">
                  <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <Image
                      src="/automotive-manufacturing.webp"
                      alt="Valtrix Automotive Powertrain Additives and Anti-Wear Tribofilms"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 35vw"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Category 2: Metal Working Fluids */}
            <div className="bg-[#F8FAFB] border border-gray-200/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
                    <Cpu className="h-4 w-4" /> CNC Machining &amp; Milling
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#2C3E50] mb-3">
                    2. Metal Working Fluids: Biostable Coolants &amp; CNC Concentrates
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                    High-speed cutting of aerospace titanium, Inconel, and stainless steel generates localized cut-interface heat exceeding 800°C. Conventional soluble oils vaporize, triggering thermal insert shock, micro-cracking, and bacterial rancidity. Valtrix <strong>VAM-CoolSyn™</strong> synthetic fluids penetrate the vapor barrier directly at the cut edge.
                  </p>

                  <div className="bg-white border-l-4 border-[#17A2B8] p-5 rounded-r-xl mb-6 shadow-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C3E50] mb-3">
                      Technical Specifications &amp; Validated Performance:
                    </h4>
                    <ul className="text-xs sm:text-sm text-[#374151] space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Thermal Boundary Stability:</strong> High-lubricity cutting performance maintained past <strong>800°C</strong> localized heat.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Tool Life Extension:</strong> Up to <strong>57% increase in carbide insert lifespan</strong>, reducing tooling changeover cycles.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Biostatic Sump Control:</strong> Stable alkaline <strong>pH 9.0–9.4</strong> deprives anaerobic bacteria without toxic biocides.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Corrosion Benchmark:</strong> Zero flash rusting on cast iron verified under <strong>ASTM D665</strong> (synthetic seawater).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Operator Safety:</strong> Free of short-chain chlorinated paraffins (SCCPs); compliant with <strong>OSHA &amp; EU-REACH</strong>.</span>
                      </li>
                    </ul>
                  </div>

                  <Link href="/solutions" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#17A2B8] hover:underline">
                    Explore VAM-CoolSyn™ Coolants in Catalog <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="lg:col-span-4">
                  <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <Image
                      src="/cutting-machining.webp"
                      alt="Valtrix CNC Coolant Testing and Biostable Metalworking Fluids"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 35vw"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Category 3: Electroplating & Brighteners */}
            <div className="bg-[#F8FAFB] border border-gray-200/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
                    <Layers className="h-4 w-4" /> Surface Finishing &amp; Electroplating
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#2C3E50] mb-3">
                    3. Electroplating Brighteners &amp; Leveling Systems
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                    Current density gradients across complex part geometries cause rough nodules, edge burn, and micro-porosity. Degraded brighteners also induce hydrogen embrittlement in high-strength fasteners. Valtrix <strong>VAM-PlateBright™</strong> additives regulate cathode polarization, driving metal ions into microscopic recesses for a mirror-bright, ductile crystalline finish.
                  </p>

                  <div className="bg-white border-l-4 border-[#17A2B8] p-5 rounded-r-xl mb-6 shadow-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C3E50] mb-3">
                      Technical Specifications &amp; Validated Performance:
                    </h4>
                    <ul className="text-xs sm:text-sm text-[#374151] space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Reject Reduction:</strong> Documented <strong>45% reduction in electroplating defect reject rates</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Replenishment Savings:</strong> <strong>28% reduction in chemical bath top-up volume</strong> due to stable polymeric carriers.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Ductile Nanocrystalline Matrix:</strong> Eliminates micro-voids and eliminates <strong>hydrogen embrittlement</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Chemistries Supported:</strong> Acid zinc, alkaline non-cyanide zinc, bright nickel, and hard chromium baths.</span>
                      </li>
                    </ul>
                  </div>

                  <Link href="/solutions" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#17A2B8] hover:underline">
                    View VAM-PlateBright™ in Solutions Catalog <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="lg:col-span-4">
                  <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <Image
                      src="/nickel-plating.webp"
                      alt="Valtrix Electroplating Leveling Agents and Mirror Finish Brighteners"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 35vw"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Category 4: Surface Treatment & Passivation */}
            <div className="bg-[#F8FAFB] border border-gray-200/80 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
                    <FlaskConical className="h-4 w-4" /> Surface Modification &amp; Passivation
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#2C3E50] mb-3">
                    4. Surface Treatment: Non-Chromate Chemical Conversion Passivates
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                    Outdated zinc and iron phosphating produces heavy-metal toxic sludge and consumes substantial heating energy. Valtrix <strong>VAM-PassShield™</strong> conversion chemistry uses organofunctional silanes and nano-zirconium polymers that form covalent metal-oxygen-silicon (M–O–Si) bonds with substrates at ambient temperature.
                  </p>

                  <div className="bg-white border-l-4 border-[#17A2B8] p-5 rounded-r-xl mb-6 shadow-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C3E50] mb-3">
                      Technical Specifications &amp; Validated Performance:
                    </h4>
                    <ul className="text-xs sm:text-sm text-[#374151] space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Salt Spray Resistance:</strong> Exceeds <strong>1,000 to 1,200 hours of Neutral Salt Spray (ASTM B117 / ISO 9227)</strong> with 0.0 mm creep.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>100% Sludge-Free:</strong> Eliminates hazardous waste sludge tank filtration and disposal fees.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Ambient Temperature Application:</strong> Active at <strong>20°C–35°C</strong>, eliminating heating tank energy expenses.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
                        <span><strong>Non-Chromate Compliance:</strong> Free of hexavalent chromium (Cr⁶⁺) and phosphates; meets <strong>RoHS 3 &amp; REACH SVHC</strong>.</span>
                      </li>
                    </ul>
                  </div>

                  <Link href="/solutions" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#17A2B8] hover:underline">
                    Explore VAM-PassShield™ Surface Treatments <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="lg:col-span-4">
                  <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <Image
                      src="/protective-coatings.webp"
                      alt="Valtrix Non-Chromate Corrosion Resistant Surface Conversion Coatings"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 35vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Operational Reliability Telemetry (Infographics) ── */}
      <section id="performance-data" className="bg-[#F8FAFB] py-14 sm:py-20 border-b border-gray-150">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <SectionTitle
            subtitle="BENCHMARKED ROI"
            title="Operational Reliability Telemetry"
            description="Proven financial and operational uptime gains achieved by Valtrix formulation clients"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {telemetryStats.map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 0.08} direction="up">
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-xs text-center h-full flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F7FA] border border-[#D1F2F7] flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-5 h-5 text-[#17A2B8]" />
                  </div>
                  <div className={`text-3xl sm:text-4xl font-black ${stat.color} mb-1 tracking-tight`}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-[#2C3E50] uppercase tracking-wider mb-2">
                    {stat.label}
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    {stat.sub}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Quality Assurance, Facility Verification & ASTM Standards ── */}
      <section id="quality-testing" className="bg-white py-14 sm:py-20 border-b border-gray-150">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#17A2B8] mb-2">
              <ShieldCheck className="h-4 w-4" /> Lab Testing &amp; Verification
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2C3E50] tracking-tight mb-4">
              Quality Assurance &amp; ASTM Standards Rigs
            </h2>
            <p className="text-base text-[#6B7280] leading-relaxed">
              Every formulation synthesized at our plant in <strong>Vadodara, Gujarat</strong> undergoes rigorous multi-point validation against global ASTM and ISO testing protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-gray-200 bg-[#F8FAFB]">
              <h3 className="font-bold text-[#2C3E50] text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#17A2B8]" /> ISO 9001:2024 QA System
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Multi-point batch verification using <strong>Fourier Transform Infrared Spectrophotometry (FT-IR)</strong>, <strong>Gas Chromatography-Mass Spectrometry (GC-MS)</strong>, and automated kinematic viscometers.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 bg-[#F8FAFB]">
              <h3 className="font-bold text-[#2C3E50] text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#17A2B8]" /> Standardized Testing Rigs
              </h3>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1.5 leading-relaxed">
                <li><strong>ASTM D2783:</strong> Four-Ball Weld Load &gt;400 kgf.</li>
                <li><strong>ASTM D4172:</strong> Wear Scar Diameter &lt;0.45 mm.</li>
                <li><strong>ASTM D2270:</strong> Viscosity Index Thermal Stability.</li>
                <li><strong>ASTM B117:</strong> Salt Spray Neutral Fog &gt;1,000 hrs.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 bg-[#F8FAFB]">
              <h3 className="font-bold text-[#2C3E50] text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#17A2B8]" /> Strategic Logistics Access
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Formulated at <strong>318, Fortune Gateway, Chhani, Vadodara – 390024</strong>, connected directly to major Western India industrial corridors and deep-water container ports (Mundra, Nhava Sheva).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Conversational Q&A / Answer Engine Section (AEO) ── */}
      <section id="faq" className="bg-[#F8FAFB] py-14 sm:py-20 border-b border-gray-150">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <SectionTitle
            subtitle="DIRECT ANSWERS"
            title="Frequently Asked Technical Questions"
            description="Clear answers about our chemical formulations, plant compatibility, and sampling lead times"
          />

          <div className="max-w-4xl mx-auto space-y-5 mt-10">
            <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-xs">
              <p className="font-bold text-[#2C3E50] text-base sm:text-lg mb-2">
                <strong>Q:</strong> What additives and chemical formulations does Valtrix provide?
              </p>
              <p className="text-sm sm:text-base text-[#4B5563] pl-5 border-l-2 border-[#17A2B8] leading-relaxed">
                <strong>A:</strong> Valtrix manufactures custom specialty chemical additive packages including liquid-soluble MoDTC friction boosters, VAM-CoolSyn™ biostable cutting coolants, VAM-PlateBright™ electroplating leveling agents, and VAM-PassShield™ non-chromate surface conversion passivates, engineered in Vadodara, Gujarat.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-xs">
              <p className="font-bold text-[#2C3E50] text-base sm:text-lg mb-2">
                <strong>Q:</strong> Can Valtrix additive packages be blended directly into existing plant lubricants?
              </p>
              <p className="text-sm sm:text-base text-[#4B5563] pl-5 border-l-2 border-[#17A2B8] leading-relaxed">
                <strong>A:</strong> Yes. We engineer concentrated, drop-in booster packages that are completely miscible with Group I, II, III, and synthetic PAO base oils, allowing facilities to upgrade wear and oxidation performance without costly sump flushes.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-xs">
              <p className="font-bold text-[#2C3E50] text-base sm:text-lg mb-2">
                <strong>Q:</strong> How does Valtrix solve bacterial rancidity in cutting fluid sumps without toxic biocides?
              </p>
              <p className="text-sm sm:text-base text-[#4B5563] pl-5 border-l-2 border-[#17A2B8] leading-relaxed">
                <strong>A:</strong> Our fluids use biostatic synthetic ester technology that naturally buffers alkaline pH between 9.0 and 9.4. This creates an environment that deprives anaerobic bacteria of nutrients, preventing foul sump odors without formaldehyde-releasing biocides.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-xs">
              <p className="font-bold text-[#2C3E50] text-base sm:text-lg mb-2">
                <strong>Q:</strong> Where is Valtrix Advance Material located and what are trial batch lead times?
              </p>
              <p className="text-sm sm:text-base text-[#4B5563] pl-5 border-l-2 border-[#17A2B8] leading-relaxed">
                <strong>A:</strong> Valtrix operates from 318, Fortune Gateway, Chhani, Vadodara – 390024, Gujarat, India. Pilot trial batches (up to 20 liters) are synthesized, ASTM screen-tested, and dispatched within 10 to 14 business days with full CoA and TDS documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: Certification Showcase Trust Bar ── */}
      <CertificationShowcase />

      {/* ── Section 8: Plant Tribological Consultation CTA & Standardized NAP ── */}
      <section id="contact-audit" className="bg-white py-14 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="rounded-3xl bg-gradient-to-br from-[#2C3E50] via-[#1E2B37] to-[#17A2B8] text-white p-8 sm:p-12 lg:p-14 shadow-lg">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#5EEAD4] text-xs font-bold tracking-widest uppercase mb-4">
                Tribological Audit &amp; Custom Pilot Batches
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
                Schedule an On-Site Plant Tribological Audit
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-8">
                Stop absorbing the cost of unexpected machine downtime, rapid tool burn, and fluid sludge. Partner directly with our Vadodara chemical engineering desk to evaluate your plant&apos;s fluids and formulate a custom additive package.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 text-xs sm:text-sm text-gray-200 pt-6 border-t border-white/10">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-5 w-5 text-[#5EEAD4] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Corporate &amp; Manufacturing Facility:</strong>
                    Valtrix Advance Material Pvt. Ltd.
                    <br />
                    318, Fortune Gateway, Chhani, Vadodara – 390024, Gujarat, India
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="h-5 w-5 text-[#5EEAD4] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Direct Engineering Line:</strong>
                    <a href="tel:+919898123983" className="hover:text-[#5EEAD4] transition-colors font-semibold">
                      +91 98981 23983
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Mail className="h-5 w-5 text-[#5EEAD4] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Technical Inquiries Desk:</strong>
                    <a href="mailto:info@valtrixmaterials.com" className="hover:text-[#5EEAD4] transition-colors">
                      info@valtrixmaterials.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="h-5 w-5 text-[#5EEAD4] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Consultation Hours:</strong>
                    Monday – Friday, 09:00 to 18:00 IST
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Link
                  href="/contact?subject=Plant+Tribological+Audit+Request"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#17A2B8] text-white font-bold text-sm hover:bg-[#138496] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Request a Quote Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors border border-white/10"
                >
                  <FileText className="h-4 w-4" /> View Full Solutions Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}