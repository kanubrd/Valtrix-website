'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function WhatsAppChat() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dragConstraints, setDragConstraints] = useState({ left: -300, right: 0, top: -500, bottom: 0 });

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setDragConstraints({
          left: -window.innerWidth + 120,
          right: 0,
          top: -window.innerHeight + 120,
          bottom: 0,
        });
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const phoneNumber = '919898123983';
  const welcomeMessage = encodeURIComponent("Hello Valtrix Team, I'm visiting your website and have a sourcing inquiry.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${welcomeMessage}`;

  return (
    <motion.div
      drag
      dragConstraints={dragConstraints}
      dragElastic={0.08}
      dragMomentum={false}
      whileDrag={{ scale: 1.05 }}
      style={{ touchAction: 'none' }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 cursor-grab active:cursor-grabbing transition-opacity duration-350 ${mounted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {mounted && (
        <>
      {/* Tooltip Card (Appears on Hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="hidden sm:flex flex-col items-start px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-2xl border border-emerald-500/20 text-slate-800 dark:text-slate-100 max-w-[200px]"
            style={{ pointerEvents: 'none' }}
          >
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Sourcing Support
            </span>
            <span className="text-xs font-semibold leading-tight">
              Chat with our experts
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing Background Rings */}
      <div className="relative">
        {/* Radar Ring 1 */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" style={{ animationDuration: '3s' }} />
        {/* Radar Ring 2 */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-pulse" />

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with VAM VALTRIX on WhatsApp"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_8px_30px_rgb(18,140,126,0.4)] hover:shadow-[0_12px_40px_rgb(37,211,102,0.5)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 border border-white/20 overflow-hidden"
        >
          <Image
            src="/whatsapp-icon.png"
            alt="WhatsApp Chat"
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
            </motion.a>
          </div>
        </>
      )}
    </motion.div>
  );
}
