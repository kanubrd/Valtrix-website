import { NextRequest, NextResponse } from 'next/server';
import { login, checkRateLimit } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'unknown';

    // Check rate limit
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      const retryAfterSeconds = Math.ceil((rateCheck.retryAfterMs || 0) / 1000);
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.', retryAfter: retryAfterSeconds },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    const result = await login(username, password);

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
