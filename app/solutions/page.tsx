// Solutions index page listing specialty chemical solutions & custom industrial additives
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SolutionsContent } from './solutions-content';
import { getSolutionsData } from '@/lib/content-utils';

export const metadata: Metadata = {
  title: 'Industrial Additive Packages & Chemical Formulations | Valtrix Vadodara',
  description: 'Explore Valtrix Advance Material custom industrial additives, biostable metalworking fluids, and corrosion-resistant surface treatments engineered in Vadodara, Gujarat.',
  keywords: [
    'industrial additives Vadodara',
    'custom chemical additive packages',
    'metalworking fluids manufacturer',
    'corrosion inhibitor supplier',
    'surface treatment additives',
    'SusCat-I polymer',
    'VAMShield-90',
    'SusPol-125 polyol',
    'VAM RC-01 rust converter',
    'VAM HS-100 lubricant additive',
    'ISO 9001:2024 certified chemical company'
  ],
  openGraph: {
    title: 'Industrial Additive Packages & Chemical Formulations | Valtrix Vadodara',
    description: 'Explore Valtrix Advance Material custom industrial additives, biostable metalworking fluids, and corrosion-resistant surface treatments engineered in Vadodara, Gujarat.',
    url: 'https://www.valtrixmaterials.com/solutions',
    type: 'website',
    images: [
      {
        url: 'https://www.valtrixmaterials.com/suscat.png',
        width: 800,
        height: 600,
        alt: 'Valtrix Advance Material - Specialty Industrial Chemical Additives and Corrosion Protection',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.valtrixmaterials.com/solutions',
  },
};

export default function SolutionsPage() {
  const solutionsData = getSolutionsData();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What causes oil sludge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oil sludge is caused by oxidation, contamination, and breakdown of lubricants under high temperature and pressure. Valtrix Advance Material Pvt. Ltd. delivers advanced industrial additives that prevent sludge formation, ensuring smoother operations.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do custom additive packages reduce downtime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Custom additive packages improve efficiency, reduce wear, and extend equipment life. By preventing sludge and corrosion, they minimize unexpected breakdowns and reduce downtime.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is corrosion resistance important in industrial systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Corrosion resistance is critical to protect machinery and extend service life. Valtrix Advance Material Pvt. Ltd. provides ISO-certified corrosion-resistant coatings and chemical solutions that safeguard equipment in demanding environments.',
        },
      },
    ],
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Valtrix Advance Material Pvt. Ltd.',
    description: 'Valtrix Advance Material Pvt. Ltd. delivers advanced industrial additives, corrosion-resistant coatings, and custom chemical solutions to reduce downtime, prevent sludge, and extend equipment life. Serving Vadodara, Gujarat with ISO-certified innovation.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '318, Fortune Gateway, Chhani',
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      postalCode: '390024',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '22.3486',
      longitude: '73.1812',
    },
    telephone: '+91 98981 23983',
    email: 'info@valtrixmaterials.com',
    url: 'https://www.valtrixmaterials.com',
    hasMap: 'https://maps.google.com/?q=Valtrix+Advance+Material+Vadodara',
    logo: 'https://www.valtrixmaterials.com/valtrix-logo-teal.png',
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    certifications: 'ISO 9001:2024 Certified',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.valtrixmaterials.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Solutions',
        item: 'https://www.valtrixmaterials.com/solutions',
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert CNC Machine Sumps to VAM-CoolSyn™ Biostable Fluids',
    description:
      'A 5-step engineering conversion protocol validated by Valtrix field chemists to prevent bacterial shock, eliminate foaming, and maximize tool life during fluid changeovers.',
    totalTime: 'PT4H',
    tool: [
      { '@type': 'HowToTool', name: 'Optical / Digital Brix Refractometer' },
      { '@type': 'HowToTool', name: 'Calibrated Digital pH Meter' },
      { '@type': 'HowToTool', name: 'Industrial Sump Vacuum & Sludge Pump' },
    ],
    supply: [
      { '@type': 'HowToSupply', name: 'VAM System Cleaner Concentrate' },
      { '@type': 'HowToSupply', name: 'VAM-CoolSyn™ Biostable Coolant' },
      { '@type': 'HowToSupply', name: 'Demineralized / RO Makeup Water (<100 ppm hardness)' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'In-System Cleaner & Biocide Pre-Treatment',
        text: 'Add 1% to 2% VAM System Cleaner concentrate directly to the depleted coolant 8 hours prior to shutdown while running regular production to penetrate biofilm in coolant lines.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Mechanical Sump Drain & Tramp Oil Extraction',
        text: 'Completely pump out depleted fluid, vacuum settled swarf and metallic chips from the sump bottom, and skim all free tramp oil from hydraulic leaks.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Demineralized Water High-Pressure Rinse',
        text: 'Circulate a 1% light rinse batch through machine lines for 15 minutes to flush dislodged fungal particulates, then pump dry.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Fresh VAM-CoolSyn™ Charge & Refractometer Calibration',
        text: 'Charge the sump with fresh demineralized water and add VAM-CoolSyn™ concentrate to achieve an 8%–10% Brix refractometer reading (Brix factor 1.0).',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: '48-Hour Fluid Telemetry & pH Baseline Verification',
        text: 'Verify initial pH stabilizes at 9.2–9.4. Check tramp oil coalescer operation and record refractometer readings daily for continuous biostatic equilibrium.',
      },
    ],
  };

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: 'Advanced Industrial Additives & Corrosion-Resistant Coatings',
    brand: {
      '@type': 'Organization',
      name: 'Valtrix Advance Material Pvt. Ltd.',
    },
    description: 'Valtrix Advance Material Pvt. Ltd. delivers advanced industrial additives, corrosion-resistant coatings, and custom chemical solutions to reduce downtime, prevent sludge, and extend equipment life. Serving Vadodara, Gujarat with ISO-certified innovation.',
    sku: 'VAM-IND-ADD-001',
    mpn: 'VAM-COAT-002',
    image: 'https://www.valtrixmaterials.com/images/additives-coatings.jpg',
    url: 'https://www.valtrixmaterials.com/solutions',
    manufacturer: {
      '@type': 'Organization',
      name: 'Valtrix Advance Material Pvt. Ltd.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '318, Fortune Gateway, Chhani',
        addressLocality: 'Vadodara',
        addressRegion: 'Gujarat',
        postalCode: '390024',
        addressCountry: 'IN',
      },
    },
    offers: {
      '@type': 'Offer',
      url: 'https://www.valtrixmaterials.com/contact',
      priceCurrency: 'INR',
      price: 'On Request',
      availability: 'https://schema.org/InStock',
    },
  };

  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Valtrix Specialty Chemical Solutions & Custom Industrial Additives',
    description: 'Catalog of industrial additives and specialty chemicals engineered for material protection, corrosion resistance, and downtime reduction.',
    itemListElement: [
      {
        '@type': 'Product',
        position: 1,
        name: 'SusCat-I Cationic Polymer',
        description: 'High-performance cationic polymer for industrial formulations, levelling, and tramp oil separation.',
        brand: { '@type': 'Brand', name: 'Valtrix' },
      },
      {
        '@type': 'Product',
        position: 2,
        name: 'VAMShield-90 Corrosion Inhibitor',
        description: 'Ash-free multi-metal corrosion inhibitor providing low foaming and superior protection.',
        brand: { '@type': 'Brand', name: 'Valtrix' },
      },
      {
        '@type': 'Product',
        position: 3,
        name: 'SusPol-125 Bio-Polyol',
        description: 'Castor oil-derived solvent-free bio-polyol for flexible, weather-resistant industrial coatings.',
        brand: { '@type': 'Brand', name: 'Valtrix' },
      },
      {
        '@type': 'Product',
        position: 4,
        name: 'VAM RC-01 Rust Converter',
        description: 'Advanced rust converter additive converting ferric oxide into a stable protective layer.',
        brand: { '@type': 'Brand', name: 'Valtrix' },
      },
      {
        '@type': 'Product',
        position: 5,
        name: 'VAM HS-100 Lubricant Additive',
        description: 'Multifunctional lubricant additive offering lime soap dispersion, foam control, and rust prevention.',
        brand: { '@type': 'Brand', name: 'Valtrix' },
      },
      {
        '@type': 'Product',
        position: 6,
        name: 'Custom Industrial Additive Packages',
        description: 'Tailored chemical formulations engineered in Vadodara, Gujarat for sludge prevention, corrosion resistance, and downtime reduction.',
        brand: { '@type': 'Brand', name: 'Valtrix' },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#17A2B8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#6B7280]">Loading solutions...</p>
          </div>
        </div>
      }>
        <SolutionsContent solutionsData={solutionsData} />
      </Suspense>
    </>
  );
}

