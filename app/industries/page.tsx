import { Metadata } from 'next';
import { getIndustries } from '@/lib/content-utils';
import { IndustriesContent } from './industries-content';

export const metadata: Metadata = {
  title: 'Target Industries | Custom Additive Engineering – Valtrix (Vadodara, India)',
  description: 'Explore custom chemical formulations and additive engineering serving automotive, metallurgy, and electroplating industries in Vadodara, India.',
  keywords: [
    'industries served',
    'valtrix industries',
    'automotive chemistry',
    'metalworking fluids target market',
    'surface treatment industries'
  ],
  openGraph: {
    title: 'Target Industries | Custom Additive Engineering – Valtrix (Vadodara, India)',
    description: 'Explore custom chemical formulations and additive engineering serving automotive, metallurgy, and electroplating industries in Vadodara, India.',
    url: 'https://www.valtrixmaterials.com/industries',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.valtrixmaterials.com/industries',
  },
};

export default function IndustriesPage() {
  const industries = getIndustries();
  return <IndustriesContent industries={industries} />;
}
