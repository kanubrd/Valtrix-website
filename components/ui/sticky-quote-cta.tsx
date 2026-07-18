'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export function StickyQuoteCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // Show only on solutions and industries subroutes
  const isMatch = pathname.startsWith('/solutions/') || pathname.startsWith('/industries/');

  useEffect(() => {
    if (!isMatch) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount in case page is already scrolled down
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMatch]);

  if (!isMatch) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 z-40"
        >
          <Link
            href="/contact?ref=sticky"
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#2C3E50] hover:bg-[#17A2B8] text-white text-xs sm:text-sm font-bold shadow-xl border border-white/10 transition-all min-h-[44px]"
            style={{
              boxShadow: '0 8px 32px rgba(44, 62, 80, 0.25)'
            }}
          >
            <FileText size={16} className="text-[#17A2B8] shrink-0" />
            <span>Request Quote</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
