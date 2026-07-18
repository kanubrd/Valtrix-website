'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { socialLinks } from '@/config/social';

const footerLinks = {
  Company: [
    { label: 'About Us',   href: '/about'      },
    { label: 'Solutions',  href: '/solutions'   },
    { label: 'Industries', href: '/industries'  },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Use',   href: '/terms-of-use'   },
    { label: 'Cookies',        href: '/cookies'        },
    { label: 'Compliance',     href: '/compliance'     },
  ],
};

import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  // Ensure client matches server on first render
  React.useEffect(() => { setMounted(true); }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    // Honeypot — bots fill this, humans don't
    if (honeypot) {
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      return;
    }

    // Client-side email format check (server re-validates too)
    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(trimmed) || trimmed.length > 254) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const controller = new AbortController();
      const timeoutId  = setTimeout(() => controller.abort(), 10_000);

      const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed, _hp: honeypot }),
          signal: controller.signal,
        });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error('Subscription failed');
      }
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (err) {
      setStatus('error');
      if (err instanceof DOMException && err.name === 'AbortError') {
        setMessage('Request timed out. Please try again.');
      } else {
        setMessage('Unable to subscribe right now. Please try again later.');
      }
    }
  };

  // Render a lightweight placeholder during SSR & first client render
  if (!mounted) {
    return <footer className="bg-white text-gray-300" style={{ minHeight: 200 }} />;
  }

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-white text-gray-300">
      {/* Newsletter banner */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:flex md:items-center md:justify-between gap-8">
          <div className="mb-5 md:mb-0">
            <h3 className="text-lg sm:text-xl font-bold text-[#2C3E50] mb-1">Stay Updated</h3>
            <p className="text-sm text-gray-600">Get the latest updates on advanced materials and innovation.</p>
          </div>
          <div className="max-w-sm w-full">
            <form className="flex gap-2" onSubmit={handleSubscribe} noValidate suppressHydrationWarning>
              {/* Honeypot */}
              <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" suppressHydrationWarning>
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 text-sm rounded-xl bg-gray-100 border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#17A2B8] focus:ring-4 focus:ring-[#17A2B8]/10 input-glow transition-all duration-300"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="shrink-0 px-3 sm:px-5 py-2.5 rounded-xl bg-[#17A2B8] text-white text-sm font-semibold hover:bg-[#0D7A8C] disabled:opacity-50 whitespace-nowrap min-h-[44px] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {status === 'loading' ? '...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p 
                id="newsletter-error" 
                role={status === 'error' ? 'alert' : 'status'}
                className={`text-xs mt-2 ${status === 'success' ? 'text-teal-400' : 'text-red-400'}`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Certifications strip */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16">
          <div className="text-xs font-bold text-[#2C3E50] uppercase tracking-wider text-center w-full md:w-auto md:text-left mb-2 md:mb-0">
            🛡️ Certifications & Quality Standards:
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {/* ISO 9001 Badge */}
            <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-xl border border-gray-150 shadow-sm hover:border-[#17A2B8]/40 transition-colors">
              <svg className="w-6 h-6 text-[#17A2B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="text-left leading-none">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">Certified</div>
                <div className="text-[12px] font-extrabold text-[#2C3E50] tracking-wide mt-0.5">ISO 9001:2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#2C3E50]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image 
                src="/valtrix-logo.png" 
                alt="Valtrix Advanced Materials Logo" 
                width={122} 
                height={44} 
                priority={false} 
                quality={100}
                className="w-auto h-auto" 
                style={{ 
                  height: '44px', 
                  width: 'auto', 
                  transition: 'all 0.3s ease',
                }} 
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              Valtrix Advance Material Pvt. Ltd — 318, Fortune Gateway, Chhani, Vadodara - 390024.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#17A2B8] shrink-0" />
                <a href="tel:+919898123983" className="hover:text-white transition-colors">+91 98981 23983</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#17A2B8] shrink-0" />
                <a href="mailto:info@valtrixmaterials.com" className="hover:text-white transition-colors break-all">info@valtrixmaterials.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#17A2B8] shrink-0" />
                <span>Vadodara, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-3 sm:mb-4 text-sm font-semibold text-white uppercase tracking-wider">{category}</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-[#17A2B8] transition-colors inline-block py-0.5">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#2C3E50] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Valtrix Advance Material Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[
              { icon: Shield,    label: 'Admin Portal', href: '/admin/dashboard', isExternal: false },
              { icon: Linkedin,  label: 'LinkedIn',  href: socialLinks.linkedin, isExternal: true },
            ].map(({ icon: Icon, label, href, isExternal }) => {
              if (isExternal) {
                return (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#17A2B8] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 social-icon">
                    <Icon size={15} />
                  </a>
                );
              }
              return (
                <Link key={label} href={href} aria-label={label}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#17A2B8] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 social-icon">
                  <Icon size={15} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
