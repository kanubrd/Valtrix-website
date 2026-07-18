import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight, Calendar, Tag } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { articlesList } from '@/data/articles';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articlesList.map((art) => ({ slug: art.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesList.find((art) => art.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} - Valtrix Insights`,
    description: article.summary,
    alternates: {
      canonical: `https://www.valtrixmaterials.com/resources/${slug}`,
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = articlesList.find((art) => art.slug === slug);

  if (!article) {
    notFound();
  }

  const baseUrl = 'https://www.valtrixmaterials.com';
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.summary,
    'image': article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`,
    'datePublished': new Date(article.publishedDate).toISOString(),
    'author': {
      '@type': 'Organization',
      'name': 'VAM VALTRIX'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'VAM VALTRIX',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.valtrixmaterials.com/valtrix-logo-teal.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.valtrixmaterials.com/resources/${slug}`
    }
  };

  return (
    <div className="pt-20 sm:pt-24 bg-gray-50 min-h-screen">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium font-sans">
          <Link href="/" className="hover:text-[#17A2B8] transition-colors">Home</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <Link href="/resources" className="hover:text-[#17A2B8] transition-colors">Resources</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-[#2C3E50] truncate">{article.title}</span>
        </nav>
      </div>

      {/* Article Container */}
      <Section className="py-6 sm:py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Hero Header block */}
          <div className="p-6 sm:p-10 border-b border-gray-100">
            {/* Meta tags */}
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-4 font-sans">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#17A2B8]" />
                {article.publishedDate}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-gray-100 text-gray-700">
                <Tag size={13} />
                {article.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2C3E50] mb-6 leading-tight tracking-tight">
              {article.title}
            </h1>
            
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-sans font-medium">
              {article.summary}
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 sm:h-96 w-full bg-gray-100">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              quality={90}
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          {/* Body Article HTML Content */}
          <div className="p-6 sm:p-10">
            <div 
              className="prose prose-teal max-w-none text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />

            {/* Back button */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-50 hover:bg-[#E6F7FA] text-[#2C3E50] hover:text-[#17A2B8] text-sm font-bold transition-all min-h-[44px]"
              >
                <ArrowLeft size={16} /> Back to Resources
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#17A2B8] hover:bg-[#0D7A8C] text-white text-sm font-bold transition-colors min-h-[44px]"
              >
                Inquire About Materials
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
