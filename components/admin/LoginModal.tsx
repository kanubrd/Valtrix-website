'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, User, Loader2, Check } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState<number | null>(null);

  // Countdown timer for rate limiting (429)
  useEffect(() => {
    if (retryCountdown === null) return;
    if (retryCountdown <= 0) {
      setRetryCountdown(null);
      setError(null);
      return;
    }
    const timer = setTimeout(() => {
      setRetryCountdown((prev) => (prev ? prev - 1 : null));
    }, 1000);
    return () => clearTimeout(timer);
  }, [retryCountdown]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle' || retryCountdown !== null) return;

    setError(null);
    setStatus('loading');

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
          onSuccess();
          setStatus('idle');
          setUsername('');
          setPassword('');
        }, 800);
      } else if (res.status === 429) {
        const data = await res.json();
        setRetryCountdown(data.retryAfter || 900);
        setError('Too many login attempts.');
        setShake(true);
        setStatus('idle');
      } else {
        setError('Invalid credentials');
        setShake(true);
        setStatus('idle');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setShake(true);
      setStatus('idle');
    }
  };

  // Reset shake state
  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 300);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            style={{
              width: '100%',
              maxWidth: '420px',
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 10001,
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                color: '#64748B',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                padding: '4px',
              }}
            >
              <X size={20} className="hover:text-gray-900 transition-colors" />
            </button>

            {/* Content */}
            <div style={{ padding: '36px' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: '#E6F7FA',
                    color: '#17A2B8',
                    marginBottom: '16px',
                  }}
                >
                  <Lock size={28} />
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2C3E50' }}>Valtrix Admin Panel</h2>
                <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                  Please authenticate to access dashboard
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <motion.div
                  animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  style={{
                    padding: '12px 16px',
                    background: '#FEF2F2',
                    border: '1px solid #FCA5A5',
                    borderRadius: '12px',
                    color: '#991B1B',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '20px',
                    textAlign: 'center',
                  }}
                >
                  {error}
                  {retryCountdown !== null && ` Try again in ${retryCountdown}s.`}
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                    Username
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
                      <User size={18} />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Enter admin username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        borderRadius: '12px',
                        border: error ? '2px solid #EF4444' : '1px solid #CBD5E1',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      className="focus:border-[#17A2B8]"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
                      <Lock size={18} />
                    </span>
                    <input
                      type="password"
                      required
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        borderRadius: '12px',
                        border: error ? '2px solid #EF4444' : '1px solid #CBD5E1',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      className="focus:border-[#17A2B8]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status !== 'idle' || retryCountdown !== null}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    background: status === 'success' ? '#10B981' : '#17A2B8',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    border: 'none',
                    cursor: status === 'idle' && retryCountdown === null ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '28px',
                    boxShadow: status === 'success' 
                      ? '0 4px 12px rgba(16, 185, 129, 0.2)' 
                      : '0 4px 12px rgba(23, 162, 184, 0.2)',
                    transition: 'all 0.3s',
                  }}
                  className="hover:brightness-95 active:scale-[0.98]"
                >
                  {status === 'loading' && <Loader2 size={20} className="animate-spin" />}
                  {status === 'success' && <Check size={20} />}
                  {status === 'idle' && 'Sign In'}
                  {status === 'loading' && 'Authenticating...'}
                  {status === 'success' && 'Welcome Back'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
