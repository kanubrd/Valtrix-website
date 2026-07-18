// Solutions index page listing specialty chemical solutions
import { Metadata } from 'next';
import { Suspense } from 'react';
import { SolutionsContent } from './solutions-content';

export const metadata: Metadata = {
  title: 'Industrial Specialty Chemical Solutions | VAM VALTRIX',
  description: 'Explore our range of industrial specialty chemical solutions: SusCat-I polymer, VAMShield-90 corrosion inhibitor, SusPol-125 bio-polyol & more.',
  keywords: [
    'industrial solutions',
    'specialty chemicals',
    'suscat-i polymer',
    'vamshield-90 inhibitor',
    'suspol-125 polyol',
    'metalworking chemicals',
    'corrosion inhibitors',
    'electroplating solutions'
  ],
  openGraph: {
    title: 'Industrial Specialty Chemical Solutions | VAM VALTRIX',
    description: 'Advanced materials for metalworking, electroplating & surface treatment. SusCat-I, VAMShield-90, SusPol-125 & more industrial solutions.',
    url: 'https://www.valtrixmaterials.com/solutions',
    type: 'website',
    images: [
      {
        url: 'https://www.valtrixmaterials.com/suscat.png',
        width: 800,
        height: 600,
        alt: 'VAM VALTRIX Industrial Solutions & Specialty Chemicals',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.valtrixmaterials.com/solutions',
  },
};

export default function SolutionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#17A2B8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Loading solutions...</p>
        </div>
      </div>
    }>
      <SolutionsContent />
    </Suspense>
  );
}
