'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProducts?: string[];
  mode?: 'quote' | 'sample';
}

const products = ['SusCat-I', 'SusPol-125', 'VAMShield-90', 'VAM BS-01', 'VAM Cat-M (Rust Converter)'];

export function QuoteModal({ isOpen, onClose, prefilledProducts = [], mode = 'quote' }: QuoteModalProps) {
  const [quoteName, setQuoteName] = useState('');
  const [quoteCompany, setQuoteCompany] = useState('');
  const [quoteEmail, setQuoteEmail] = useState('');
  const [quoteMaterial, setQuoteMaterial] = useState('');
  const [quoteStatus, setQuoteStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [productsOpen, setProductsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setSelectedProducts(prefilledProducts);
      setQuoteStatus('idle');
      setErrors({});
    }
  }, [isOpen, prefilledProducts]);

  const toggleProduct = (p: string) =>
    setSelectedProducts((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const handleQuoteSubmit = async () => {
    const newErrors: Record<string, string> = {};

    if (!quoteName.trim()) {
      newErrors.name = 'Name is required.';
    } else if (quoteName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    } else if (quoteName.length > 100) {
      newErrors.name = 'Name must be 100 characters or less.';
    }

    const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
    if (!quoteEmail.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(quoteEmail.trim()) || quoteEmail.length > 254) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (quoteMaterial && quoteMaterial.length > 500) {
      newErrors.material = 'Material description is too long (max 500 characters).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setQuoteStatus('error');
      return;
    }

    setErrors({});
    setQuoteStatus('loading');
    
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quoteName,
          company: quoteCompany,
          email: quoteEmail.trim().toLowerCase(),
          products: selectedProducts,
          material: quoteMaterial,
          _hp: '',
          type: mode === 'sample' ? 'Sample Request' : 'Quote Request'
        }),
      });
      
      if (!res.ok) throw new Error();
      
      setQuoteStatus('success');
      setQuoteName('');
      setQuoteCompany('');
      setQuoteEmail('');
      setQuoteMaterial('');
      setSelectedProducts([]);
    } catch {
      setQuoteStatus('error');
      setErrors({ global: 'Failed to submit request. Please check your network or try again.' });
    }
  };

  const titleText = mode === 'sample' 
    ? 'Request a Product Sample' 
    : 'Get Started with VAM VALTRIX';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titleText}>
      <div className="space-y-4 sm:space-y-5">
        {quoteStatus === 'success' ? (
          <div className="text-center py-6 bg-[#E6F7FA] rounded-xl border border-[#D1F2F7]">
            <CheckCircle className="w-12 h-12 text-[#17A2B8] mx-auto mb-3" />
            <p className="font-semibold text-lg text-[#2C3E50]">Request Received!</p>
            <p className="text-sm text-[#6B7280] mt-1 max-w-[80%] mx-auto leading-relaxed">
              {mode === 'sample' 
                ? 'Your product sample request has been registered. A specialist will coordinate dispatch details within 24 hours.'
                : 'A technical materials specialist will follow up with your customized quote within 24 hours.'}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3.5">
              <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label htmlFor="quote-name" className="sr-only">Your name</label>
                  <input
                    id="quote-name"
                    type="text"
                    placeholder="Your name *"
                    value={quoteName}
                    onChange={(e) => {
                      setQuoteName(e.target.value);
                      if (errors.name) setErrors(prev => { const n = {...prev}; delete n.name; return n; });
                    }}
                    required
                    autoComplete="name"
                    className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:border-[#17A2B8] focus:ring-4 focus:ring-[#17A2B8]/10 transition-all duration-200 min-h-[44px] ${errors.name ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}`}
                  />
                  {errors.name && (
                    <p role="alert" className="text-[11px] text-red-600 mt-1 pl-1">{errors.name}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="quote-company" className="sr-only">Company</label>
                  <input
                    id="quote-company"
                    type="text"
                    placeholder="Company name"
                    value={quoteCompany}
                    onChange={(e) => setQuoteCompany(e.target.value)}
                    autoComplete="organization"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#17A2B8] focus:ring-4 focus:ring-[#17A2B8]/10 transition-all duration-200 min-h-[44px]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="quote-email" className="sr-only">Work email</label>
                <input
                  id="quote-email"
                  type="email"
                  placeholder="Work email *"
                  value={quoteEmail}
                  onChange={(e) => {
                    setQuoteEmail(e.target.value);
                    if (errors.email) setErrors(prev => { const n = {...prev}; delete n.email; return n; });
                  }}
                  required
                  autoComplete="email"
                  className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:border-[#17A2B8] focus:ring-4 focus:ring-[#17A2B8]/10 transition-all duration-200 min-h-[44px] ${errors.email ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}`}
                />
                {errors.email && (
                  <p role="alert" className="text-[11px] text-red-600 mt-1 pl-1">{errors.email}</p>
                )}
              </div>

              {/* Product Selector Dropdown */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setProductsOpen((o) => !o)}
                  className="w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                >
                  <span className="text-sm font-semibold text-[#2C3E50]">
                    {mode === 'sample' ? 'Select Sample Product(s)' : 'Select Products of Interest'}
                    {selectedProducts.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full text-white bg-[#17A2B8] font-bold">
                        {selectedProducts.length}
                      </span>
                    )}
                  </span>
                  <svg
                    className={`w-4 h-4 text-[#17A2B8] transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {productsOpen && (
                  <div className="px-3 py-2.5 space-y-2.5 border-t border-gray-100 bg-white max-h-40 overflow-y-auto">
                    {products.map((product) => (
                      <label key={product} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product)}
                          onChange={() => toggleProduct(product)}
                          className="w-4 h-4 rounded border-gray-300 cursor-pointer shrink-0 accent-[#17A2B8]"
                        />
                        <span className="text-sm text-[#2C3E50] group-hover:text-[#17A2B8] transition-colors">
                          {product}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Message / Specifications */}
              <div>
                <input
                  type="text"
                  placeholder={mode === 'sample' ? 'Sample details / target specs (optional)' : 'Additional material requirements / spec details (optional)'}
                  value={quoteMaterial}
                  onChange={(e) => {
                    setQuoteMaterial(e.target.value);
                    if (errors.material) setErrors(prev => { const n = {...prev}; delete n.material; return n; });
                  }}
                  className={`w-full px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:border-[#17A2B8] focus:ring-4 focus:ring-[#17A2B8]/10 transition-all duration-200 min-h-[44px] ${errors.material ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}`}
                />
                {errors.material && (
                  <p role="alert" className="text-[11px] text-red-600 mt-1 pl-1">{errors.material}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <motion.div whileHover={{ y: -0.5, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={handleQuoteSubmit}
                disabled={quoteStatus === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-white font-bold disabled:opacity-60 min-h-[48px] hover:bg-[#0D7A8C] transition-all duration-300"
                style={{ background: '#17A2B8', borderRadius: '12px' }}
              >
                {quoteStatus === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : mode === 'sample' ? (
                  'Request Sample →'
                ) : (
                  'Get My Quote →'
                )}
              </button>
            </motion.div>

            {errors.global && (
              <p role="alert" className="text-center text-xs text-red-600 flex items-center justify-center gap-1.5 mt-2 bg-red-50 py-2.5 rounded-lg border border-red-100">
                <XCircle size={14} className="text-red-500 shrink-0" />
                {errors.global}
              </p>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}
