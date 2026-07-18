import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Tag, FileText } from 'lucide-react';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { articlesList } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Resources & Insights - Advanced Materials Science',
  description: 'Explore VAM VALTRIX resources: industry insights, safety guidelines, and SDS/TDS document indexes for metallurgy and industrial chemistry.',
  keywords: [
    'materials science insights',
    'chemical industry blog',
    'sourcing guides',
    'sds database index',
    'valtrix resources'
  ],
  openGraph: {
    title: 'Resources & Insights | VAM VALTRIX',
    description: 'Explore VAM VALTRIX resources: industry insights, safety guidelines, and SDS/TDS document indexes for metallurgy and industrial chemistry.',
    url: 'https://www.valtrixmaterials.com/resources',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.valtrixmaterials.com/resources',
  },
};

export default function ResourcesPage() {
  return (
    <div className="pt-20 sm:pt-24 bg-gray-50 min-h-screen">
      {/* Hero */}
      <Section className="bg-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-5">
            <span className="w-2 h-2 rounded-full bg-[#17A2B8]" />
            <span className="text-sm font-semibold text-[#2C3E50] tracking-wide">Knowledge Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C3E50] mb-4 leading-tight">
            Insights & Documentation Library
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280]">
            Browse our technical resources, industry updates, and compliance downloads center.
          </p>
        </div>
      </Section>

      {/* Main Grid */}
      <Section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          
          {/* Left: Articles List */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-xl font-bold text-[#2C3E50] mb-6 flex items-center gap-2">
              📰 Latest Publications
            </h2>
            
            {articlesList.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
                <p className="text-gray-500 text-sm">No articles published yet. Please check back later.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {articlesList.map((article, idx) => (
                  <Reveal key={article.slug} delay={idx * 0.1} direction="up">
                    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow group h-full">
                      {/* Image */}
                      <div className="relative h-48 md:w-64 md:h-auto bg-gray-50 shrink-0">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 256px"
                          className="object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Details */}
                      <div className="p-6 flex flex-col justify-between flex-1">
                        <div>
                          {/* Tags */}
                          <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mb-3 font-sans">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={13} className="text-[#17A2B8]" />
                              {article.publishedDate}
                            </span>
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                              <Tag size={12} />
                              {article.category}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-[#2C3E50] mb-2 group-hover:text-[#17A2B8] transition-colors leading-snug">
                            <Link href={`/resources/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h3>
                          
                          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                            {article.summary}
                          </p>
                        </div>
                        
                        <Link
                          href={`/resources/${article.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#17A2B8] hover:text-[#0D7A8C] transition-colors"
                        >
                          Read Full Article <ArrowRight size={14} />
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/* Right: Quick Tools Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-bold text-[#2C3E50] mb-6">
              🛠️ Document Downloads
            </h2>
            
            {/* Download Center Callout Card */}
            <div className="bg-[#2C3E50] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-sm">
              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                <FileText size={160} />
              </div>
              <span className="inline-block px-2 py-0.5 rounded bg-white/10 text-xs font-bold text-[#D1F2F7] mb-3 uppercase tracking-wider font-sans">
                SDS & TDS Center
              </span>
              <h3 className="text-lg font-bold mb-3 leading-snug">
                Safety & Technical Datasheets Database
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Search, filter, and download updated SDS (Safety Data Sheets) and TDS (Technical Data Sheets) per product class for standard audits.
              </p>
              <Link
                href="/resources/downloads"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg bg-[#17A2B8] hover:bg-[#0D7A8C] text-sm font-semibold transition-all min-h-[44px]"
              >
                Go to Document Library <ArrowRight size={15} />
              </Link>
            </div>
            
            {/* Quick Sourcing Request box */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <h3 className="font-bold text-[#2C3E50] mb-2 text-base">Have Sourcing Questions?</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-5">
                Our materials specialists provide customized metallurgical and organic chemical compound sourcing reports within 24 hours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-100 hover:border-[#17A2B8] hover:bg-[#17A2B8] hover:text-white text-xs font-bold text-[#2C3E50] transition-all min-h-[38px]"
              >
                Contact a Specialist
              </Link>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
}
