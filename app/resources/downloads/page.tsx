import { Metadata } from 'next';
import { Suspense } from 'react';
import { DownloadsContent } from './downloads-content';

export const metadata: Metadata = {
  title: 'SDS & TDS Technical Document Downloads',
  description: 'Download Safety Data Sheets (SDS) and Technical Data Sheets (TDS) for VAM VALTRIX metals, polymers, coatings, and compliance products.',
  keywords: [
    'sds downloads',
    'tds downloads',
    'chemical safety data sheets',
    'technical spec sheets',
    'valtrix documents'
  ],
  openGraph: {
    title: 'SDS & TDS Technical Document Downloads | VAM VALTRIX',
    description: 'Download Safety Data Sheets (SDS) and Technical Data Sheets (TDS) for VAM VALTRIX metals, polymers, coatings, and compliance products.',
    url: 'https://www.valtrixmaterials.com/resources/downloads',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.valtrixmaterials.com/resources/downloads',
  },
};

export default function DownloadsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-sm font-semibold text-gray-500">Loading document library...</span>
      </div>
    }>
      <DownloadsContent />
    </Suspense>
  );
}
