import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import {
  sanitise,
  validateEmail,
  validateName,
  validateCompany,
  validateMaterial,
  validateProducts,
  validateOrigin,
} from '@/lib/server-validation';
import { saveQuoteSubmission } from '@/lib/db';
import { sendQuoteEmail, sendAutoResponseEmail } from '@/lib/email';

// Rate limit: 5 quote submissions per IP per 15 minutes
const RATE_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 };

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
          'X-RateLimit-Limit': String(RATE_LIMIT.limit),
          'X-RateLimit-Remaining': '0',
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

  const { name, company, email, products, material, _hp } = body as Record<string, unknown>;

  // ── Honeypot: bots fill this field, humans don't ───────────────────
  if (_hp && String(_hp).trim().length > 0) {
    // Silently accept to not reveal the honeypot to bots
    return NextResponse.json({ success: true });
  }

  // ── Server-side validation ─────────────────────────────────────────
  const errors: Record<string, string> = {};
  const emailErr    = validateEmail(email);
  const nameErr     = validateName(name);
  const companyErr  = validateCompany(company);
  const materialErr = validateMaterial(material);
  const productsErr = validateProducts(products);

  if (emailErr)    errors.email    = emailErr;
  if (nameErr)     errors.name     = nameErr;
  if (companyErr)  errors.company  = companyErr;
  if (materialErr) errors.material = materialErr;
  if (productsErr) errors.products = productsErr;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Validation failed.', errors }, { status: 422 });
  }

  // ── Sanitise all string inputs ─────────────────────────────────────
  const safeName     = sanitise(name);
  const safeCompany  = sanitise(company);
  const safeEmail    = String(email).trim().toLowerCase();
  const safeMaterial = sanitise(material);
  const safeProducts = Array.isArray(products)
    ? (products as string[]).map((p) => sanitise(p))
    : [];

  // ── Save to database ───────────────────────────────────────────────
  try {
    await saveQuoteSubmission({
      name: safeName,
      company: safeCompany,
      email: safeEmail,
      products: safeProducts,
      material: safeMaterial,
      ipAddress: ip,
    });
  } catch (err) {
    console.error('Database save error:', err);
    // Continue even if database save fails
  }

  // ── Send emails ────────────────────────────────────────────────────
  try {
    // Send to company - this is the critical email
    await sendQuoteEmail({
      name: safeName,
      company: safeCompany,
      email: safeEmail,
      products: safeProducts,
      material: safeMaterial,
    });

    console.log('✅ Quote email sent to company');

    // Send auto-response to customer - non-critical, failures are logged but don't fail the request
    try {
      await sendAutoResponseEmail(safeEmail, safeName, 'quote');
      console.log('✅ Auto-response sent to customer');
    } catch (autoResponseError) {
      console.warn('⚠️ Auto-response failed but main email succeeded:', autoResponseError);
      // Continue - the main email to the company was successful
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Quote email error:', err);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
