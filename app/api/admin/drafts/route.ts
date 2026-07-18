import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getDraft, saveDraft, deleteDraft } from '@/lib/content-utils';

async function checkAuth() {
  const session = await getSession();
  return session.isLoggedIn;
}

export async function GET(req: NextRequest) {
  try {
    const authorized = await checkAuth();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
    }

    const draft = getDraft(type, id);
    return NextResponse.json(draft);
  } catch {
    return NextResponse.json({ error: 'Failed to retrieve draft' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authorized = await checkAuth();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { type, id, data } = body;

    if (!type || !id || !data) {
      return NextResponse.json({ error: 'Missing required body fields' }, { status: 400 });
    }

    saveDraft(type, id, data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save draft' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authorized = await checkAuth();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
    }

    deleteDraft(type, id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete draft' }, { status: 500 });
  }
}
