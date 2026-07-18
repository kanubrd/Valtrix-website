import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProducts, getProductBySlug } from '@/lib/content-utils';
import { ProductPageContent } from '@/components/products/ProductPageContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) return {};

  const productBenefits: Record<string, string> = {
    'corrosion-inhibitors': '24-Month Protection',
    'electroplating-chemicals': 'High Bath Stability',
    'metalworking-fluids': 'Extended Tool Life',
    'surface-treatments': '240hr Salt Spray',
    'sustainable-polyols': 'Cashew Shell Derived',
    'vamshield-90': 'Ash-Free Inhibitor'
  };

  const shortNames: Record<string, string> = {
    'corrosion-inhibitors': 'VCI Rust Inhibitors',
    'electroplating-chemicals': 'Plating Chemicals',
    'metalworking-fluids': 'Metalworking Coolants',
    'surface-treatments': 'Surface Treatments',
    'sustainable-polyols': 'Sustainable Polyols',
    'vamshield-90': 'VAMShield-90'
  };

  const name = shortNames[resolvedParams.slug] || product.name;
  const benefit = productBenefits[resolvedParams.slug] || 'Custom Additives';
  const title = `${name} | ${benefit} | VAM VALTRIX`;

  return {
    title,
    description: (product.seo?.description || product.description).slice(0, 150),
    keywords: product.seo?.keywords || [product.name, 'Valtrix'],
    alternates: {
      canonical: `https://www.valtrixmaterials.com/products/${product.slug}`,
    },
    openGraph: {
      title,
      description: (product.seo?.description || product.description).slice(0, 150),
      url: `https://www.valtrixmaterials.com/products/${product.slug}`,
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
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
        'name': 'Products',
        'item': 'https://www.valtrixmaterials.com/solutions'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': product.name,
        'item': `https://www.valtrixmaterials.com/products/${product.slug}`
      }
    ]
  };

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'description': product.description,
    'image': product.images?.product ? `https://www.valtrixmaterials.com${product.images.product}` : 'https://www.valtrixmaterials.com/valtrix-logo-teal.png',
    'brand': {
      '@type': 'Brand',
      'name': 'VAM VALTRIX'
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'INR',
      'lowPrice': '8000',
      'highPrice': '220000',
      'offerCount': '1',
      'priceRange': 'INR 8000 - INR 220000'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductPageContent product={product} />
    </>
  );
}
