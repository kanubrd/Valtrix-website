'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Layers, Briefcase, Settings, Home, Shield, Maximize } from 'lucide-react';
import { SolutionsTab } from './tabs/SolutionsTab';
import { IndustriesTab } from './tabs/IndustriesTab';
import { ProductsTab } from './tabs/ProductsTab';
import { DashboardHomeTab } from './tabs/DashboardHomeTab';
import { HealthTab } from './tabs/HealthTab';

interface AdminDashboardContentProps {
  username: string;
}

export function AdminDashboardContent({ username }: AdminDashboardContentProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'home' | 'solutions' | 'industries' | 'products' | 'health'>('home');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Monitor fullscreen status
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Auto-enter fullscreen request (graceful gesture capture)
    const requestFullscreen = async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
      } catch (err) {
        console.warn('Auto-fullscreen gesture trigger pending...');
      }
    };
    requestFullscreen();

    // Trigger on any page click to capture gesture requirement
    const triggerFullscreenOnClick = () => {
      requestFullscreen();
      document.removeEventListener('click', triggerFullscreenOnClick);
    };
    document.addEventListener('click', triggerFullscreenOnClick);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('click', triggerFullscreenOnClick);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen toggle failed:', err);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth/logout', { method: 'POST' });
      if (res.ok) {
        // Exit fullscreen on logout
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen();
        }
        router.push('/admin/login');
        router.refresh();
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const tabs = [
    { id: 'home', label: 'Dashboard Home', icon: Home, component: DashboardHomeTab },
    { id: 'solutions', label: 'Manage Solutions', icon: Layers, component: SolutionsTab },
    { id: 'industries', label: 'Manage Industries', icon: Briefcase, component: IndustriesTab },
    { id: 'products', label: 'Manage Products', icon: Settings, component: ProductsTab },
    { id: 'health', label: 'Link safety inspector', icon: Shield, component: HealthTab },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner Dashboard Card */}
      <div
        style={{
          padding: '24px 32px',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        }}
        className="flex-col md:flex-row gap-6 text-center md:text-left"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="flex-col md:flex-row text-center md:text-left">
          <Link href="/" title="Go to Valtrix Homepage" className="shrink-0 transition-transform hover:scale-105">
            <Image
              src="/valtrix-logo.png"
              alt="Valtrix Advanced Materials Logo"
              width={130}
              height={40}
              priority
              className="object-contain"
            />
          </Link>
          <div style={{ width: '1px', height: '40px', background: '#E2E8F0' }} className="hidden md:block" />
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#2C3E50' }}>Content Management System</h1>
            <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
              Logged in as <strong className="text-[#17A2B8]">{username}</strong>. Click any section below to update live website data.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }} className="flex-col md:flex-row w-full md:w-auto">
          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            style={{
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              borderRadius: '12px',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#475569',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            className="hover:bg-gray-100 hover:scale-102"
          >
            <Maximize size={16} />
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}</span>
          </button>

          <button
            onClick={handleLogout}
            style={{
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '12px',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#DC2626',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            className="hover:bg-red-100 hover:scale-102"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Tabs Left, Form Content Right */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left column navigation */}
        <div className="w-full lg:w-64 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  border: 'none',
                  background: isActive ? '#E6F7FA' : '#FFFFFF',
                  color: isActive ? '#17A2B8' : '#475569',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: isActive ? 'none' : '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'all 0.25s',
                }}
                className={`hover:bg-[#E6F7FA]/50 shrink-0 w-[200px] lg:w-full border border-transparent ${
                  isActive ? 'border-[#17A2B8]/10' : 'border-gray-100'
                }`}
              >
                <tab.icon size={18} className={isActive ? 'text-[#17A2B8]' : 'text-gray-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right column content */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-gray-150 shadow-sm overflow-hidden min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ padding: '24px' }}
            >
              {(() => {
                if (activeTab === 'home') {
                  return (
                    <DashboardHomeTab
                      username={username}
                      onNavigateToTab={(tabId, action) => {
                        setActiveTab(tabId);
                        if (action === 'add') {
                          sessionStorage.setItem('valtrix-admin-action', 'add');
                        } else if (action === 'list') {
                          sessionStorage.setItem('valtrix-admin-action', 'list');
                        }
                        window.dispatchEvent(new Event('valtrix-admin-action-change'));
                      }}
                    />
                  );
                }
                if (activeTab === 'health') {
                  return <HealthTab />;
                }
                if (activeTab === 'solutions') {
                  return <SolutionsTab />;
                }
                if (activeTab === 'industries') {
                  return <IndustriesTab />;
                }
                if (activeTab === 'products') {
                  return <ProductsTab />;
                }
                return null;
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
