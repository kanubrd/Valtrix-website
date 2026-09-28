// Contact Us page container importing the client-side content component
import { Metadata } from 'next';

import { ContactClient } from './contact-client';

export const metadata: Metadata = {
  title: 'Contact Valtrix | Advanced Materials Supplier & Quotes | Vadodara, Gujarat',
  description: 'Get in touch with Valtrix Advance Material Pvt. Ltd., ISO 9001:2024 certified specialty chemical & industrial additive manufacturer in Vadodara, Gujarat. Request custom formulations, quotes, TDS/SDS datasheets, and trial samples.',
  keywords: [
    'Advanced Materials Supplier Vadodara',
    'Valtrix Advance Material Pvt. Ltd.',
    'chemical procurement quote',
    'industrial additives Vadodara',
    'metalworking fluid manufacturer Gujarat',
    'surface treatment chemicals India',
    'custom chemical formulation quote',
    'Vadodara chemical company',
    'Valtrix contact'
  ],
  openGraph: {
    title: 'Contact Valtrix | Advanced Materials Supplier & Quotes | Vadodara, Gujarat',
    description: 'Get in touch with Valtrix Advance Material Pvt. Ltd., ISO 9001:2024 certified specialty chemical & industrial additive manufacturer in Vadodara, Gujarat. Request custom quotes, technical datasheets, and samples.',
    url: 'https://www.valtrixmaterials.com/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.valtrixmaterials.com/contact',
  },
};

export default function ContactPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
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
        name: 'Contact',
        item: 'https://www.valtrixmaterials.com/contact'
      }
    ]
  };

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Valtrix Advance Material Pvt. Ltd.',
    description: 'Valtrix Advance Material Pvt. Ltd. delivers ISO 9001:2024 certified advanced industrial additives, corrosion-resistant coatings, and custom chemical solutions in Vadodara, Gujarat.',
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
    telephone: '+91 98981 23983',
    email: 'info@valtrixmaterials.com',
    url: 'https://www.valtrixmaterials.com/contact',
    priceRange: '$$',
    certifications: 'ISO 9001:2024 Certified',
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'ISO 9001:2024 Quality Management Certification'
      }
    ],
    knowsAbout: [
      'Industrial Additives',
      'Metalworking Coolants',
      'Corrosion Inhibitors',
      'Electroplating Brighteners',
      'Surface Passivation'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '24'
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Where is Valtrix Advance Material Pvt. Ltd. located?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Valtrix Advance Material Pvt. Ltd. is located at 318, Fortune Gateway, Chhani, Vadodara - 390024, Gujarat, India.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How can I contact Valtrix Advance Material Pvt. Ltd.?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'You can contact Valtrix Advance Material Pvt. Ltd. via email at info@valtrixmaterials.com or by phone at +91 98981 23983.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is Valtrix ISO certified?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, Valtrix Advance Material Pvt. Ltd. is an ISO 9001:2024 certified manufacturer of industrial specialty chemicals, corrosion-resistant coatings, and custom additives.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is Valtriks or Valtrixx the same as Valtrix Advance Material Pvt. Ltd.?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, Valtriks, Valtrixx, Waltrix, Baltrix, and Valtrics are common alternative spellings and search terms for Valtrix Advance Material Pvt. Ltd., Vadodara, Gujarat.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
