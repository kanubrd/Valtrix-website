import { NextRequest, NextResponse } from 'next/server';
import {
  getQuoteSubmissions,
  getContactSubmissions,
  getNewsletterSubscriptions,
  updateQuoteStatus,
  updateContactStatus,
} from '@/lib/db';

// Simple authentication - replace with proper auth in production
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-me-in-production';

function authenticate(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return false;

  const [type, credentials] = authHeader.split(' ');
  if (type !== 'Bearer') return false;

  return credentials === ADMIN_PASSWORD;
}

// GET /api/admin/submissions?type=quotes|contacts|newsletter
export async function GET(req: NextRequest) {
  if (!authenticate(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'quotes';

  try {
    let data;
    switch (type) {
      case 'quotes':
        data = await getQuoteSubmissions();
        break;
      case 'contacts':
        data = await getContactSubmissions();
        break;
      case 'newsletter':
        data = await getNewsletterSubscriptions();
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data, count: data.length });
  } catch (err) {
    console.error('Admin fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// PATCH /api/admin/submissions - Update status
export async function PATCH(req: NextRequest) {
  if (!authenticate(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { id, type, status } = body as Record<string, unknown>;

  if (!id || !type || !status) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    let success = false;
    if (type === 'quotes') {
      success = await updateQuoteStatus(String(id), status as any);
    } else if (type === 'contacts') {
      success = await updateContactStatus(String(id), status as any);
    }

    if (!success) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Admin update error:', err);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
