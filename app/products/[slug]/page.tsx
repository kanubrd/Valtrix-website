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

  const name = product.name;
  const title = `${name} | Industrial Additive Supplier Vadodara | Valtrix`;
  const description = `${product.name} formulated by Valtrix Advance Material Pvt. Ltd. in Vadodara, Gujarat. ISO 9001:2024 certified specialty additive engineered for wear reduction, corrosion protection, and equipment longevity.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      'Valtrix Advance Material Pvt. Ltd.',
      'Valtriks',
      'Valtrixx',
      'Waltrix',
      'Baltrix',
      'Valtrics',
      'Vadodara Gujarat',
      'industrial additives',
      'corrosion protection',
      'ISO certified',
      ...(product.seo?.keywords || [])
    ],
    alternates: {
      canonical: `https://www.valtrixmaterials.com/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
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
    'category': product.category,
    'sku': `VAM-${product.slug.toUpperCase()}`,
    'mpn': `VAM-${product.slug.toUpperCase()}-2024`,
    'itemCondition': 'https://schema.org/NewCondition',
    'image': product.images?.product ? `https://www.valtrixmaterials.com${product.images.product}` : 'https://www.valtrixmaterials.com/valtrix-logo-teal.png',
    'brand': {
      '@type': 'Brand',
      'name': 'Valtrix'
    },
    'manufacturer': {
      '@type': 'Organization',
      '@id': 'https://www.valtrixmaterials.com/#organization',
      'name': 'Valtrix Advance Material Pvt. Ltd.',
      'url': 'https://www.valtrixmaterials.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '318, Fortune Gateway, Chhani',
        'addressLocality': 'Vadodara',
        'addressRegion': 'Gujarat',
        'postalCode': '390024',
        'addressCountry': 'IN'
      }
    },
    'additionalProperty': ((product as any).specs || []).map((spec: any) => ({
      '@type': 'PropertyValue',
      'name': spec.label,
      'value': spec.value
    })),
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'INR',
      'lowPrice': '8000',
      'highPrice': '220000',
      'offerCount': '1',
      'priceRange': 'INR 8000 - INR 220000',
      'availability': 'https://schema.org/InStock'
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `https://www.valtrixmaterials.com/products/${product.slug}#faq`,
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `What is ${product.name} and what industrial applications is it engineered for?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `${product.name} is an ISO 9001:2024 certified specialty chemical formulation engineered by Valtrix Advance Material in Vadodara, Gujarat. Designed specifically for ${product.category?.toLowerCase() || 'industrial'} applications, it delivers superior boundary lubrication, thermal oxidation stability, and corrosion protection across heavy manufacturing machinery.`
        }
      },
      {
        '@type': 'Question',
        'name': `How does ${product.name} reduce industrial equipment downtime and maintenance overhead?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `${product.name} stabilizes chemical and tribological equilibrium under extreme pressures and elevated operating temperatures. By preventing sludge accumulation, micro-pitting, and premature fluid degradation, plants report up to a 42% reduction in unplanned downtime and extended maintenance drain intervals.`
        }
      },
      {
        '@type': 'Question',
        'name': `What are the dosage, dilution, and base oil compatibility recommendations for ${product.name}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Concentrated treat rates typically range from 2% to 10% depending on duty cycle, machine type, and severe load requirements. ${product.name} offers 100% drop-in miscibility with standard industrial base stocks and mineral/synthetic systems, eliminating expensive machine flushes.`
        }
      },
      {
        '@type': 'Question',
        'name': `Where is ${product.name} synthesized and how can I request a sample trial batch?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `All formulations are synthesized and ASTM quality-tested at our manufacturing facility: 318, Fortune Gateway, Chhani, Vadodara – 390024, Gujarat, India. Pilot trial batches (up to 20L) are screened and dispatched within 10 to 14 business days with full CoA (Certificate of Analysis) and SDS documentation.`
        }
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ProductPageContent product={product} />
    </>
  );
}
