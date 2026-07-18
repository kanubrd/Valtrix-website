/**
 * Shared input validation & sanitisation utilities
 *
 * Used by all client-side forms. All validation is re-done server-side too
 * (never trust client validation alone).
 */

// ── Sanitise: strip HTML tags and dangerous characters ────────────────
export function sanitiseString(value: string): string {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')  // script blocks
    .replace(/<[^>]+>/g, '')                                // all HTML tags
    .replace(/javascript:/gi, '')                           // JS protocol
    .replace(/on\w+\s*=/gi, '')                             // inline event handlers
    .trim();
}

// ── Validators ─────────────────────────────────────────────────────────
export const validators = {
  name(value: string): string | null {
    const v = sanitiseString(value);
    if (!v) return 'Name is required.';
    if (v.length < 2) return 'Name must be at least 2 characters.';
    if (v.length > 100) return 'Name must be 100 characters or less.';
    // Only letters, spaces, hyphens, apostrophes
    if (!/^[\p{L}\s'\-]+$/u.test(v)) return 'Name contains invalid characters.';
    return null;
  },

  email(value: string): string | null {
    const v = value.trim().toLowerCase();
    if (!v) return 'Email is required.';
    if (v.length > 254) return 'Email is too long.';
    // RFC 5322-ish check
    if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(v)) {
      return 'Please enter a valid email address.';
    }
    // Block disposable / obviously fake domains (expanded list)
    const blockedDomains = [
      'mailinator.com', 'guerrillamail.com', 'trashmail.com', 'tempmail.com',
      'throwam.com', 'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com',
      'grr.la', 'guerrillamail.info', 'guerrillamail.biz', 'guerrillamail.de',
      'guerrillamail.net', 'guerrillamail.org', 'spam4.me', 'binkmail.com',
      'bob.email', 'clrmail.com', 'dispostable.com', 'fakeinbox.com',
      'filzmail.com', 'getnada.com', 'harakirimail.com', 'mailnull.com',
      'maildrop.cc', 'mailnesia.com', 'mailnull.com', 'mintemail.com',
      'mt2015.com', 'mytrashmail.com', 'no-spam.ws', 'nobulk.com',
      'noclickemail.com', 'ownmail.net', 'pecinan.com', 'proxymail.eu',
      'putthisinyourspamdatabase.com', 'recode.me', 'safetypost.de',
      'shortmail.net', 'spam.la', 'spamavert.com', 'spamfree24.org',
      'spamgourmet.com', 'spamgourmet.net', 'spamgourmet.org', 'spamoff.de',
      'superrito.com', 'tempr.email', 'throwam.com', 'trash-mail.at',
      'trashdevil.com', 'trashdevil.de', 'trashemail.de', 'trashmail.at',
      'trashmail.io', 'trashmail.me', 'trashmail.net', 'trashmailer.com',
      'trashMailer.com', 'trbvm.com', 'turual.com', 'twinmail.de',
      'uggsrock.com', 'wegwerfadresse.de', 'wh4f.org', 'whopy.com',
      'wpdfs.com', 'xagloo.com', 'xemaps.com', 'xents.com', 'xmaily.com',
      'xoxy.net', 'yopmail.fr', 'yopmail.pp.ua', 'youmails.online',
      'ypmail.webarnak.fr.eu.org', 'yuurok.com',
    ];
    const domain = v.split('@')[1];
    if (blockedDomains.includes(domain)) return 'Please use a work email address.';
    return null;
  },

  company(value: string): string | null {
    if (!value.trim()) return null; // optional field
    const v = sanitiseString(value);
    if (v.length > 100) return 'Company name must be 100 characters or less.';
    return null;
  },

  message(value: string): string | null {
    const v = sanitiseString(value);
    if (!v) return 'Message is required.';
    if (v.length < 10) return 'Message must be at least 10 characters.';
    if (v.length > 5000) return 'Message must be 5000 characters or less.';
    return null;
  },

  material(value: string): string | null {
    if (!value.trim()) return null; // optional
    const v = sanitiseString(value);
    if (v.length > 500) return 'Material description must be 500 characters or less.';
    return null;
  },
};

// ── Validate an entire contact form ────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function validateContactForm(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  const nameErr    = validators.name(data.name);
  const emailErr   = validators.email(data.email);
  const companyErr = validators.company(data.company);
  const messageErr = validators.message(data.message);
  if (nameErr)    errors.name    = nameErr;
  if (emailErr)   errors.email   = emailErr;
  if (companyErr) errors.company = companyErr;
  if (messageErr) errors.message = messageErr;
  return errors;
}

// ── reCAPTCHA v3 token fetcher ──────────────────────────────────────────
export async function getRecaptchaToken(action: string): Promise<string> {
  if (typeof window === 'undefined') return '';
  // @ts-expect-error — grecaptcha loaded via Script tag in layout
  const gr = window.grecaptcha;
  if (!gr) return '';
  try {
    return await gr.execute(
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '',
      { action }
    );
  } catch {
    return '';
  }
}
