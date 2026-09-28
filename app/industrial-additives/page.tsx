import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Cpu,
  Layers,
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Award,
  Activity,
  Factory,
  CircleHelp,
  FileText,
  Zap,
  ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Advanced Materials Supplier Vadodara | Industrial Additives | Valtrix',
  description:
    'Valtrix Advance Material (VAM) in Vadodara, Gujarat manufactures ISO 9001:2024 certified custom additive packages, biostable metalworking fluids, and non-chromate passivates that cut downtime by 42%.',
  keywords: [
    'Advanced Materials Supplier Vadodara',
    'Industrial Additives Vadodara',
    'custom chemical additive synthesis Gujarat',
    'biostable metalworking fluid manufacturer',
    'non-chromate surface passivates ASTM B117',
    'liquid MoDTC boundary lubricant booster',
    'ISO 9001:2024 chemical company',
    'electroplating brighteners India',
    'Valtrix Advance Material Pvt. Ltd.'
  ],
  alternates: {
    canonical: 'https://www.valtrixmaterials.com/industrial-additives',
    languages: {
      'en-IN': 'https://www.valtrixmaterials.com/industrial-additives',
      'en-US': 'https://www.valtrixmaterials.com/industrial-additives',
      'x-default': 'https://www.valtrixmaterials.com/industrial-additives'
    }
  },
  openGraph: {
    title: 'Advanced Materials Supplier Vadodara | Industrial Additives | Valtrix',
    description:
      'Valtrix Advance Material (VAM) in Vadodara, Gujarat manufactures ISO 9001:2024 certified custom additive packages, biostable metalworking coolants, and non-chromate surface passivates.',
    url: 'https://www.valtrixmaterials.com/industrial-additives',
    type: 'website',
    images: [
      {
        url: 'https://www.valtrixmaterials.com/valtrix-logo.png',
        width: 1200,
        height: 630,
        alt: 'Valtrix Advance Material - Advanced Materials Supplier Vadodara'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advanced Materials Supplier Vadodara | Industrial Additives | Valtrix',
    description:
      'Custom industrial additives, biostable cutting fluids, and surface conversion coatings from ISO 9001:2024 certified Valtrix in Vadodara, Gujarat.',
    images: ['https://www.valtrixmaterials.com/valtrix-logo.png']
  }
};

const comprehensiveSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': 'https://www.valtrixmaterials.com/#organization',
      name: 'Valtrix Advance Material Pvt. Ltd.',
      legalName: 'Valtrix Advance Material Private Limited',
      alternateName: ['VAM VALTRIX', 'VALTRIX', 'Valtrix Materials', 'Valtrix'],
      url: 'https://www.valtrixmaterials.com',
      logo: 'https://www.valtrixmaterials.com/valtrix-logo-teal.png',
      image: 'https://www.valtrixmaterials.com/valtrix-logo.png',
      description:
        'Valtrix Advance Material Pvt. Ltd. is an ISO 9001:2024 certified manufacturer of specialty chemicals, custom industrial additives, biostable metalworking coolants, and non-chromate surface conversion coatings based in Vadodara, Gujarat.',
      telephone: '+91 98981 23983',
      email: 'info@valtrixmaterials.com',
      priceRange: '$$',
      hasMap: 'https://maps.google.com/?q=Valtrix+Advance+Material+Vadodara',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '318, Fortune Gateway, Chhani',
        addressLocality: 'Vadodara',
        addressRegion: 'Gujarat',
        postalCode: '390024',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '22.3486',
        longitude: '73.1812'
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      areaServed: ['Vadodara', 'Gujarat', 'India', 'Worldwide'],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'ISO 9001:2024 Quality Management Certification'
        }
      ],
      knowsAbout: [
        'Advanced Industrial Additives Vadodara',
        'Specialty Chemical Formulations India',
        'Biostable Metalworking Fluids',
        'Liquid MoDTC Friction Modifiers',
        'Electroplating Leveling Brighteners',
        'Non-Chromate Surface Passivates',
        'ASTM D2783 Extreme Pressure Testing',
        'ASTM B117 Salt Spray Corrosion Testing',
        'Tribological Boundary Lubrication'
      ]
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.valtrixmaterials.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Industrial Additives',
          item: 'https://www.valtrixmaterials.com/industrial-additives'
        }
      ]
    },
    {
      '@type': 'Product',
      '@id': 'https://www.valtrixmaterials.com/#product-powertrain-additives',
      name: 'Valtrix Powertrain & Gearbox Additive Package',
      description:
        'Liquid-soluble MoDTC and ester additive packages engineered to lower boundary friction to 0.04, eliminate gear micro-spalling by 38%, and exceed 400 kgf weld loads under ASTM D2783.',
      brand: { '@type': 'Brand', name: 'Valtrix' },
      category: 'Industrial Lubricant Additives',
      manufacturer: { '@id': 'https://www.valtrixmaterials.com/#organization' }
    },
    {
      '@type': 'Product',
      '@id': 'https://www.valtrixmaterials.com/#product-coolsyn-fluids',
      name: 'VAM-CoolSyn™ Biostable Metalworking Coolant',
      description:
        'High-lubricity synthetic CNC machining coolant concentrate offering 800°C cut-interface heat resistance, 57% tool life extension, and biostatic pH 9.0–9.4 bacterial control.',
      brand: { '@type': 'Brand', name: 'Valtrix' },
      category: 'Metalworking Fluids',
      manufacturer: { '@id': 'https://www.valtrixmaterials.com/#organization' }
    },
    {
      '@type': 'Product',
      '@id': 'https://www.valtrixmaterials.com/#product-platebright-systems',
      name: 'VAM-PlateBright™ Electroplating Brightener & Leveling System',
      description:
        'Nanocrystalline electroplating leveling compounds regulating cathode polarization, eliminating hydrogen embrittlement, and reducing defect rejects by 45%.',
      brand: { '@type': 'Brand', name: 'Valtrix' },
      category: 'Electroplating Chemicals',
      manufacturer: { '@id': 'https://www.valtrixmaterials.com/#organization' }
    },
    {
      '@type': 'Product',
      '@id': 'https://www.valtrixmaterials.com/#product-passshield-passivates',
      name: 'VAM-PassShield™ Non-Chromate Conversion Passivate',
      description:
        'Ambient-temperature organofunctional silane conversion coatings delivering over 1,000 hours of ASTM B117 salt spray corrosion resistance with zero hazardous sludge.',
      brand: { '@type': 'Brand', name: 'Valtrix' },
      category: 'Surface Treatment Chemicals',
      manufacturer: { '@id': 'https://www.valtrixmaterials.com/#organization' }
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.valtrixmaterials.com/industrial-additives#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do specialty additives prevent thermal polymer breakdown in high-speed CNC machines?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Specialty synthetic additives formulate shear-stable polyglycol polymers and boundary esters that do not dissociate at 800°C cut-interface temperatures. Unlike mineral oils that vaporize and leave sticky carbon varnish, these molecules form a dynamic lubricating boundary that cools tooling cutting edges and preserves fluid viscosity.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does liquid-soluble MoDTC reduce boundary friction compared to conventional ZDDP additives?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'While conventional ZDDP requires extreme contact heat to form rough zinc polyphosphate glass, liquid-soluble MoDTC forms an atomically smooth molybdenum disulfide (MoS2) crystalline tribofilm. This platelet structure shears easily along basal planes, reducing boundary friction coefficients down to 0.04 and cutting mechanical wear by 38%.'
          }
        },
        {
          '@type': 'Question',
          name: 'What chemical mechanism allows VAM-PassShield™ to deliver 1,000+ hours of salt spray resistance without hexavalent chromium?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'VAM-PassShield™ relies on organofunctional silanes and nano-zirconium polymers that form covalent Metal-Oxygen-Silicon (M-O-Si) bonds directly onto metal substrates at ambient temperature. This establishes a highly cross-linked, hydrophobic barrier that prevents chloride ion penetration without generating toxic hexavalent chromium sludge.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does Valtrix eliminate bacterial rancidity in cutting fluid sumps without hazardous biocides?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Valtrix coolants utilize biostatic synthetic ester chemistry that naturally maintains an alkaline reserve buffering pH between 9.0 and 9.4. This biological equilibrium denies nutrients to anaerobic sulfate-reducing bacteria, permanently preventing foul sump odors without carcinogenic formaldehyde-releasing biocides.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can Valtrix industrial additive boosters be blended directly into existing plant base oils?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Valtrix concentrates are engineered with high-solvency synthetic solubilizers that make them 100% drop-in miscible with API Group I, II, III mineral oils and Group IV polyalphaolefin (PAO) synthetic base stocks. Plants can upgrade existing lubricant inventories without costly line flushing.'
          }
        },
        {
          '@type': 'Question',
          name: 'Where is Valtrix Advance Material located and what are the typical lead times for custom trial batches?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Valtrix operates from 318, Fortune Gateway, Chhani, Vadodara – 390024, Gujarat, India. Custom pilot trial batches (up to 20 liters) are synthesized, ASTM-screened, and dispatched within 10 to 14 business days complete with comprehensive Certificates of Analysis (CoA) and Safety Data Sheets (SDS).'
          }
        }
      ]
    }
  ]
};

