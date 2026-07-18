import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { sanitise, validateEmail, validateName, validateMessage, validateOrigin } from '@/lib/server-validation';
import { saveContactSubmission } from '@/lib/db';
import { sendContactEmail, sendAutoResponseEmail } from '@/lib/email';

// Rate limit: 3 contact submissions per IP per 15 minutes
const RATE_LIMIT = { limit: 3, windowMs: 15 * 60 * 1000 };

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
      { error: 'Too many requests. Please wait before submitting again.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  // ── Parse & validate body ──────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, email, subject, message, _hp } = body as Record<string, unknown>;

  // ── Honeypot: bots fill this field, humans don't ───────────────────
  if (_hp && String(_hp).trim().length > 0) {
    return NextResponse.json({ success: true });
  }

  // ── Server-side validation ─────────────────────────────────────────
  const errors: Record<string, string> = {};
  const emailErr = validateEmail(email);
  const nameErr = validateName(name);
  const messageErr = validateMessage(message);

  if (emailErr) errors.email = emailErr;
  if (nameErr) errors.name = nameErr;
  if (messageErr) errors.message = messageErr;

  // Subject is optional but validate if provided
  if (subject && typeof subject === 'string') {
    const sub = subject.trim();
    if (sub.length > 200) {
      errors.subject = 'Subject must be 200 characters or less.';
    }
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed.', errors }, { status: 422 });
  }

  // ── Sanitise all string inputs ─────────────────────────────────────
  const safeName = sanitise(name);
  const safeEmail = String(email).trim().toLowerCase();
  const safeSubject = subject && typeof subject === 'string' ? sanitise(subject) : 'General Inquiry';
  const safeMessage = sanitise(message);

  // ── Save to database ───────────────────────────────────────────────
  try {
    await saveContactSubmission({
      name: safeName,
      email: safeEmail,
      subject: safeSubject,
      message: safeMessage,
      ipAddress: ip,
    });
  } catch (err) {
    console.error('Database save error:', err);
    // Continue even if database save fails
  }

  // ── Send emails ────────────────────────────────────────────────────
  try {
    console.log('📧 Attempting to send contact email...');
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPass: !!process.env.SMTP_PASS
    });
    
    // Send to company - this is the critical email
    await sendContactEmail({
      name: safeName,
      email: safeEmail,
      subject: safeSubject,
      message: safeMessage,
    });

    console.log('✅ Contact email sent to company');

    // Send auto-response to customer - non-critical, failures are logged but don't fail the request
    try {
      await sendAutoResponseEmail(safeEmail, safeName, 'contact');
      console.log('✅ Auto-response sent to customer');
    } catch (autoResponseError) {
      console.warn('⚠️ Auto-response failed but main email succeeded:', autoResponseError);
      // Continue - the main email to the company was successful
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Contact email error:', err);
    console.error('Error details:', {
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined
    });
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
