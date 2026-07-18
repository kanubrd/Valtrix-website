'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, AlertTriangle, Search, Home, Briefcase, Settings, Layers, FileText } from 'lucide-react';
import { Section } from '@/components/ui/section';

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  // Pre-selected search links to guide lost users
  const linksList = [
    { title: 'Home Page', href: '/', description: 'Overview of Valtrix Material Science specialties.', icon: Home },
    { title: 'Industries Sectors', href: '/industries', description: 'Automotive, metalworking, and surface treatment solutions.', icon: Briefcase },
    { title: 'Chemical Products Catalog', href: '/solutions', description: 'SusCat-I, VAMShield-90, VAM RC-01 specifications.', icon: Layers },
    { title: 'Technical Resources', href: '/resources', description: 'Download technical data sheets, SDS, and technical insights.', icon: FileText },
    { title: 'Sourcing & Contact Support', href: '/contact', description: 'Inquire about bulk chemicals supply and quotes.', icon: Send },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredLinks = linksList.filter(link => 
    link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) {
    return <div className="min-h-screen bg-[#0F172A]" />;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] relative flex items-center justify-center py-20 px-4 overflow-hidden">
      
      {/* ── Glowing Blur Orbs ── */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(23,162,184,0.15) 0%, rgba(23,162,184,0) 70%)',
          filter: 'blur(40px)',
          zIndex: 1
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '20%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,122,140,0.15) 0%, rgba(13,122,140,0) 70%)',
          filter: 'blur(40px)',
          zIndex: 1
        }}
      />

      <Section className="relative z-10 text-center max-w-xl mx-auto w-full">
        
        {/* Glassmorphism Card */}
        <div 
          style={{
            background: 'rgba(30, 41, 59, 0.45)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            padding: '40px 32px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          }}
          className="text-center"
        >
          {/* Branded Icon */}
          <div 
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              background: 'rgba(23, 162, 184, 0.12)',
              border: '2px solid #17A2B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#17A2B8',
              boxShadow: '0 0 15px rgba(23,162,184,0.2)',
            }}
            className="mx-auto mb-6 animate-pulse"
          >
            <AlertTriangle size={32} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-8 max-w-md mx-auto">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let us help you find it.
          </p>

          {/* Interactive Search Assistance */}
          <div className="relative mb-6">
            <div style={{ position: 'absolute', top: '14px', left: '16px', color: '#64748B' }}>
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search active site links (e.g. products, specs)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 42px',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1.5px solid rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                fontSize: '13px',
                outline: 'none',
                transition: 'all 0.25s',
              }}
              className="focus:border-[#17A2B8] placeholder:text-gray-500"
            />
          </div>

          {/* Display Search filtered Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px' }} className="mb-8 scrollbar-thin">
            {filteredLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s',
                  }}
                  className="hover:bg-[#17A2B8]/10 hover:border-[#17A2B8]/40 group"
                >
                  <div style={{ color: '#17A2B8' }} className="group-hover:scale-105 transition-transform">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#F1F5F9' }}>{link.title}</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '1px' }}>{link.description}</div>
                  </div>
                </Link>
              );
            })}

            {filteredLinks.length === 0 && (
              <div style={{ padding: '16px', textAlign: 'center', color: '#64748B', fontSize: '12px' }}>
                No matching pages found. Try typing a different keyword.
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#17A2B8] hover:bg-[#0D7A8C] text-white font-bold rounded-lg transition-colors min-h-[48px] shadow-sm text-sm"
            >
              <ArrowLeft size={16} /> Return Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border-2 border-gray-700 text-[#E2E8F0] hover:text-[#17A2B8] hover:border-[#17A2B8] font-bold rounded-lg transition-all min-h-[48px] text-sm"
            >
              Contact Support
            </Link>
          </div>

        </div>

      </Section>
    </div>
  );
}
