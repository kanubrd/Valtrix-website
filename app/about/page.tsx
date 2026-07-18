import { Metadata } from 'next';
import AboutContent from './about-content';

export const metadata: Metadata = {
  title: 'About Us | Advanced Materials Innovation – Valtrix (Vadodara, India)',
  description: 'Pioneering advanced materials & industrial chemicals since 2020. Discover Valtrix, a leading chemical manufacturer in Vadodara, India.',
  keywords: [
    'about valtrix',
    'advanced materials company',
    'industrial chemicals manufacturer',
    'materials innovation',
    'vadodara chemicals company',
    'specialty additives manufacturer'
  ],
  openGraph: {
    title: 'About Us | Advanced Materials Innovation – Valtrix (Vadodara, India)',
    description: 'Pioneering advanced materials & industrial chemicals since 2020. Discover Valtrix, a leading chemical manufacturer in Vadodara, India.',
    url: 'https://www.valtrixmaterials.com/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.valtrixmaterials.com/about',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
