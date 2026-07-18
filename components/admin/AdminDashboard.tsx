'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, Clock, Layers, Briefcase, Settings } from 'lucide-react';
import { SolutionsTab } from './tabs/SolutionsTab';
import { IndustriesTab } from './tabs/IndustriesTab';
import { ProductsTab } from './tabs/ProductsTab';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function AdminDashboard({ isOpen, onClose, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'solutions' | 'industries' | 'products'>('solutions');
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 30 minutes in seconds

  // Session timer count down
  useEffect(() => {
    if (!isOpen) return;

    // Reset timer when opened
    setTimeRemaining(30 * 60);

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/auth/logout', { method: 'POST' });
      if (res.ok) {
        onLogout();
        window.location.reload();
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const tabs = [
    { id: 'solutions', label: 'Solutions', icon: Layers, component: SolutionsTab },
    { id: 'industries', label: 'Industries', icon: Briefcase, component: IndustriesTab },
    { id: 'products', label: 'Products', icon: Settings, component: ProductsTab },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9990,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          {/* Backdrop Click Close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.15)',
              backdropFilter: 'blur(3px)',
            }}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ y: '100%', opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              width: '100%',
              maxWidth: '520px',
              height: '100%',
              maxHeight: '85vh',
              background: '#FFFFFF',
              boxShadow: '-10px 0 25px -5px rgba(0, 0, 0, 0.1), -5px 0 10px -5px rgba(0, 0, 0, 0.04)',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              borderLeft: '1px solid #E2E8F0',
              borderRight: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 9991,
              overflow: 'hidden',
            }}
            className="md:max-h-[85vh] max-h-screen rounded-t-[24px] md:rounded-tr-none md:rounded-bl-[24px] md:height-[85vh]"
          >
            {/* Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#F8FAFB',
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2C3E50' }}>Admin Dashboard</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '12px', marginTop: '2px' }}>
                  <Clock size={12} />
                  <span>Session expires in {formatTime(timeRemaining)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Logout */}
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'transparent',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#64748B',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                  className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>

                {/* Close Drawer */}
                <button
                  onClick={onClose}
                  style={{
                    background: '#E2E8F0',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#475569',
                    cursor: 'pointer',
                  }}
                  className="hover:bg-gray-300 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      flex: 1,
                      padding: '14px',
                      border: 'none',
                      background: 'transparent',
                      borderBottom: isActive ? '3px solid #17A2B8' : '3px solid transparent',
                      color: isActive ? '#17A2B8' : '#64748B',
                      fontWeight: isActive ? 'bold' : '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                    }}
                    className="hover:text-[#17A2B8]"
                  >
                    <tab.icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panels Contents */}
            <div style={{ flex: 1, overflowY: 'auto', background: '#FFFFFF' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{ height: '100%' }}
                >
                  {(() => {
                    const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component || SolutionsTab;
                    return <ActiveComponent />;
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
