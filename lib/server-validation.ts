/**
 * Server-side input validation & sanitisation.
 * Never trust client-side validation alone.
 * Used by all API routes (quote, contact, newsletter).
 */

// ── Sanitise: strip HTML/script injection vectors ─────────────────────
export function sanitise(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/[<>"'`]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '`': '&#x60;' }[c] ?? c))
    .trim();
}

// ── Email validator ───────────────────────────────────────────────────
const EMAIL_RE = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;
const BLOCKED_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'trashmail.com', 'tempmail.com',
  'throwam.com', 'yopmail.com', 'maildrop.cc', 'sharklasers.com',
  'guerrillamail.info', 'spam4.me', 'fakeinbox.com', 'getnada.com',
  'tempr.email', 'dispostable.com', 'mailnull.com', 'mintemail.com',
]);

export function validateEmail(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return 'Email is required.';
  const v = value.trim().toLowerCase();
  if (v.length > 254) return 'Email is too long.';
  if (!EMAIL_RE.test(v)) return 'Invalid email address.';
  const domain = v.split('@')[1];
  if (BLOCKED_DOMAINS.has(domain)) return 'Please use a work email address.';
  return null;
}

export function validateName(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return 'Name is required.';
  const v = value.trim();
  if (v.length < 2) return 'Name must be at least 2 characters.';
  if (v.length > 100) return 'Name must be 100 characters or less.';
  return null;
}

export function validateMessage(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return 'Message is required.';
  const v = value.trim();
  if (v.length < 5) return 'Message must be at least 5 characters.';
  if (v.length > 5000) return 'Message must be 5000 characters or less.';
  return null;
}

export function validateSubject(value: unknown): string | null {
  if (value === undefined || value === null || value === '') return null; // optional
  if (typeof value !== 'string') return 'Invalid subject.';
  if (value.trim().length > 200) return 'Subject must be 200 characters or less.';
  return null;
}

export function validateCompany(value: unknown): string | null {
  if (value === undefined || value === null || value === '') return null; // optional
  if (typeof value !== 'string') return 'Invalid company name.';
  if (value.trim().length > 100) return 'Company name must be 100 characters or less.';
  return null;
}

export function validateMaterial(value: unknown): string | null {
  if (value === undefined || value === null || value === '') return null; // optional
  if (typeof value !== 'string') return 'Invalid material description.';
  if (value.trim().length > 500) return 'Material description must be 500 characters or less.';
  return null;
}

export function validateProducts(value: unknown): string | null {
  if (!Array.isArray(value)) return null; // optional
  const ALLOWED = ['SusCat-I', 'SusPol-125', 'VAMShield-90', 'VAM BS-01', 'VAM Cat-M (Rust Converter)'];
  for (const p of value) {
    if (typeof p !== 'string' || !ALLOWED.includes(p)) return 'Invalid product selection.';
  }
  return null;
}

// ── CSRF origin check ─────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://vamvaltrix.com',
  'https://www.vamvaltrix.com',
  'https://valtrixmaterials.com',
  'https://www.valtrixmaterials.com',
];

export function validateOrigin(req: Request): boolean {
  // In development, skip origin check
  if (process.env.NODE_ENV === 'development') return true;
  const origin = req.headers.get('origin') ?? '';
  const referer = req.headers.get('referer') ?? '';
  return (
    ALLOWED_ORIGINS.some((o) => origin.startsWith(o)) ||
    ALLOWED_ORIGINS.some((o) => referer.startsWith(o))
  );
}
