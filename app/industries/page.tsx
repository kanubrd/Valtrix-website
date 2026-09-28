import { Metadata } from 'next';
import { getIndustries } from '@/lib/content-utils';
import { IndustriesContent } from './industries-content';

export const metadata: Metadata = {
  title: 'Target Industries & Market Segments | Valtrix Vadodara',
  description: 'Valtrix Advance Material engineers custom specialty chemical additives, metalworking fluids, and surface treatments for automotive, CNC machining, electroplating, and heavy industrial operations in Vadodara, Gujarat.',
  keywords: [
    'Automotive Manufacturing chemicals',
    'Metalworking fluid additives',
    'Electroplating chemicals',
    'Surface treatment additives',
    'industrial additives Vadodara',
    'Valtrix Advance Material Pvt. Ltd.',
    'Vadodara Gujarat',
    'ISO 9001:2024'
  ],
  openGraph: {
    title: 'Target Industries & Market Segments | Valtrix Vadodara',
    description: 'Valtrix Advance Material engineers custom specialty chemical additives, metalworking fluids, and surface treatments for automotive, CNC machining, electroplating, and heavy industrial operations in Vadodara, Gujarat.',
    url: 'https://www.valtrixmaterials.com/industries',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.valtrixmaterials.com/industries',
  },
};

export default function IndustriesPage() {
  const industries = getIndustries();

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Valtrix Advance Material Pvt. Ltd.',
    description: 'Valtrix Advance Material Pvt. Ltd. delivers advanced industrial additives, corrosion-resistant coatings, and custom chemical solutions in Vadodara, Gujarat. ISO 9001:2024 certified.',
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
      latitude: '22.3072',
      longitude: '73.1812'
    },
    telephone: '+91 98981 23983',
    email: 'info@valtrixmaterials.com',
    url: 'https://www.valtrixmaterials.com',
    certifications: 'ISO 9001:2024 Certified'
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What market segments does Valtrix Advance Material Pvt. Ltd. serve?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Valtrix Advance Material Pvt. Ltd. serves Automotive Manufacturing, Maintenance & Repair, General Industrial, Metalworking Fluids, Electroplating, and Surface Treatment market segments across Vadodara, Gujarat, India, and global exports.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do Rust Converter VAM RC 01 and High Build Coatings help Maintenance & Repair?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Rust Converter VAM RC 01 converts surface rust into a stable protective layer, while High Build Coatings provide thick-film physical protection against chemical degradation, reducing downtime and extending machinery life.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Why are Polyurethane Building Blocks critical for Automotive Manufacturing?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Polyurethane Building Blocks deliver superior mechanical flexibility, high chemical resistance, and weatherability for automotive foams, adhesives, and protective coatings.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <IndustriesContent industries={industries} />
    </>
  );
}
