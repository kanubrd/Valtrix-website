'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home',       href: '/' },
  { label: 'Industries', href: '/industries' },
  { label: 'Solutions',  href: '/solutions' },
  { label: 'About',      href: '/about' },
  { label: 'Contact',    href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted]               = useState(false);
  const [industriesHovered, setIndustriesHovered] = useState(false);
  const [industriesData, setIndustriesData] = useState<any[]>([]);
  const scrollProgress                       = useScrollProgress();
  const pathname                             = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    
    // Load industries dropdown content dynamically
    fetch('/api/admin/industries')
      .then(res => res.json())
      .then(data => setIndustriesData(data || []))
      .catch(err => console.error('Failed to load industries dropdown:', err));

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    // Properly integrate with Lenis smooth scroll
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Stop Lenis when menu is open
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      // Resume Lenis when menu closes
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    return () => { 
      document.body.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [mobileMenuOpen]);

  // Render a lightweight placeholder during SSR & first client render
  // to avoid hydration mismatch from browser CSS normalization
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50">
        <div style={{ height: 28, background: '#1A2B3C', borderBottom: 'none' }} />
        <nav style={{ height: 72, background: '#FFFFFF', borderBottom: '2px solid #E5E7EB' }} />
      </header>
    );
  }

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* ── Header Container with both utility bar and navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ position: 'fixed', transform: 'none' }}>
        {/* ── Top utility bar ── */}
        <div
          className="transition-all duration-300 overflow-hidden"
          style={{ 
            background: '#1A2B3C',
            borderBottom: 'none',
            position: 'relative',
            height: isScrolled ? 0 : 28,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"
            style={{ height: 28 }}>
            <a
              href="tel:+919898123983"
              className="flex items-center gap-1.5 text-xs transition-colors"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#17A2B8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              <Phone size={11} />
              <span>+91 98981 23983</span>
            </a>
            <a
              href="mailto:info@valtrixmaterials.com"
              className="flex items-center gap-1.5 text-xs transition-colors"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#17A2B8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              <Mail size={11} />
              <span>info@valtrixmaterials.com</span>
            </a>
          </div>
        </div>

        {/* ── Main navbar ── */}
        <nav
          suppressHydrationWarning
          className={cn(
            'transition-all duration-300',
            isScrolled 
              ? 'shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05),0_10px_20px_-2px_rgba(0,0,0,0.04)]' 
              : 'shadow-sm',
          )}
          style={{
            height: isScrolled ? 64 : 72,
            background: isScrolled ? 'rgba(255, 255, 255, 0.7)' : '#FFFFFF',
            backdropFilter: 'blur(16px)',
            borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(0, 0, 0, 0.04)',
            position: 'relative',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* Logo — Ultra HD clean rendering */}
          <Link href="/" className="flex items-center shrink-0 py-2" suppressHydrationWarning>
            <Image
              src="/valtrix-logo-teal.png"
              alt="VAM VALTRIX Logo"
              width={140}
              height={55}
              sizes="(max-width: 768px) 140px, 172px"
              className="w-auto h-auto"
              style={{ 
                height: isScrolled ? '44px' : '51px',
                width: 'auto',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center',
              }}
              priority
              quality={100}
              unoptimized
            />
          </Link>

          {/* Desktop nav — centered text links with hover dropdowns */}
          <div className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              const textColor = '#2C3E50';
              const hoverColor = '#17A2B8';
              
              if (item.label === 'Industries') {
                return (
                  <div
                    key={item.href}
                    className="relative py-4"
                    onMouseEnter={() => setIndustriesHovered(true)}
                    onMouseLeave={() => setIndustriesHovered(false)}
                  >
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-sm font-bold tracking-wide transition-all duration-250 uppercase rounded-xl flex items-center gap-1"
                      style={{
                        color: isActive ? '#17A2B8' : textColor,
                        background: isActive ? 'rgba(23, 162, 184, 0.08)' : 'transparent',
                        letterSpacing: '0.02em',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.color = hoverColor;
                          (e.currentTarget as HTMLElement).style.background = 'rgba(23, 162, 184, 0.04)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.color = textColor;
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }
                      }}
                    >
                      <span>{item.label}</span>
                      <svg
                        className={cn("w-3 h-3 transition-transform duration-200", industriesHovered && "rotate-180")}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Animated Dropdown Menu */}
                    <AnimatePresence>
                      {industriesHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: '0',
                            width: '320px',
                            background: '#FFFFFF',
                            borderRadius: '16px',
                            boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02)',
                            border: '1px solid #E2E8F0',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px',
                            zIndex: 100,
                            backdropFilter: 'blur(20px)',
                          }}
                        >
                          <div className="px-3 py-1.5 text-xxs font-extrabold uppercase tracking-wider text-[#94A3B8] border-b border-gray-50 mb-1">
                            Target Industries
                          </div>
                          {industriesData.map((ind: any) => (
                            <Link
                              key={ind.slug}
                              href={`/industries/${ind.slug}`}
                              style={{
                                padding: '10px 14px',
                                borderRadius: '10px',
                                fontSize: '13px',
                                fontWeight: '700',
                                color: '#475569',
                                transition: 'all 0.25s',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                              }}
                              className="hover:bg-[#E6F7FA]/75 hover:text-[#17A2B8] group"
                            >
                              <span>{ind.title}</span>
                              <span className="text-xxs font-normal text-gray-400 group-hover:text-[#17A2B8]/80 line-clamp-1">
                                {ind.description}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-bold tracking-wide transition-all duration-250 uppercase rounded-xl"
                  style={{
                    color: isActive ? '#17A2B8' : textColor,
                    background: isActive ? 'rgba(23, 162, 184, 0.08)' : 'transparent',
                    letterSpacing: '0.02em',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = hoverColor;
                      (e.currentTarget as HTMLElement).style.background = 'rgba(23, 162, 184, 0.04)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = textColor;
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center shrink-0">
            <motion.div
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="text-sm font-semibold text-white transition-all duration-200 block shadow-sm hover:shadow"
                style={{
                  background: '#17A2B8',
                  padding: '10px 24px',
                  borderRadius: '12px',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#0D7A8C')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#17A2B8')}
              >
                Request a Quote
              </Link>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors"
            style={{ 
              color: '#2C3E50',
              background: '#F3F4F6',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#E5E7EB';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#F3F4F6';
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Scroll progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 3,
            background: 'linear-gradient(90deg, #17A2B8 0%, #0D7A8C 100%)',
            width: `${scrollProgress}%`,
            transition: 'width 150ms linear',
            boxShadow: '0 0 8px rgba(23,162,184,0.5)',
          }}
        />
      </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: 'rgba(0,0,0,0.25)', top: isScrolled ? 64 : 100 }}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed left-0 right-0 z-40 md:hidden transition-all duration-300',
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none -translate-y-4',
        )}
        style={{
          top: isScrolled ? 64 : 100,
          background: '#ffffff',
          borderBottom: '1px solid #EAEAEA',
          boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
        }}
      >
        <div className="px-4 py-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 font-semibold text-sm min-h-[48px] transition-all duration-200"
                style={{
                  color: isActive ? '#17A2B8' : '#2C3E50',
                  background: isActive ? '#E6F7FA' : 'transparent',
                  borderRadius: '12px',
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-gray-100">
            <Link
              href="/contact"
              className="flex items-center justify-center px-4 py-3 text-sm font-semibold text-white min-h-[48px] transition-colors shadow-sm"
              style={{ 
                background: '#17A2B8',
                borderRadius: '12px'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
