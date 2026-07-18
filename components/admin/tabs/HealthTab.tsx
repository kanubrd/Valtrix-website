'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldCheck, ShieldAlert, Shield, RefreshCw, AlertTriangle, 
  HelpCircle, Settings, FileText, ArrowRight, CornerDownRight, Check
} from 'lucide-react';

export function HealthTab() {
  const [loading, setLoading] = useState(true);
  const [healthData, setHealthData] = useState<{
    healthy: boolean;
    summary: { totalIssues: number; errors: number; warnings: number };
    issues: Array<{
      type: 'link' | 'image' | 'crosslink' | 'sitemap';
      severity: 'error' | 'warning';
      page: string;
      field: string;
      value: string;
      message: string;
    }>;
  } | null>(null);

  const [fixUrls, setFixUrls] = useState<Record<number, string>>({});
  const [fixingIndex, setFixingIndex] = useState<number | null>(null);
  const [successIndex, setSuccessIndex] = useState<number | null>(null);

  const fetchHealthData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/health');
      if (res.ok) {
        const data = await res.json();
        setHealthData(data);
      }
    } catch (err) {
      console.error('Failed to load health reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
  }, []);

  const handleCreateRedirect = async (idx: number, source: string, destination: string) => {
    if (!destination.trim()) return;
    setFixingIndex(idx);

    try {
      const res = await fetch('/api/admin/redirects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, destination }),
      });

      if (res.ok) {
        setSuccessIndex(idx);
        setTimeout(() => {
          setSuccessIndex(null);
          fetchHealthData(); // Refresh health list
        }, 1500);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save redirect.');
      }
    } catch (err) {
      console.error('Error creating redirect:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setFixingIndex(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2C3E50' }}>Link Integrity Inspector</h2>
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
            Run site-wide graph analysis to detect broken internal links, missing files, or orphaned content entries.
          </p>
        </div>

        <button
          onClick={fetchHealthData}
          disabled={loading}
          style={{
            padding: '8px 14px',
            background: '#FFFFFF',
            border: '1.5px solid #CBD5E1',
            borderRadius: '10px',
            color: '#475569',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            borderBottom: '2.5px solid #CBD5E1',
          }}
          className="hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Scan Now</span>
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '12px' }}>
          <RefreshCw size={36} className="text-[#17A2B8] animate-spin" />
          <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '600' }}>Scanning files & links graph database...</span>
        </div>
      ) : healthData ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Summary Cards */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ flex: '1 1 200px', background: healthData.healthy ? '#ECFDF5' : '#FFF5F5', padding: '16px 20px', borderRadius: '14px', border: healthData.healthy ? '1px solid #A7F3D0' : '1px solid #FECACA', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: healthData.healthy ? '#10B981' : '#EF4444' }}>
                {healthData.healthy ? <ShieldCheck size={28} /> : <ShieldAlert size={28} />}
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: healthData.healthy ? '#059669' : '#DC2626', letterSpacing: '0.05em' }}>
                  Site Status
                </div>
                <div style={{ fontSize: '16px', fontWeight: '800', color: healthData.healthy ? '#065F46' : '#991B1B' }}>
                  {healthData.healthy ? 'All Links Healthy' : 'Structural Errors Found'}
                </div>
              </div>
            </div>

            <div style={{ flex: '1 1 120px', background: '#FFFFFF', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#94A3B8', textTransform: 'uppercase' }}>Errors</span>
              <span style={{ fontSize: '24px', fontWeight: '800', color: healthData.summary.errors > 0 ? '#EF4444' : '#475569' }}>
                {healthData.summary.errors}
              </span>
            </div>

            <div style={{ flex: '1 1 120px', background: '#FFFFFF', padding: '16px 20px', borderRadius: '14px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#94A3B8', textTransform: 'uppercase' }}>Warnings</span>
              <span style={{ fontSize: '24px', fontWeight: '800', color: healthData.summary.warnings > 0 ? '#F59E0B' : '#475569' }}>
                {healthData.summary.warnings}
              </span>
            </div>
          </div>

          {/* Issues List */}
          {healthData.issues.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <ShieldCheck size={48} className="text-[#10B981] mb-2" />
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#065F46' }}>Perfect Content Integrity</h3>
              <p style={{ fontSize: '13px', color: '#047857', marginTop: '4px', maxWidth: '380px' }}>
                Zero broken links or orphaned pages detected. The site graph is fully aligned.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#475569' }}>Detected Graph Discrepancies ({healthData.issues.length})</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {healthData.issues.map((issue, idx) => {
                  const isError = issue.severity === 'error';
                  const canFixWithRedirect = issue.type === 'link' && isError;

                  return (
                    <div 
                      key={idx}
                      style={{
                        padding: '16px',
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        boxShadow: '0 1.5px 3px rgba(0,0,0,0.01)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span 
                            style={{ 
                              fontSize: '10px', 
                              fontWeight: '800', 
                              padding: '3px 6px', 
                              borderRadius: '6px',
                              background: isError ? '#FEF2F2' : '#FFFBEB',
                              color: isError ? '#DC2626' : '#D97706',
                              border: isError ? '1px solid #FCA5A5' : '1px solid #FDE68A',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            {issue.severity}
                          </span>
                          <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 'bold' }}>
                            {issue.type.toUpperCase()}
                          </span>
                        </div>

                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          Source Location: <strong style={{ color: '#475569' }}>{issue.page}</strong>
                        </div>
                      </div>

                      <div style={{ fontSize: '13px', color: '#334155', fontWeight: '500' }}>
                        {issue.message}
                      </div>

                      <div style={{ fontSize: '12px', color: '#64748B', background: '#F8FAFB', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                        Field: <strong style={{ color: '#475569' }}>{issue.field}</strong> | Value: <code style={{ color: '#EF4444', fontWeight: 'bold' }}>{issue.value || 'N/A'}</code>
                      </div>

                      {/* Link Fix Redirect Form */}
                      {canFixWithRedirect && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '10px', marginTop: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569', fontWeight: 'bold' }}>
                            <CornerDownRight size={14} className="text-[#17A2B8]" />
                            <span>Quick Fix: Create a 301 redirect for this source link</span>
                          </div>

                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                              type="text"
                              placeholder="Destination URL (e.g. /products/corrosion-inhibitors)"
                              value={fixUrls[idx] || ''}
                              onChange={(e) => setFixUrls({ ...fixUrls, [idx]: e.target.value })}
                              style={{
                                flex: 1,
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1.5px solid #CBD5E1',
                                fontSize: '12px',
                                outline: 'none',
                              }}
                            />
                            
                            <button
                              onClick={() => handleCreateRedirect(idx, issue.value, fixUrls[idx] || '')}
                              disabled={fixingIndex === idx || successIndex === idx}
                              style={{
                                padding: '8px 16px',
                                background: successIndex === idx ? '#10B981' : '#17A2B8',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                              className="hover:opacity-90 disabled:opacity-50"
                            >
                              {successIndex === idx ? (
                                <>
                                  <Check size={12} />
                                  <span>Fixed!</span>
                                </>
                              ) : (
                                <span>Apply Redirect</span>
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>
      ) : (
        <div style={{ fontSize: '14px', color: '#EF4444', textAlign: 'center', padding: '32px' }}>
          Failed to scan links graph integrity.
        </div>
      )}

    </div>
  );
}
