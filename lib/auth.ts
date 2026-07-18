import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

// ─── Session shape ────────────────────────────────────────
export interface SessionData {
  isLoggedIn: boolean;
  username?: string;
  loginAt?: number;
  lastActivity?: number;
}

const defaultSession: SessionData = {
  isLoggedIn: false,
};

// ─── iron-session config ──────────────────────────────────
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'valtrix-admin-secret-key-change-in-production-at-least-32-chars';

export const sessionOptions: SessionOptions = {
  password: SESSION_SECRET,
  cookieName: 'valtrix-admin-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 30 * 60, // 30 minutes
    path: '/',
  },
};

// ─── Session helpers ──────────────────────────────────────
export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

  // Check for session expiry (30 min inactivity)
  if (session.isLoggedIn && session.lastActivity) {
    const now = Date.now();
    const thirtyMinutes = 30 * 60 * 1000;
    if (now - session.lastActivity > thirtyMinutes) {
      session.isLoggedIn = false;
      session.username = undefined;
      session.loginAt = undefined;
      session.lastActivity = undefined;
      try {
        await session.save();
      } catch {
        // Safe to ignore: cookies cannot be modified in read-only Server Component rendering
      }
      return session;
    }
    // Refresh activity timestamp
    session.lastActivity = now;
    try {
      await session.save();
    } catch {
      // Safe to ignore: cookies cannot be modified in read-only Server Component rendering
    }
  }

  return session;
}

export async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  // Validate admin credentials from env
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminPasswordHash) {
    console.error('ADMIN_PASSWORD_HASH not set in environment variables');
    return { success: false, error: 'Server configuration error' };
  }

  // Generic error to avoid leaking info
  const genericError = 'Invalid credentials';

  if (username !== adminUsername) {
    return { success: false, error: genericError };
  }

  const passwordMatch = await bcrypt.compare(password, adminPasswordHash);
  if (!passwordMatch) {
    return { success: false, error: genericError };
  }

  const session = await getSession();
  session.isLoggedIn = true;
  session.username = username;
  session.loginAt = Date.now();
  session.lastActivity = Date.now();
  await session.save();

  return { success: true };
}

export async function logout(): Promise<void> {
  const session = await getSession();
  session.isLoggedIn = false;
  session.username = undefined;
  session.loginAt = undefined;
  session.lastActivity = undefined;
  await session.save();
}

// ─── Rate limiting (in-memory, per-process) ───────────────
interface RateLimitEntry {
  attempts: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean up expired entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap) {
      if (now > val.resetAt) rateLimitMap.delete(key);
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { attempts: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.attempts++;
  return { allowed: true };
}

// ─── Password hash helper (for initial setup) ─────────────
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
