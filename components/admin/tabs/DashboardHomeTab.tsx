'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Search, ShieldCheck, ShieldAlert, Shield, 
  ArrowRight, FileText, CheckCircle, AlertTriangle, Layers, Briefcase, Settings
} from 'lucide-react';
import Link from 'next/link';

interface DashboardHomeTabProps {
  username: string;
  onNavigateToTab: (tabId: 'solutions' | 'industries' | 'products' | 'health', action?: 'add' | 'list') => void;
}

export function DashboardHomeTab({ username, onNavigateToTab }: DashboardHomeTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [healthData, setHealthData] = useState<{
    healthy: boolean;
    summary: { totalIssues: number; errors: number; warnings: number };
  } | null>(null);
  const [healthLoading, setHealthLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Array<{
    type: 'industry' | 'product' | 'solution';
    id: string;
    title: string;
    description: string;
  }>>([]);

  const [recentlyEdited, setRecentlyEdited] = useState<Array<{
    type: 'industry' | 'product' | 'solution';
    id: string;
    title: string;
    updatedAt: string;
  }>>([]);

  // Fetch health data on mount
  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch('/api/admin/health');
        if (res.ok) {
          const data = await res.json();
          setHealthData(data);
        }
      } catch (err) {
        console.error('Failed to load health status:', err);
      } finally {
        setHealthLoading(false);
      }
    };
    fetchHealth();

    // Load recently edited from localStorage
    const saved = localStorage.getItem('valtrix-recently-edited');
    if (saved) {
      try {
        setRecentlyEdited(JSON.parse(saved));
      } catch {
        // Safe fallback
      }
    } else {
      // Mock history if empty
      const mockHistory = [
        { type: 'product', id: 'vamshield-90', title: 'VAMShield-90', updatedAt: 'Just now' },
        { type: 'industry', id: 'automotive', title: 'Automotive & General Industries', updatedAt: '2 hours ago' },
        { type: 'solution', id: 'suscat-i', title: 'SusCat-I', updatedAt: '1 day ago' }
      ] as any;
      setRecentlyEdited(mockHistory);
      localStorage.setItem('valtrix-recently-edited', JSON.stringify(mockHistory));
    }
  }, []);

  // Perform search across all dynamic contents
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const performSearch = async () => {
      try {
        // Load data files (Client imports/mock searches)
        const indRes = await fetch('/api/admin/industries').then(r => r.json().catch(() => []));
        const prodRes = await fetch('/api/admin/products').then(r => r.json().catch(() => []));
        const solRes = await fetch('/api/admin/solutions').then(r => r.json().catch(() => ({ solutions: [] })));
        
        const q = searchQuery.toLowerCase();
        const results: any[] = [];

        indRes.forEach((ind: any) => {
          if (ind.title.toLowerCase().includes(q) || ind.description.toLowerCase().includes(q) || ind.slug.toLowerCase().includes(q)) {
            results.push({ type: 'industry', id: ind.slug, title: ind.title, description: ind.description });
          }
        });

        prodRes.forEach((prod: any) => {
          if (prod.name.toLowerCase().includes(q) || prod.description.toLowerCase().includes(q) || prod.slug.toLowerCase().includes(q)) {
            results.push({ type: 'product', id: prod.slug, title: prod.name, description: prod.description });
          }
        });

        const sols = solRes.solutions || [];
        sols.forEach((sol: any) => {
          if (sol.title.toLowerCase().includes(q) || sol.description.toLowerCase().includes(q)) {
            results.push({ type: 'solution', id: sol.id, title: sol.title, description: sol.description });
          }
        });

        setSearchResults(results.slice(0, 5));
      } catch (err) {
        console.error('Search failed:', err);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      performSearch();
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* ── Welcome Banner ── */}
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#2C3E50' }}>
          Welcome back, {username}!
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
          Manage your chemical products, sectors catalog, and review live site links integrity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ── Quick Actions ── */}
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '16px' }} className="lg:col-span-2">
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={16} className="text-[#17A2B8]" />
            <span>Guided Sourcing Wizards</span>
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B' }}>
            Add new products or sectors using a simple, step-by-step assistant that validates link safety in real-time.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
            <button
              onClick={() => onNavigateToTab('products', 'add')}
              style={{
                flex: '1 1 200px',
                padding: '16px',
                background: 'linear-gradient(135deg, #17A2B8 0%, #0D7A8C 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(23,162,184,0.15)',
              }}
              className="hover:opacity-95 transition-opacity"
            >
              <Settings size={16} />
              <span>+ Add New Product</span>
            </button>

            <button
              onClick={() => onNavigateToTab('industries', 'add')}
              style={{
                flex: '1 1 200px',
                padding: '16px',
                background: '#FFFFFF',
                color: '#17A2B8',
                border: '2px solid #17A2B8',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              className="hover:bg-[#E6F7FA]/30 transition-colors"
            >
              <Briefcase size={16} />
              <span>+ Add Target Sector</span>
            </button>
          </div>
        </div>

        {/* ── Content Link Health Widget ── */}
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50' }}>
            Content Link Health
          </h3>

          {healthLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B' }}>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
              <span>Crawling links graph...</span>
            </div>
          ) : healthData ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div 
                  style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '10px', 
                    background: healthData.healthy ? '#ECFDF5' : '#FEF2F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: healthData.healthy ? '#10B981' : '#EF4444'
                  }}
                >
                  {healthData.healthy ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: healthData.healthy ? '#059669' : '#DC2626' }}>
                    {healthData.healthy ? 'All Links Healthy' : 'Action Required'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    {healthData.summary.errors} broken link errors detected.
                  </div>
                </div>
              </div>

              {healthData.summary.warnings > 0 && (
                <div style={{ fontSize: '11px', color: '#D97706', background: '#FFFBEB', padding: '6px 10px', borderRadius: '6px', border: '1px solid #FDE68A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={11} />
                  <span>{healthData.summary.warnings} tag warnings detected.</span>
                </div>
              )}
            </div>
          ) : (
            <div style={{ fontSize: '12px', color: '#EF4444' }}>
              Failed to resolve site link health check.
            </div>
          )}

          <button
            onClick={() => onNavigateToTab('health')}
            style={{
              width: '100%',
              padding: '10px',
              border: 'none',
              background: '#F8FAFB',
              borderRadius: '10px',
              color: '#475569',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              borderBottom: '1.5px solid #E2E8F0',
            }}
            className="hover:bg-gray-100 transition-colors"
          >
            <span>Open Link Safety Inspector</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* ── Global CMS Search ── */}
      <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50', marginBottom: '12px' }}>
          Global content search
        </h3>
        
        <div className="relative">
          <div style={{ position: 'absolute', top: '15px', left: '16px', color: '#94A3B8' }}>
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Type name, category, or url to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 42px',
              borderRadius: '12px',
              border: '1.5px solid #CBD5E1',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            className="focus:border-[#17A2B8] placeholder:text-gray-400"
          />
        </div>

        {/* Search Results Display */}
        {searchResults.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px', borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
            {searchResults.map((res) => (
              <div 
                key={res.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '10px 14px', 
                  background: '#F8FAFB', 
                  borderRadius: '10px', 
                  border: '1px solid #E2E8F0' 
                }}
              >
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ color: '#17A2B8', background: 'rgba(23,162,184,0.08)', padding: '6px', borderRadius: '8px' }}>
                    {res.type === 'industry' ? <Briefcase size={14} /> : res.type === 'product' ? <Settings size={14} /> : <Layers size={14} />}
                  </div>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>
                      {res.title}
                    </span>
                    <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '8px', textTransform: 'capitalize' }}>
                      ({res.type})
                    </span>
                    <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', lineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '400px' }} className="line-clamp-1">
                      {res.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToTab(res.type === 'industry' ? 'industries' : res.type === 'product' ? 'products' : 'solutions', 'list')}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#17A2B8',
                    background: '#FFFFFF',
                    border: '1.5px solid #17A2B8',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                  className="hover:bg-[#E6F7FA]/30 transition-colors"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Recently Edited Items ── */}
      <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#2C3E50', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={15} className="text-[#10B981]" />
          <span>Recently Modified Items</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {recentlyEdited.map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                padding: '10px 14px', 
                borderBottom: idx === recentlyEdited.length - 1 ? 'none' : '1px solid #F1F5F9' 
              }}
            >
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>
                  {item.title}
                </span>
                <span style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'capitalize' }}>
                  ({item.type})
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>{item.updatedAt}</span>
                <button
                  onClick={() => onNavigateToTab(item.type === 'industry' ? 'industries' : item.type === 'product' ? 'products' : 'solutions')}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#17A2B8',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                  className="hover:underline"
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
