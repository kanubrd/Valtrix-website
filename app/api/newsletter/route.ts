import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { validateEmail, validateOrigin } from '@/lib/server-validation';
import { saveNewsletterSubscription } from '@/lib/db';
import { sendNewsletterWelcomeEmail } from '@/lib/email';

// Rate limit: 3 subscribe attempts per IP per 10 minutes
const RATE_LIMIT = { limit: 3, windowMs: 10 * 60 * 1000 };

export async function POST(req: NextRequest) {
  // ── CSRF origin check ──────────────────────────────────────────────
  if (!validateOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  // ── Rate limiting ──────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = rateLimit(ip, RATE_LIMIT);
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      }
    );
  }

  // ── Parse body ─────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { email, _hp } = (body as Record<string, unknown>) ?? {};

  // ── Honeypot ───────────────────────────────────────────────────────
  if (_hp && String(_hp).trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  // ── Validate ───────────────────────────────────────────────────────
  const emailErr = validateEmail(email);
  if (emailErr) {
    return NextResponse.json({ error: emailErr }, { status: 422 });
  }

  const safeEmail = String(email).trim().toLowerCase();

  // ── Save to database ───────────────────────────────────────────────
  try {
    await saveNewsletterSubscription({
      email: safeEmail,
      ipAddress: ip,
    });
  } catch (err) {
    console.error('Database save error:', err);
    // Continue even if database save fails
  }

  // ── Send welcome email ─────────────────────────────────────────────
  try {
    await sendNewsletterWelcomeEmail(safeEmail);
  } catch (err) {
    console.error('Newsletter welcome email error:', err);
    // Don't fail the subscription if email fails
  }

  // Forward to external backend if configured
  const backendUrl = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribe`
    : null;

  if (backendUrl) {
    try {
      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: safeEmail }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!res.ok) throw new Error('Backend subscription failed');
    } catch {
      console.error('Newsletter subscription backend error');
      // Don't fail the request if external backend fails
    }
  }

  return NextResponse.json({ success: true });
}
