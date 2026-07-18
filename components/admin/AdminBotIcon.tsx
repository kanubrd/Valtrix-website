'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { AdminDashboard } from './AdminDashboard';

export function AdminBotIcon() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  // Check login session status on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/admin/auth/session');
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (err) {
        console.error('Session check failed:', err);
      }
    }
    checkSession();
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      window.location.href = '/admin/dashboard';
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
    setShowBurst(true);
    setTimeout(() => {
      setShowBurst(false);
      window.location.href = '/admin/dashboard';
    }, 600);
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
    setIsDashboardOpen(false);
  };

  return (
    <>
      {/* Floating circular bot icon */}
      <motion.button
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#2C3E50',
          border: '2px solid #17A2B8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(23, 162, 184, 0.3)',
          cursor: 'pointer',
        }}
        animate={{
          scale: [1, 1.04, 1],
          boxShadow: [
            '0 4px 20px rgba(23, 162, 184, 0.3)',
            '0 4px 28px rgba(23, 162, 184, 0.5)',
            '0 4px 20px rgba(23, 162, 184, 0.3)',
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.1,
          backgroundColor: '#34495e',
          borderColor: '#1be0ff',
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Admin Panel"
      >
        {/* Hexagon/Chemical style lab accent */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isLoggedIn ? '#10B981' : '#17A2B8'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-300"
        >
          <path d="M12 2l8.66 5v10L12 22l-8.66-5V7z" />
          <circle cx="12" cy="12" r="3" fill={isLoggedIn ? '#10B981' : 'transparent'} />
        </svg>

        {/* Active/Unlocked green status dot */}
        {isLoggedIn && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#10B981',
              border: '2px solid #2C3E50',
            }}
          />
        )}

        {/* Radial burst animation on successful login */}
        <AnimatePresence>
          {showBurst && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: -2,
                borderRadius: '50%',
                border: '3px solid #10B981',
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Dashboard Drawer */}
      <AdminDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        onLogout={handleLogoutSuccess}
      />
    </>
  );
}
