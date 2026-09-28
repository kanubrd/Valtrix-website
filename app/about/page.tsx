import { Metadata } from 'next';
import AboutContent from './about-content';

export const metadata: Metadata = {
  title: 'About Us | Advanced Industrial Additives & Chemical Formulations Vadodara | Valtrix',
  description:
    'Discover Valtrix Advance Material Pvt. Ltd. (VAM) in Vadodara, Gujarat. Learn how our ISO 9001:2024 certified custom additive packages, biostable metalworking fluids, and non-chromate surface passivates prevent downtime and extend machinery life.',
  keywords: [
    'Advanced Industrial Additives Vadodara',
    'Chemical Formulations India',
    'Valtrix Advanced Materials',
    'custom chemical additive synthesis Gujarat',
    'industrial lubricant boosters',
    'metalworking fluids manufacturer',
    'electroplating brighteners',
    'non-chromate surface passivates',
    'ISO 9001:2024 chemical company Vadodara',
    'Valtrix Advance Material Pvt. Ltd.'
  ],
  openGraph: {
    title: 'About Us | Advanced Industrial Additives & Chemical Formulations Vadodara | Valtrix',
    description:
      'Discover Valtrix Advance Material Pvt. Ltd. (VAM) in Vadodara, Gujarat. ISO 9001:2024 certified custom additive packages, biostable coolants, and surface treatment technologies.',
    url: 'https://www.valtrixmaterials.com/about',
    type: 'website',
    images: [
      {
        url: 'https://www.valtrixmaterials.com/valtrix-logo.png',
        width: 1200,
        height: 630,
        alt: 'Valtrix Advance Material - Advanced Industrial Additives and Chemical Formulations Vadodara'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Advanced Industrial Additives & Chemical Formulations | Valtrix',
    description:
      'Custom industrial additives, metalworking coolants, and surface passivates from ISO 9001:2024 certified Valtrix in Vadodara, Gujarat.',
    images: ['https://www.valtrixmaterials.com/valtrix-logo.png']
  },
  alternates: {
    canonical: 'https://www.valtrixmaterials.com/about'
  }
};

const unifiedSchema = {
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
      description:
        'Valtrix Advance Material Pvt. Ltd. is an ISO 9001:2024 certified manufacturer of custom specialty chemicals, industrial additive packages, high-performance metalworking coolants, electroplating brighteners, and anti-corrosion surface conversion coatings.',
      telephone: '+91 98981 23983',
      email: 'info@valtrixmaterials.com',
      priceRange: '$$',
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
      hasMap: 'https://maps.google.com/?q=Valtrix+Advance+Material+Vadodara',
      areaServed: ['Vadodara', 'Gujarat', 'India', 'Worldwide'],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'ISO 9001:2024 Certification'
        }
      ],
      knowsAbout: [
        'Advanced Industrial Additives Vadodara',
        'Chemical Formulations India',
        'Valtrix Advanced Materials',
        'Metalworking Fluids',
        'Electroplating Brighteners',
        'Non-Chromate Surface Passivates',
        'Tribological Boundary Lubrication',
        'ASTM D2783 Extreme Pressure Testing',
        'ASTM B117 Salt Spray Corrosion Testing'
      ]
    },
    {
      '@type': 'Product',
      name: 'Valtrix Automotive Powertrain & Gear Additive Packages',
      description:
        'Liquid-soluble MoDTC and synthetic ester booster packages reducing boundary friction to 0.04, eliminating gear micro-spalling by 38%, and exceeding 400 kgf weld load under ASTM D2783.',
      brand: { '@type': 'Brand', name: 'Valtrix' },
      category: 'Industrial Lubricant Additives',
      manufacturer: { '@id': 'https://www.valtrixmaterials.com/#organization' }
    },
    {
      '@type': 'Product',
      name: 'VAM-CoolSyn™ Biostable Metalworking Coolants',
      description:
        'High-speed CNC machining concentrates engineered for stainless steel, titanium, and Inconel with heat resistance past 800°C, 57% tool life extension, and biostatic pH 9.0–9.4.',
      brand: { '@type': 'Brand', name: 'Valtrix' },
      category: 'Metalworking Fluids',
      manufacturer: { '@id': 'https://www.valtrixmaterials.com/#organization' }
    },
    {
      '@type': 'Product',
      name: 'VAM-PlateBright™ Electroplating Leveling & Brightener Systems',
      description:
        'Nanocrystalline electroplating leveling compounds that regulate cathode polarization, suppress hydrogen embrittlement, and reduce plating rejects by 45%.',
      brand: { '@type': 'Brand', name: 'Valtrix' },
      category: 'Electroplating Chemicals',
      manufacturer: { '@id': 'https://www.valtrixmaterials.com/#organization' }
    },
    {
      '@type': 'Product',
      name: 'VAM-PassShield™ Non-Chromate Surface Conversion Coatings',
      description:
        'Ambient-temperature organofunctional silane and nano-zirconium conversion coatings delivering over 1,000 hours of ASTM B117 salt spray corrosion resistance with zero hazardous sludge.',
      brand: { '@type': 'Brand', name: 'Valtrix' },
      category: 'Surface Treatment Chemicals',
      manufacturer: { '@id': 'https://www.valtrixmaterials.com/#organization' }
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.valtrixmaterials.com/about#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What additives and chemical formulations does Valtrix provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Valtrix provides custom industrial additive packages including liquid MoDTC anti-wear boosters, VAM-CoolSyn™ biostable cutting coolants, VAM-PlateBright™ electroplating leveling brighteners, and VAM-PassShield™ non-chromate conversion passivates, engineered in Vadodara, Gujarat.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can Valtrix additive packages be blended directly into existing plant lubricants?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We engineer concentrated, drop-in booster packages that are 100% miscible with API Group I, II, III, and synthetic PAO base oils, allowing industrial plants to upgrade wear and oxidation resistance without flushing sumps.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does Valtrix eliminate bacterial sump odor without toxic biocides?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our fluids use biostatic synthetic ester technology that naturally buffers alkaline pH between 9.0 and 9.4, depriving anaerobic bacteria of nutrients and preventing foul odors without formaldehyde-releasing biocides or secondary amines.'
          }
        },
        {
          '@type': 'Question',
          name: 'Where is Valtrix Advance Material located and what are trial batch lead times?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Valtrix operates from 318, Fortune Gateway, Chhani, Vadodara - 390024, Gujarat, India. Pilot trial batches (up to 20L) are synthesized, ASTM-screened, and dispatched within 10 to 14 business days with full CoA and TDS documentation.'
          }
        }
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
          name: 'About Us',
          item: 'https://www.valtrixmaterials.com/about'
        }
      ]
    }
  ]
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(unifiedSchema).replace(/</g, '\\u003c') }}
      />
      <AboutContent />
    </>
  );
}
