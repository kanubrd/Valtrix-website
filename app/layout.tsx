import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar/navbar';
import { Footer } from '@/components/footer/footer';
import { CookieConsent } from '@/components/ui/cookie-consent';
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll';
import { WebVitalsProvider } from '@/components/providers/web-vitals-provider';
import { WhatsAppChat } from '@/components/ui/whatsapp-chat';
import { StickyQuoteCTA } from '@/components/ui/sticky-quote-cta';
import { GoogleAnalytics } from '@/components/providers/google-analytics';
import './globals.css';

// Subset + display:swap eliminates render-blocking font flash
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2C3E50',
};

export const metadata: Metadata = {
  title: {
    default: 'Valtrix | Advance Materials Pvt Ltd | Official Website',
    template: '%s | Valtrix'
  },
  description: 'Official website of Valtrix (Valtrix Advance Material Pvt. Ltd. - VAM). ISO 9001:2024 certified specialty chemicals & industrial additives manufacturer in Vadodara, Gujarat, India. Delivering custom additive packages, biostable metalworking fluids, and corrosion-resistant coatings.',
  keywords: [
    'Valtrix',
    'Valtrix Advance Material',
    'Valtrix Advance Material Pvt. Ltd',
    'Valtrix Materials',
    'Valtrix Official Website',
    'Valtrix Vadodara',
    'Valtrix Gujarat',
    'Valtrix India',
    'Valtrix chemicals',
    'VAM Valtrix',
    'Advanced Materials Supplier Vadodara',
    'industrial additives Vadodara',
    'specialty chemicals manufacturer Gujarat',
    'metalworking fluids',
    'electroplating brighteners',
    'surface treatment chemicals',
    'corrosion inhibitors',
    'ISO 9001:2024 certified chemical company',
    'Vadodara',
    'Gujarat',
    'India',
    'Valtriks',
    'Valtrixx',
    'Waltrix'
  ],
  authors: [{ name: 'Valtrix Advance Material Pvt. Ltd' }],
  creator: 'Valtrix Advance Material Pvt. Ltd',
  publisher: 'Valtrix Advance Material Pvt. Ltd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.valtrixmaterials.com'),
  alternates: {
    canonical: 'https://www.valtrixmaterials.com',
    languages: {
      'en-IN': 'https://www.valtrixmaterials.com',
      'en-US': 'https://www.valtrixmaterials.com',
      'x-default': 'https://www.valtrixmaterials.com',
    },
  },
  openGraph: {
    title: 'Valtrix | Advance Materials Pvt Ltd | Official Website',
    description: 'Official website of Valtrix (Valtrix Advance Material Pvt. Ltd. - VAM). ISO 9001:2024 certified specialty chemicals & industrial additives manufacturer in Vadodara, Gujarat. Delivering custom additive packages, metalworking fluids, and corrosion-resistant coatings.',
    url: 'https://www.valtrixmaterials.com',
    siteName: 'Valtrix',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.valtrixmaterials.com/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Valtrix Advance Material - ISO 9001:2024 Certified Facility in Vadodara, Gujarat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valtrix | Advance Materials Pvt Ltd | Official Website',
    description: 'Official website of Valtrix (Valtrix Advance Material Pvt. Ltd.). ISO 9001:2024 certified manufacturer of advanced industrial additives, metalworking fluids, and surface protection in Vadodara, Gujarat.',
    images: ['https://www.valtrixmaterials.com/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.valtrixmaterials.com/#organization',
  name: 'Valtrix',
  legalName: 'Valtrix Advance Material Private Limited',
  alternateName: ['Valtrix Advance Materials', 'Valtrix Advance Material Pvt. Ltd.', 'VAM VALTRIX', 'VALTRIX', 'Valtrix Materials', 'Valtriks', 'Valtrixx', 'Waltrix', 'Baltrix', 'Valtrics'],
  url: 'https://www.valtrixmaterials.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.valtrixmaterials.com/valtrix-logo-teal.png',
    width: 860,
    height: 337,
    caption: 'Valtrix Advance Material (VAM) Official Brand Logo'
  },
  image: 'https://www.valtrixmaterials.com/opengraph-image.png',
  description: 'Leading manufacturer of advanced materials, industrial chemicals & specialty additives for automotive, aerospace & manufacturing industries.',
  disambiguatingDescription: 'Valtrix Advance Material Pvt. Ltd. (VAM) is an ISO 9001:2024 certified specialty chemical manufacturer based in Vadodara, Gujarat, producing industrial lubricant additives, metalworking coolants, and non-chromate surface passivates (distinct from semiconductor EDA firm Valtrix Technologies or Valtrix Valve).',
  brand: {
    '@type': 'Brand',
    name: 'Valtrix',
    alternateName: ['VAM VALTRIX', 'Valtrix Advance Material', 'Valtrix Materials'],
    logo: 'https://www.valtrixmaterials.com/valtrix-logo-teal.png'
  },
  foundingDate: '2020',
  industry: [
    'Chemical Manufacturing',
    'Advanced Materials',
    'Industrial Chemicals',
    'Specialty Additives'
  ],
  products: [
    'Metalworking Fluids',
    'Electroplating Chemicals', 
    'Surface Treatment Solutions',
    'Corrosion Inhibitors',
    'Bio-based Polyols',
    'Rust Converters'
  ],
  areaServed: ['Vadodara', 'Gujarat', 'India', 'Worldwide'],
  serviceArea: {
    '@type': 'Country',
    name: 'India'
  },
  hasMap: 'https://maps.google.com/?q=Valtrix+Advance+Material+Vadodara',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-98981-23983',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    },
    {
      '@type': 'ContactPoint',
      email: 'info@valtrixmaterials.com',
      contactType: 'sales'
    }
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '318, Fortune Gateway, Chhani',
    addressLocality: 'Vadodara',
    postalCode: '390024',
    addressRegion: 'Gujarat',
    addressCountry: 'India'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '22.3486',
    longitude: '73.1812'
  },
  sameAs: [
    'https://twitter.com/vamvaltrix',
    'https://linkedin.com/company/vamvaltrix',
    'https://instagram.com/vamvaltrix'
  ],
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.valtrixmaterials.com/solutions?search={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Valtrix Advance Material Pvt. Ltd.',
  image: 'https://www.valtrixmaterials.com/opengraph-image.png',
  logo: 'https://www.valtrixmaterials.com/valtrix-logo-teal.png',
  '@id': 'https://www.valtrixmaterials.com/#localbusiness',
  url: 'https://www.valtrixmaterials.com',
  telephone: '+91 98981 23983',
  email: 'info@valtrixmaterials.com',
  hasMap: 'https://maps.google.com/?q=Valtrix+Advance+Material+Vadodara',
  certifications: 'ISO 9001:2024 Certified',
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'ISO 9001:2024 Certification'
    }
  ],
  areaServed: ['Vadodara', 'Gujarat', 'India', 'Worldwide'],
  knowsAbout: [
    'Industrial Additive Packages',
    'Metalworking Fluids',
    'Electroplating Brighteners',
    'Surface Treatment Technology',
    'Custom Chemical Formulation',
    'Tribological Wear Protection'
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '318, Fortune Gateway, Chhani',
    addressLocality: 'Vadodara',
    postalCode: '390024',
    addressRegion: 'Gujarat',
    addressCountry: 'India'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '22.3486',
    longitude: '73.1812'
  },
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '24'
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00'
  },
  sameAs: [
    'https://twitter.com/vamvaltrix',
    'https://linkedin.com/company/vamvaltrix',
    'https://instagram.com/vamvaltrix'
  ]
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.valtrixmaterials.com/#website',
  name: 'Valtrix',
  alternateName: [
    'Valtrix Advance Material',
    'Valtrix Advance Material Pvt. Ltd.',
    'Valtrix Materials',
    'VAM Valtrix',
    'Valtrix Official Website'
  ],
  url: 'https://www.valtrixmaterials.com',
  inLanguage: 'en-IN',
  description: 'Official website of Valtrix (Valtrix Advance Material Pvt. Ltd.), ISO 9001:2024 certified manufacturer of custom industrial additives, metalworking coolants, and protective coatings.',
  publisher: {
    '@id': 'https://www.valtrixmaterials.com/#organization'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Suppress third-party browser extension errors (e.g. Bitdefender TrafficLight / bis_skin_checked) from breaking dev overlay */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof window==='undefined')return;function s(a){if(!a)return false;for(var i=0;i<a.length;i++){var x=a[i],t='';if(typeof x==='string')t=x;else if(x&&typeof x==='object')t=(x.message||'')+' '+(x.stack||'')+' '+(x.componentStack||'')+' '+(x.description||'');if(t.indexOf('bis_skin_checked')!==-1||t.indexOf('chrome-extension:')!==-1||t.indexOf('moz-extension:')!==-1||t.indexOf('M_ID')!==-1||t.indexOf('TrafficLight')!==-1||t.indexOf('200.js')!==-1)return true;}return false;}var c=console.error;try{Object.defineProperty(console,'error',{configurable:true,enumerable:true,get:function(){return function(){if(s(arguments))return;return c.apply(console,arguments);};},set:function(fn){c=fn;}});}catch(e){console.error=function(){if(s(arguments))return;return c.apply(console,arguments);};}var o=window.onerror;window.onerror=function(m,u,l,col,err){if(s([m,u,err]))return true;if(typeof o==='function')return o.apply(this,arguments);return false;};var w=window.addEventListener;window.addEventListener=function(t,l,opt){if(t==='error'||t==='unhandledrejection'){var wrap=function(e){if(s([e&&e.message,e&&e.filename,e&&e.error,e&&e.reason])){if(typeof e.stopImmediatePropagation==='function')e.stopImmediatePropagation();if(typeof e.preventDefault==='function')e.preventDefault();return;}return l.apply(this,arguments);};return w.call(this,t,wrap,opt);}return w.apply(this,arguments);};function d(){var p=document.querySelectorAll('nextjs-portal');for(var i=0;i<p.length;i++){var sh=p[i].shadowRoot;if(sh){var txt=sh.textContent||'';if(txt.indexOf('bis_skin_checked')!==-1||txt.indexOf('chrome-extension:')!==-1||txt.indexOf('TrafficLight')!==-1||txt.indexOf('M_ID')!==-1){p[i].style.display='none';}}}}if(typeof MutationObserver!=='undefined'){new MutationObserver(d).observe(document.documentElement,{childList:true,subtree:true});}})();`
          }}
        />

        {/* Preload critical hero image */}
        <link rel="preload" as="image" href="/hero-banner-4k.webp" type="image/webp" />

        {/* Preconnect to critical font origin — eliminates connection latency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured data — < escaped to \u003c to prevent script injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd).replace(/</g, '\\u003c') }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c') }}
        />

        {/* Googlebot-Favicon & Search Engine Discovery Link Tags */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96x96.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/icon-144x144.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-[#1A1A1A]`} suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2.5 focus:bg-[#17A2B8] focus:text-white focus:rounded-xl focus:shadow-2xl focus:font-bold focus:outline-none focus:ring-2 focus:ring-white transition-all"
        >
          Skip to main content
        </a>
        <div className="viewport-frame" />
        <GoogleAnalytics />
        <WebVitalsProvider />
        <Navbar />
        <SmoothScrollProvider>
          <main id="main-content" tabIndex={-1} className="outline-none">{children}</main>
          <Footer />
          <CookieConsent />
          <WhatsAppChat />
          <StickyQuoteCTA />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
