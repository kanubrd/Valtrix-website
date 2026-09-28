import { Metadata } from 'next';
import { ComplianceContent } from './compliance-content';

export const metadata: Metadata = {
  title: 'Material Compliance & Certifications (ISO 9001:2024, RoHS, REACH) | Valtrix',
  description: 'Valtrix Advance Material Pvt. Ltd. adheres to ISO 9001:2024, REACH (EC 1907/2006), RoHS 3, and ASTM testing standards for industrial chemical formulations and additives in Vadodara, Gujarat.',
  keywords: [
    'ISO 9001:2024 chemical certification',
    'REACH compliant additives',
    'RoHS compliant metalworking fluids',
    'ASTM D2783 testing',
    'ASTM B117 salt spray',
    'Valtrix compliance Vadodara',
    'specialty chemicals quality assurance'
  ],
  openGraph: {
    title: 'Material Compliance & Certifications (ISO 9001:2024, RoHS, REACH) | Valtrix',
    description: 'Valtrix Advance Material Pvt. Ltd. adheres to ISO 9001:2024, REACH, RoHS 3, and ASTM standards for specialty chemical formulations in Vadodara, Gujarat.',
    url: 'https://www.valtrixmaterials.com/compliance',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.valtrixmaterials.com/compliance',
  },
};

export default function CompliancePage() {
  const complianceSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Material Compliance & Quality Certifications',
    description: 'Compliance, ISO 9001:2024 standards, REACH and RoHS compliance statements for Valtrix Advance Material Pvt. Ltd.',
    publisher: {
      '@type': 'Organization',
      name: 'Valtrix Advance Material Pvt. Ltd.',
      url: 'https://www.valtrixmaterials.com',
      logo: 'https://www.valtrixmaterials.com/valtrix-logo-teal.png',
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'ISO 9001:2024 Quality Management Certification'
        }
      ]
    }
  };

  const breadcrumbSchema = {
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
        name: 'Compliance',
        item: 'https://www.valtrixmaterials.com/compliance'
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(complianceSchema) }}
      />
      <ComplianceContent />
    </>
  );
}
