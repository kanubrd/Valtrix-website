'use client';

import dynamic from 'next/dynamic';

export const ContactClient = dynamic(
  () => import('./contact-content').then((mod) => mod.ContactContent),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFB]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#17A2B8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Loading contact form...</p>
        </div>
      </div>
    ),
  }
);
