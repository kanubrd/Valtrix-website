import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getIndustries, getIndustryBySlug } from '@/lib/content-utils';
import { IndustryPageContent } from '@/components/industries/IndustryPageContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const industries = getIndustries();
  return industries.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const industry = getIndustryBySlug(resolvedParams.slug);
  if (!industry) return {};

  const industryBenefits: Record<string, string> = {
    automotive: 'Corrosion Protection',
    metalworking: 'Machining Efficiency',
    electroplating: 'Superior Brightness',
    'surface-treatment': 'Adhesion Promotion'
  };

  const shortTitles: Record<string, string> = {
    automotive: 'Automotive & Gen',
    metalworking: 'Metalworking Fluids',
    electroplating: 'Electroplating',
    'surface-treatment': 'Surface Treatment'
  };

  const name = shortTitles[resolvedParams.slug] || industry.title;
  const benefit = industryBenefits[resolvedParams.slug] || 'Custom Additives';
  const title = `${name} | ${benefit} | VAM VALTRIX`;

  return {
    title,
    description: industry.description.slice(0, 150),
    keywords: industry.metadata?.keywords || [industry.title, 'Valtrix'],
    alternates: {
      canonical: `https://www.valtrixmaterials.com/industries/${resolvedParams.slug}`,
    },
  };
}

export default async function IndustryPage({ params }: Props) {
  const resolvedParams = await params;
  const industry = getIndustryBySlug(resolvedParams.slug);

  if (!industry) {
    notFound();
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.valtrixmaterials.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Industries',
        'item': 'https://www.valtrixmaterials.com/industries'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': industry.title,
        'item': `https://www.valtrixmaterials.com/industries/${resolvedParams.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <IndustryPageContent industry={industry} />
    </>
  );
}