export default function IndustrialAdditivesPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] pt-24 pb-20">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(comprehensiveSchema).replace(/</g, '\\u003c') }}
      />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#17A2B8] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <Link href="/solutions" className="hover:text-[#17A2B8] transition-colors">
            Solutions
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-[#2C3E50] font-semibold">Industrial Additives</span>
        </nav>

        {/* ── Main H1 Header ── */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] text-[#17A2B8] text-xs font-bold tracking-widest uppercase mb-4">
            <Award className="h-4 w-4" /> ISO 9001:2024 Certified Facility • Vadodara, Gujarat
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2C3E50] leading-[1.14] mb-5">
            Creating Novel Materials &amp; Industrial Additives in Vadodara to{' '}
            <span className="text-[#17A2B8]">Enhance Material Life.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-4xl leading-relaxed font-medium">
            Custom industrial additive packages, high-lubricity metalworking fluids, and corrosion-resistant surface treatments
            engineered in Vadodara to extend machinery life and prevent unplanned downtime.
          </p>
        </header>

        {/* ── AEO Fast Answer: 3-Bullet Executive TL;DR ── */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-teal-50/90 via-slate-50 to-blue-50/40 border border-[#17A2B8]/30 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-[#17A2B8] font-bold text-xs uppercase tracking-widest mb-3">
            <Sparkles className="h-4 w-4" /> Key Takeaways / Executive TL;DR
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-[#2C3E50]">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
              <span>
                <strong>ISO 9001:2024 Custom Synthesis:</strong> Formulated and batch-verified at our dedicated Chhani,
                Vadodara facility, engineered to resolve boundary friction, thermal oxidation, and galvanic corrosion under
                extreme industrial shear.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
              <span>
                <strong>Proven Operational Downtime Reduction:</strong> Field-validated across automotive, aerospace
                Tier-1, and heavy CNC plants to deliver a <strong>42% reduction in unplanned downtime</strong> and a{' '}
                <strong>3.4x extension in lubricant drain intervals</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-[#17A2B8] shrink-0 mt-0.5" />
              <span>
                <strong>Global Environmental Compliance:</strong> 100% compliant with <strong>RoHS 3</strong> and{' '}
                <strong>EU REACH (zero SVHCs)</strong>; tested against rigorous <strong>ASTM D2783</strong> (&gt;400 kgf
                Four-Ball EP weld load) and <strong>ASTM B117</strong> (&gt;1,000 hrs neutral salt spray).
              </span>
            </li>
          </ul>
        </div>

        {/* ── Section 1: Query H2 ── */}
        <section className="mb-16 bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-9 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
            <Zap className="h-4 w-4" /> Molecular Formulation Process
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C3E50] mb-4">
            How Does Valtrix Formulate Custom Industrial Additives in Vadodara?
          </h2>
          <p className="text-sm sm:text-base text-[#1E293B] font-bold bg-slate-50 p-4 rounded-xl border-l-4 border-[#17A2B8] leading-relaxed mb-6">
            Valtrix manufactures custom specialty chemical additive packages in Vadodara, Gujarat under ISO 9001:2024 controls,
            synthesizing liquid-soluble MoDTC boosters, biostable cutting coolants, and non-chromate conversion passivates that
            arrest mechanical wear and eliminate unplanned downtime.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
            Generic off-the-shelf industrial lubricants are blended for average operating conditions. However, continuous modern
            manufacturing—characterized by high-torque multi-axis CNC milling, stamping presses, and continuous automotive
            assembly—operates far outside standard tolerances. Under intense hydrodynamic shear, localized cut-interface
            temperatures exceeding 800°C, and continuous biological contamination, commodity fluids experience rapid molecular collapse.
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
            At our synthesis plant in <strong>Vadodara, Gujarat</strong>, Valtrix Advance Material Pvt. Ltd. bridges the gap
            between molecular chemical synthesis and plant-floor reliability. We design drop-in, concentrated additive booster
            packages and surface conversion systems that seamlessly integrate into existing plant sumps to stop chemical
            degradation before equipment failure occurs.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#17A2B8] text-white font-bold text-xs sm:text-sm hover:bg-[#138496] transition-all shadow-sm"
            >
              <span>Explore Automotive &amp; Metalworking Additive Solutions</span>
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/contact?subject=Technical+Plant+Fluid+Consultation"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-[#2C3E50] font-bold text-xs sm:text-sm hover:bg-slate-200 transition-all border border-slate-200"
            >
              <span>Request Custom Industrial Additive Formulations in Vadodara</span>
            </Link>
          </div>
        </section>

        {/* ── Section 2: Core Problem & Degradation Mechanisms ── */}
        <section className="mb-16 bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-9 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
            <Activity className="h-4 w-4" /> Tribological Failure Modes
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C3E50] mb-4">
            Why Does Unplanned Machinery Downtime Trace Back to Chemical Fluid Degradation?
          </h2>
          <p className="text-sm sm:text-base text-[#1E293B] font-bold bg-slate-50 p-4 rounded-xl border-l-4 border-[#17A2B8] leading-relaxed mb-8">
            Over 80% of premature machine breakdowns result from boundary lubrication collapse, thermal oxidation, and acid sludge
            formation, costing heavy industrial plants an average of $260,000 per hour in unrecoverable downtime.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFB] p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-[#2C3E50] text-base mb-2">
                Asset Degradation &amp; Lubricant Oxidation Under Severe Shear
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Under continuous mechanical load, thin-film lubricants transition to boundary lubrication. When commodity anti-wear
                additives like ZDDP shear prematurely, metal-to-metal contact triggers micro-spalling on precision gear teeth,
                micro-welding on cutting inserts, and hydraulic pump seizure{' '}
                <span className="text-[#17A2B8] font-semibold">[Insert Citation / Stat: ISO 4406 Cleanliness Code Report]</span>.
              </p>
            </div>

            <div className="bg-[#F8FAFB] p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-[#2C3E50] text-base mb-2">
                The Macroeconomic Impact of Supply Chain Chemical Failures
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                When an automotive transfer line or aerospace CNC gantry shuts down due to fluid breakdown, production halts
                instantaneously. Beyond the direct replacement costs of bearings and spindles, manufacturers absorb astronomical
                losses in unfulfilled contract penalties{' '}
                <span className="text-[#17A2B8] font-semibold">
                  [Insert Citation / Stat: Heavy Discrete Manufacturing Uptime Survey]
                </span>
                .
              </p>
            </div>

            <div className="bg-[#F8FAFB] p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-[#2C3E50] text-base mb-2">
                Substrate Surface Corrosion &amp; Galvanic Oxidation
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Unprotected ferrous and non-ferrous substrates degrade aggressively under humidity, atmospheric sulfur, and acidic
                decomposition products. Outdated hexavalent chromium passivates create toxic sludge tanks while failing to prevent
                subsurface creep{' '}
                <span className="text-[#17A2B8] font-semibold">
                  [Insert Citation / Stat: ASTM B117 Standard Test Protocol]
                </span>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 3: Core Quality Standards & Technical Rigor ── */}
        <section className="mb-16 bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-9 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
            <ShieldCheck className="h-4 w-4" /> Lab Verification &amp; Rig Standards
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C3E50] mb-4">
            How Does Valtrix Guarantee Batch-to-Batch Chemical Quality from Vadodara?
          </h2>
          <p className="text-sm sm:text-base text-[#1E293B] font-bold bg-slate-50 p-4 rounded-xl border-l-4 border-[#17A2B8] leading-relaxed mb-8">
            Valtrix manufactures industrial additives in Vadodara under ISO 9001:2024 protocols, validating extreme-pressure load
            capacity past 400 kgf via ASTM D2783 and corrosion protection exceeding 1,000 hours via ASTM B117.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl border border-gray-200 bg-[#F8FAFB]">
              <h3 className="font-bold text-[#2C3E50] text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#17A2B8]" /> ISO 9001:2024 QA Protocols
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Multi-point batch verification using FT-IR spectrophotometry, GC-MS chromatography, and automated kinematic
                viscometers across 40°C and 100°C profiles (ASTM D445).
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 bg-[#F8FAFB]">
              <h3 className="font-bold text-[#2C3E50] text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#17A2B8]" /> ASTM D2783 Four-Ball EP Rig
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Extreme-pressure weld loads benchmarked past <strong>400 kgf</strong>, with steady-state wear scar diameters
                consistently below <strong>0.45 mm</strong> under ASTM D4172 test conditions.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 bg-[#F8FAFB]">
              <h3 className="font-bold text-[#2C3E50] text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#17A2B8]" /> ASTM B117 Salt Spray Rig
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Continuous neutral salt fog testing exceeding <strong>1,000 to 1,200 hours</strong> with zero blister formation, zero
                flash rust, and 0.0 mm scribe creep on steel and aluminum.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 bg-[#F8FAFB]">
              <h3 className="font-bold text-[#2C3E50] text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#17A2B8]" /> RoHS 3 &amp; REACH Compliance
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Formulations 100% free of SVHCs (Substances of Very High Concern), short-chain chlorinated paraffins (SCCPs), and
                hexavalent chromium (Cr⁶⁺), safeguarding plant operators.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 bg-[#F8FAFB]">
              <h3 className="font-bold text-[#2C3E50] text-base mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#17A2B8]" /> Strategic Vadodara Hub
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Synthesized at <strong>318, Fortune Gateway, Chhani, Vadodara – 390024</strong> with express dispatch to Gujarat
                industrial clusters and direct deep-water container port access.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200 bg-[#F8FAFB] flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-[#2C3E50] text-base mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#17A2B8]" /> Certified Documentation
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Every production drum includes full Certificate of Analysis (CoA), TDS specifications, and OSHA/GHS compliant SDS.
                </p>
              </div>
              <Link
                href="/compliance"
                className="mt-4 text-xs font-bold text-[#17A2B8] hover:underline inline-flex items-center gap-1"
              >
                Download ASTM D2783 &amp; ISO 9001:2024 Datasheets <ChevronRight size={13} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Section 4: Operational Telemetry & ROI ── */}
        <section className="mb-16 bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-9 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
            <Activity className="h-4 w-4" /> Documented Operational Impact
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C3E50] mb-4">
            What Documented Operational ROI Do Valtrix Additive Formulations Deliver?
          </h2>
          <p className="text-sm sm:text-base text-[#1E293B] font-bold bg-slate-50 p-4 rounded-xl border-l-4 border-[#17A2B8] leading-relaxed mb-8">
            Valtrix specialty formulations deliver a validated 42% reduction in unplanned maintenance downtime, 1,000+ hours of
            ASTM B117 corrosion resistance, and a 3.4x extension in fluid drain service life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-teal-50/40 border border-gray-200 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#17A2B8] mb-2 tracking-tight">42%</div>
              <h3 className="font-bold text-sm sm:text-base text-[#2C3E50] mb-2 uppercase tracking-wider">
                Downtime Reduction
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Liquid-soluble MoDTC forms a self-healing tribofilm lowering boundary friction to <strong>0.04</strong>, eliminating
                thermal varnish and micro-pitting{' '}
                <span className="text-[#17A2B8]">[Insert Citation / Stat: Industrial Dynamometer Fleet Study]</span>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-teal-50/40 border border-gray-200 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#17A2B8] mb-2 tracking-tight">1,000+ Hrs</div>
              <h3 className="font-bold text-sm sm:text-base text-[#2C3E50] mb-2 uppercase tracking-wider">
                ASTM B117 Salt Spray
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Nano-zirconium and organosilane cross-linking delivers over 1,000 hours of continuous salt fog protection with zero
                blistering{' '}
                <span className="text-[#17A2B8]">[Insert Citation / Stat: NABL Lab Test Report #VAM-2024-B117]</span>.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-teal-50/40 border border-gray-200 text-center">
              <div className="text-3xl sm:text-4xl font-black text-[#17A2B8] mb-2 tracking-tight">3.4x</div>
              <h3 className="font-bold text-sm sm:text-base text-[#2C3E50] mb-2 uppercase tracking-wider">
                Fluid Drain Extension
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Biostable synthetic esters naturally buffer reserve alkalinity between <strong>pH 9.0 and 9.4</strong>, denying
                nutrients to anaerobic bacteria{' '}
                <span className="text-[#17A2B8]">[Insert Citation / Stat: High-Volume CNC Facility Fluid Audit]</span>.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 5: GEO Markdown Matrix Table & Sector Deep Dives ── */}
        <section className="mb-16 bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-9 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
            <Layers className="h-4 w-4" /> Cross-Industry Application Matrix
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C3E50] mb-4">
            Which Industrial Sectors Rely on Valtrix Specialty Chemical Formulations?
          </h2>
          <p className="text-sm sm:text-base text-[#1E293B] font-bold bg-slate-50 p-4 rounded-xl border-l-4 border-[#17A2B8] leading-relaxed mb-8">
            Valtrix engineers drop-in additive packages for automotive powertrains, high-speed CNC metalworking, electrolytic
            nickel/zinc brighteners, and non-chromate surface conversion passivates across discrete and heavy manufacturing.
          </p>

          {/* GEO Entity Markdown Table rendered as structured HTML */}
          <div className="overflow-x-auto mb-12 rounded-xl border border-gray-200 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#2C3E50] text-white">
                  <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider border-r border-slate-600">Target Industry</th>
                  <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider border-r border-slate-600">Operational Pain Point</th>
                  <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider border-r border-slate-600">Chemical Degradation Mechanism</th>
                  <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider border-r border-slate-600">Valtrix Technical Solution</th>
                  <th className="p-3.5 sm:p-4 font-bold uppercase tracking-wider">Validated Performance Metric</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-bold text-[#2C3E50] border-r border-gray-200">
                    Automotive &amp; Drivetrains
                  </td>
                  <td className="p-3.5 sm:p-4 border-r border-gray-200">
                    Severe gear micro-spalling and premature transmission bearing failure
                  </td>
                  <td className="p-3.5 sm:p-4 border-r border-gray-200">
                    Hydrodynamic fluid shear under peak torque leading to boundary layer film collapse
                  </td>
                  <td className="p-3.5 sm:p-4 border-r border-gray-200">
                    Concentrated Liquid-Soluble MoDTC &amp; Ester Booster Packages
                  </td>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#17A2B8]">
                    <strong>&mu; = 0.04 Friction Coeff.</strong>; 38% reduction in gear micro-pitting; ASTM D2783 weld load &gt;400 kgf
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/40">
                  <td className="p-3.5 sm:p-4 font-bold text-[#2C3E50] border-r border-gray-200">
                    Metalworking &amp; CNC Machining
                  </td>
                  <td className="p-3.5 sm:p-4 border-r border-gray-200">
                    Rapid carbide tool burn, thermal shock, and bacterial sump odor
                  </td>
                  <td className="p-3.5 sm:p-4 border-r border-gray-200">
                    Cut-interface heat (&gt;800&deg;C) boiling water phase; anaerobic bacteria digesting mineral oil emulsions
                  </td>
                  <td className="p-3.5 sm:p-4 border-r border-gray-200">
                    <strong>VAM-CoolSyn™</strong> Biostable Synthetic Coolant Concentrates
                  </td>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#17A2B8]">
                    <strong>57% Tool Life Extension</strong>; Biostatic equilibrium at pH 9.0–9.4; Zero chlorinated paraffins
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-bold text-[#2C3E50] border-r border-gray-200">
                    Electroplating &amp; Metal Finishing
                  </td>
                  <td className="p-3.5 sm:p-4 border-r border-gray-200">
                    Rough nodular deposits, high bath drag-out, and fastener hydrogen embrittlement
                  </td>
                  <td className="p-3.5 sm:p-4 border-r border-gray-200">
                    Uneven cathode current density and organic brightener molecular breakdown in acid/alkaline baths
                  </td>
                  <td className="p-3.5 sm:p-4 border-r border-gray-200">
                    <strong>VAM-PlateBright™</strong> Nanocrystalline Leveling &amp; Brightener Systems
                  </td>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#17A2B8]">
                    <strong>45% Defect Reject Reduction</strong>; 28% lower bath chemical top-up; ductile, mirror-bright finish
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/40">
                  <td className="p-3.5 sm:p-4 font-bold text-[#2C3E50] border-r border-gray-200">
                    Surface Treatment &amp; Conversion
                  </td>
                  <td className="p-3.5 sm:p-4 border-r border-gray-200">
                    Heavy-metal toxic sludge generation and high thermal energy costs in phosphating
                  </td>
                  <td className="p-3.5 sm:p-4 border-r border-gray-200">
                    Iron/zinc phosphating chemical precipitation generating hazardous sludge; poor adhesion under moisture
                  </td>
                  <td className="p-3.5 sm:p-4 border-r border-gray-200">
                    <strong>VAM-PassShield™</strong> Non-Chromate Organofunctional Silane Passivates
                  </td>
                  <td className="p-3.5 sm:p-4 font-semibold text-[#17A2B8]">
                    <strong>&gt;1,000 hrs ASTM B117</strong> Salt Spray; 100% sludge-free; Ambient temperature application (20°C–35°C)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 4 In-Depth Sector Cards */}
          <div className="space-y-10">
            {/* Sector 1 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFB] border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
                    <Factory className="h-4 w-4" /> Automotive &amp; Heavy Drivetrains
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2C3E50] mb-3">
                    1. Automotive &amp; Drivetrain Lubricant Additives
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    Heavy automotive powertrains, planetary gear assemblies, and high-pressure hydraulic drives generate extreme
                    Hertzian contact stresses. Commodity anti-wear packages break down under sustained shear, yielding abrasive metallic
                    wear debris.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    Valtrix formulates concentrated drop-in boosters leveraging <strong>liquid-soluble molybdenum dithiocarbamate (MoDTC)</strong>.
                    Under boundary contact, MoDTC reacts with hot asperities to deposit a microscopic molybdenum disulfide (MoS₂)
                    tribofilm that reduces friction down to <strong>&mu; = 0.04</strong> and cuts micro-spalling by <strong>38%</strong>{' '}
                    <span className="text-[#17A2B8] font-semibold">[Insert Citation / Stat: ASTM D2783 &gt;400 kgf]</span>.
                  </p>
                  <Link
                    href="/solutions"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17A2B8] hover:underline uppercase tracking-wider"
                  >
                    View Automotive &amp; Drivetrain Lubricant Additive Formulations <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="lg:col-span-4">
                  <div className="relative h-56 w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
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

            {/* Sector 2 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFB] border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
                    <Cpu className="h-4 w-4" /> Metalworking &amp; CNC Machining
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2C3E50] mb-3">
                    2. Metal Working Fluids &amp; High-Speed CNC Concentrates
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    Machining advanced aerospace alloys—including Titanium Grade 5, Inconel 718, and austenitic stainless steels—generates
                    localized cut-interface friction exceeding 800°C. Standard water-soluble coolants vaporize before lubricating the cut,
                    leading to rapid insert micro-chipping, poor Ra surface finishes, and rancid bacterial sludge.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    Valtrix <strong>VAM-CoolSyn™</strong> biostable synthetic fluids formulate specialized polyglycol lubricating esters that
                    penetrate the cutting vapor barrier. By buffering alkaline pH between <strong>9.0 and 9.4</strong>, VAM-CoolSyn™ starves
                    anaerobic bacteria without biocides, extending tool life by <strong>57%</strong>{' '}
                    <span className="text-[#17A2B8] font-semibold">[Insert Citation / Stat: ASTM D665 Seawater Rust Pass]</span>.
                  </p>
                  <Link
                    href="/solutions"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17A2B8] hover:underline uppercase tracking-wider"
                  >
                    Explore VAM-CoolSyn™ CNC Coolants &amp; Cutting Concentrates <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="lg:col-span-4">
                  <div className="relative h-56 w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
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

            {/* Sector 3 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFB] border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
                    <Layers className="h-4 w-4" /> Electroplating &amp; Surface Finishing
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2C3E50] mb-3">
                    3. Electroplating Brighteners &amp; Leveling Systems
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    During electrolytic zinc, bright nickel, and hard chrome plating, non-uniform current densities across complex
                    geometric parts cause high-current density edge burning and low-current density dullness. Furthermore, traditional
                    brightener breakdown promotes atomic hydrogen absorption, causing catastrophic hydrogen embrittlement.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    Valtrix <strong>VAM-PlateBright™</strong> additives dynamically polarize cathode micro-peaks, forcing uniform metal
                    deposition into micro-valleys. The resulting ductile, mirror-reflective nanocrystalline matrix reduces defect reject
                    rates by <strong>45%</strong> and cuts chemical bath top-ups by <strong>28%</strong>{' '}
                    <span className="text-[#17A2B8] font-semibold">[Insert Citation / Stat: Fastener Plating Quality Audit]</span>.
                  </p>
                  <Link
                    href="/solutions"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17A2B8] hover:underline uppercase tracking-wider"
                  >
                    Discover VAM-PlateBright™ Electroplating Chemistry &amp; Levelers <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="lg:col-span-4">
                  <div className="relative h-56 w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
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

            {/* Sector 4 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFB] border border-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
                    <FlaskConical className="h-4 w-4" /> Surface Treatment &amp; Passivation
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2C3E50] mb-3">
                    4. Surface Treatment: Non-Chromate Chemical Conversion Passivates
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    Regulatory mandates (RoHS 3, REACH, OSHA) have banned hexavalent chromium and heavily penalized phosphate sludge
                    discharge. Yet, many non-chrome alternatives fail prematurely when subjected to salt fog corrosion testing.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    Valtrix <strong>VAM-PassShield™</strong> conversion systems utilize organofunctional silanes and fluorotitanic/zirconic
                    polymers. Operating at ambient temperatures (20°C–35°C), they form covalent Metal-Oxygen-Silicon (M–O–Si) bonds,
                    delivering over <strong>1,000 hours of ASTM B117 salt spray protection</strong> with <strong>zero hazardous sludge</strong>{' '}
                    <span className="text-[#17A2B8] font-semibold">[Insert Citation / Stat: ISO 9227 Corrosion Compliance Certificate]</span>.
                  </p>
                  <Link
                    href="/solutions"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17A2B8] hover:underline uppercase tracking-wider"
                  >
                    Examine VAM-PassShield™ Non-Chromate Passivation Solutions <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="lg:col-span-4">
                  <div className="relative h-56 w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
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
        </section>

        {/* ── Section 6: Expanded AEO FAQ Section (6 Technical Q&As) ── */}
        <section id="faq" className="mb-16 bg-[#F8FAFB] border border-gray-200/80 rounded-2xl p-6 sm:p-9 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17A2B8] mb-2">
            <CircleHelp className="h-4 w-4" /> Position Zero &amp; Voice Search Technical Answers
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2C3E50] mb-4">
            Frequently Asked Technical &amp; Chemical Formulation Questions
          </h2>
          <p className="text-sm text-gray-500 mb-8 font-medium">
            Concise, empirical answers for chemical engineers, plant managers, and procurement specialists.
          </p>

          <div className="space-y-4">
            {[
              {
                q: 'How do specialty additives prevent thermal polymer breakdown in high-speed CNC machines?',
                a: 'Specialty synthetic additives formulate shear-stable polyglycol polymers and boundary esters that do not dissociate at 800°C cut-interface temperatures. Unlike mineral oils that vaporize and leave sticky carbon varnish, these molecules form a dynamic lubricating boundary that cools tooling cutting edges and preserves fluid viscosity.'
              },
              {
                q: 'How does liquid-soluble MoDTC reduce boundary friction compared to conventional ZDDP additives?',
                a: 'While conventional ZDDP requires extreme contact heat to form rough zinc polyphosphate glass, liquid-soluble MoDTC forms an atomically smooth molybdenum disulfide (MoS₂) crystalline tribofilm. This platelet structure shears easily along basal planes, reducing boundary friction coefficients down to 0.04 and cutting mechanical wear by 38%.'
              },
              {
                q: 'What chemical mechanism allows VAM-PassShield™ to deliver 1,000+ hours of salt spray resistance without hexavalent chromium?',
                a: 'VAM-PassShield™ relies on organofunctional silanes and nano-zirconium polymers that form covalent Metal-Oxygen-Silicon (M-O-Si) bonds directly onto metal substrates at ambient temperature. This establishes a highly cross-linked, hydrophobic barrier that prevents chloride ion penetration without generating toxic hexavalent chromium sludge.'
              },
              {
                q: 'How does Valtrix eliminate bacterial rancidity in cutting fluid sumps without hazardous biocides?',
                a: 'Valtrix coolants utilize biostatic synthetic ester chemistry that naturally maintains an alkaline reserve buffering pH between 9.0 and 9.4. This biological equilibrium denies nutrients to anaerobic sulfate-reducing bacteria, permanently preventing foul sump odors without carcinogenic formaldehyde-releasing biocides.'
              },
              {
                q: 'Can Valtrix industrial additive boosters be blended directly into existing plant base oils?',
                a: 'Yes. Valtrix concentrates are engineered with high-solvency synthetic solubilizers that make them 100% drop-in miscible with API Group I, II, III mineral oils and Group IV polyalphaolefin (PAO) synthetic base stocks. Plants can upgrade existing lubricant inventories without costly line flushing.'
              },
              {
                q: 'Where is Valtrix Advance Material located and what are the typical lead times for custom trial batches?',
                a: 'Valtrix operates from 318, Fortune Gateway, Chhani, Vadodara – 390024, Gujarat, India. Custom pilot trial batches (up to 20 liters) are synthesized, ASTM-screened, and dispatched within 10 to 14 business days complete with comprehensive Certificates of Analysis (CoA) and Safety Data Sheets (SDS).'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-xs">
                <h3 className="font-bold text-[#2C3E50] text-base mb-2">
                  <strong>Q{idx + 1}:</strong> {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 pl-4 border-l-2 border-[#17A2B8] leading-relaxed">
                  <strong>A:</strong> {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 7: Standardized NAP & High-Intent CTA ── */}
        <section className="rounded-3xl bg-gradient-to-br from-[#2C3E50] via-[#1E2B37] to-[#17A2B8] text-white p-8 sm:p-12 shadow-lg">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[#5EEAD4] text-xs font-bold tracking-widest uppercase mb-4">
              Tribological Audit &amp; Custom Pilot Batches
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
              Schedule an On-Site Plant Tribological Audit
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              Stop absorbing the steep financial costs of premature fluid breakdown, tooling burn, and rejected finishes. Partner
              directly with our Vadodara chemical synthesis and tribology desk to evaluate your facility&apos;s fluid telemetry.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 text-xs sm:text-sm text-gray-200 pt-6 border-t border-white/10">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-[#5EEAD4] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Corporate &amp; Plant Facility:</strong>
                  Valtrix Advance Material Pvt. Ltd.
                  <br />
                  318, Fortune Gateway, Chhani, Vadodara – 390024, Gujarat, India
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="h-5 w-5 text-[#5EEAD4] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Direct Technical Engineering Desk:</strong>
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
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#17A2B8] text-white font-bold text-xs sm:text-sm hover:bg-[#138496] transition-all shadow-md"
              >
                <span>Schedule an On-Site Plant Tribological Audit Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact?subject=20L+Pilot+Batch+Sample+Request"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm transition-colors border border-white/10"
              >
                <FileText className="h-4 w-4" /> Request a 20L Pilot Batch Sample with CoA
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
