'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    window.dispatchEvent(new Event('cookie-consent-updated'));
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    window.dispatchEvent(new Event('cookie-consent-updated'));
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100]"
        >
          <div className="bg-[#2C3E50]/95 backdrop-blur-md text-white p-6 rounded-2xl border border-white/10 shadow-2xl relative">
            <button
              onClick={handleReject}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-4 pr-6">
              <div className="w-10 h-10 rounded-xl bg-[#17A2B8]/20 border border-[#17A2B8]/30 flex items-center justify-center shrink-0">
                <ShieldAlert className="text-[#17A2B8] w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-base">Cookie Consent</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We use cookies to improve your browsing experience and analyze site traffic. Read our{' '}
                  <Link href="/cookies" className="text-[#17A2B8] underline hover:text-[#0D7A8C] transition-colors">
                    Cookie Policy
                  </Link>{' '}
                  for details.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={handleReject}
                className="flex-1 py-2 px-4 rounded-lg border border-white/10 hover:bg-white/5 text-sm font-semibold transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 py-2 px-4 rounded-lg bg-[#17A2B8] hover:bg-[#0D7A8C] text-sm font-semibold transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
