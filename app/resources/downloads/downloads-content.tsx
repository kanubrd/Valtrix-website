'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Section, SectionTitle } from '@/components/ui/section';
import { Reveal } from '@/components/animations/reveal';
import { FileText, Download, Search, AlertCircle } from 'lucide-react';
import { documentsList, DocumentItem } from '@/data/documents';
import { trackEvent } from '@/lib/gtag';

export function DownloadsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Filter based on product from URL query
  useEffect(() => {
    const productParam = searchParams.get('product');
    if (productParam) {
      setSelectedProduct(productParam);
    }
  }, [searchParams]);

  // Unique product names for filter options
  const uniqueProducts = Array.from(
    new Set(documentsList.map((doc) => ({ id: doc.productId, name: doc.productName })))
  );

  // Filter logic
  const filteredDocs = documentsList.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProduct = selectedProduct === 'all' || doc.productId === selectedProduct;
    const matchesType = selectedType === 'all' || doc.type === selectedType;

    return matchesSearch && matchesProduct && matchesType;
  });

  return (
    <div className="pt-16 sm:pt-20 bg-gray-50 min-h-screen">
      {/* Hero */}
      <Section className="bg-white py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center px-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#E6F7FA] border border-[#D1F2F7] mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-[#17A2B8]" />
            <span className="text-sm font-semibold text-[#2C3E50] tracking-wide">Document Library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2C3E50] mb-4 sm:mb-6 leading-tight">
            SDS & TDS Download Center
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280]">
            Access updated Safety Data Sheets (SDS) and Technical Data Sheets (TDS) for all VAM VALTRIX materials and coordination categories.
          </p>
        </motion.div>
      </Section>

      {/* Main Listing Section */}
      <Section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Bar */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm mb-8 grid gap-4 md:grid-cols-4 items-center">
            {/* Search */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search documents by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8] min-h-[44px]"
              />
            </div>

            {/* Product Filter */}
            <div>
              <label htmlFor="product-filter" className="sr-only">Filter by Solution</label>
              <select
                id="product-filter"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8] min-h-[44px]"
              >
                <option value="all">All Categories</option>
                {uniqueProducts.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Document Type Filter */}
            <div>
              <label htmlFor="type-filter" className="sr-only">Filter by Document Type</label>
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8] min-h-[44px]"
              >
                <option value="all">All Document Types</option>
                <option value="SDS">Safety Data Sheets (SDS)</option>
                <option value="TDS">Technical Data Sheets (TDS)</option>
              </select>
            </div>
          </div>

          {/* Results Grid */}
          {filteredDocs.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center max-w-xl mx-auto flex flex-col items-center">
              <AlertCircle size={40} className="text-[#17A2B8] mb-4" />
              <h3 className="text-base sm:text-lg font-bold text-[#2C3E50] mb-2">No documents found</h3>
              <p className="text-sm text-gray-500">Try adjusting your filters or search keywords to find standard SDS/TDS files.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocs.map((doc) => (
                <Reveal key={doc.id} direction="up" delay={0.05}>
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                    {/* Header */}
                    <div className="flex gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#E6F7FA] flex items-center justify-center text-[#17A2B8] shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mb-1.5 ${
                          doc.type === 'SDS' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-teal-50 text-teal-600 border border-teal-100'
                        }`}>
                          {doc.type}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-[#2C3E50] leading-snug line-clamp-2">
                          {doc.title}
                        </h3>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                      <span>Category: <strong className="text-gray-700 font-semibold">{doc.productName}</strong></span>
                      <span>Size: <strong className="text-gray-700 font-semibold">{doc.fileSize}</strong></span>
                    </div>

                    {/* Download Button */}
                    <a
                      href={doc.filePath}
                      onClick={() => {
                        trackEvent({
                          action: 'download_document',
                          category: 'Resources',
                          label: `${doc.type} - ${doc.title}`,
                        });
                      }}
                      className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gray-50 hover:bg-[#17A2B8] hover:text-white border border-gray-100 hover:border-[#17A2B8] text-xs font-bold text-[#2C3E50] transition-colors min-h-[38px]"
                    >
                      <Download size={14} /> Download Document
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
