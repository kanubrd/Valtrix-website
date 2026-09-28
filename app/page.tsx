import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/hero/hero-section';
import { CertificationShowcase } from '@/components/sections/certification-showcase';
import { TestimonialsSkeleton } from '@/components/skeletons/testimonials-skeleton';
import { CTASkeleton } from '@/components/skeletons/cta-skeleton';
import { PrefetchDynamicSections } from '@/components/prefetch-dynamic-sections';
import { HomeIndustriesSection } from '@/components/sections/home-industries';
import { getIndustries } from '@/lib/content-utils';
import { Metadata } from 'next';

// Lazy-load below-the-fold sections — reduces initial JS bundle
const TestimonialsSection = dynamic(
  () => import('@/components/sections/testimonials').then((m) => m.TestimonialsSection),
  { ssr: true, loading: () => <TestimonialsSkeleton /> }
);

const CTABanner = dynamic(
  () => import('@/components/sections/cta-banner').then((m) => m.CTABanner),
  { ssr: true, loading: () => <CTASkeleton /> }
);

export const metadata: Metadata = {
  title: 'Valtrix | Advance Materials Pvt Ltd | Official Website',
  description: 'Official website of Valtrix (Valtrix Advance Material Pvt. Ltd. - VAM), Vadodara, Gujarat. ISO 9001:2024 certified manufacturer of custom industrial additive packages, metalworking fluids, and corrosion-resistant coatings.',
  keywords: [
    'Valtrix',
    'Valtrix Advance Material',
    'Valtrix Advance Materials',
    'Valtrix Advance Material Pvt. Ltd.',
    'Valtrix Materials',
    'Valtrix Official Website',
    'Valtrix India',
    'Valtrix Vadodara',
    'Valtrix Gujarat',
    'Valtrix Chemicals',
    'VAM Valtrix',
    'Advanced Materials Supplier Vadodara',
    'industrial additives Vadodara',
    'metalworking fluids manufacturer',
    'specialty chemicals Gujarat',
    'corrosion resistant coatings',
    'Rust Converter VAM RC 01',
    'Polyurethane Building Blocks',
    'High Build Coatings',
    'ISO 9001:2024 chemical company'
  ],
  openGraph: {
    title: 'Valtrix | Advance Materials Pvt Ltd | Official Website',
    description: 'Official website of Valtrix (Valtrix Advance Material Pvt. Ltd. - VAM), Vadodara, Gujarat. ISO 9001:2024 certified manufacturer of custom industrial additive packages, metalworking fluids, and corrosion-resistant coatings.',
    url: 'https://www.valtrixmaterials.com',
    siteName: 'Valtrix',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valtrix | Advance Materials Pvt Ltd | Official Website',
    description: 'Official website of Valtrix (Valtrix Advance Material Pvt. Ltd. - VAM), Vadodara, Gujarat. ISO 9001:2024 certified manufacturer of custom industrial additives and specialty materials.',
  },
  alternates: {
    canonical: 'https://www.valtrixmaterials.com',
    languages: {
      'en-IN': 'https://www.valtrixmaterials.com',
      'en-US': 'https://www.valtrixmaterials.com',
      'x-default': 'https://www.valtrixmaterials.com',
    },
  },
};

export default function Home() {
  const industries = getIndustries();
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CertificationShowcase />
      <TestimonialsSection />
      <CTABanner />
      <HomeIndustriesSection industries={industries} />
      <PrefetchDynamicSections />
    </div>
  );
}
