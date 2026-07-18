'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lock, User, Loader2, Check } from 'lucide-react';

export function StandaloneLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [retryCountdown, setRetryCountdown] = useState<number | null>(null);

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
          router.push('/admin/dashboard');
          router.refresh();
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

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 300);
      return () => clearTimeout(timer);
    }
  }, [shake]);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{
        width: '100%',
        background: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.01)',
        overflow: 'hidden',
        padding: '40px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Link href="/" title="Go to Valtrix Homepage" className="inline-block transition-transform hover:scale-105 mb-6">
          <Image
            src="/valtrix-logo.png"
            alt="Valtrix Advanced Materials Logo"
            width={140}
            height={44}
            priority
            className="mx-auto object-contain"
          />
        </Link>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2C3E50' }}>Valtrix Admin Portal</h2>
        <p style={{ fontSize: '14px', color: '#64748B', marginTop: '6px' }}>
          Please authenticate to manage website content
        </p>
      </div>

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
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          {error}
          {retryCountdown !== null && ` Try again in ${retryCountdown}s.`}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
            Username
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
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
                padding: '14px 16px 14px 46px',
                borderRadius: '14px',
                border: error ? '2px solid #EF4444' : '1px solid #CBD5E1',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              className="focus:border-[#17A2B8]"
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>
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
                padding: '14px 16px 14px 46px',
                borderRadius: '14px',
                border: error ? '2px solid #EF4444' : '1px solid #CBD5E1',
                fontSize: '15px',
                outline: 'none',
                transition: 'all 0.2s',
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
            padding: '16px',
            borderRadius: '14px',
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
            marginTop: '36px',
            boxShadow: '0 4px 12px rgba(23, 162, 184, 0.18)',
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
    </motion.div>
  );
}
