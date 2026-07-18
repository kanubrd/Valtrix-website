import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { getSolutions, saveSolution, deleteSolution } from '@/lib/content-utils';

async function checkAuth() {
  const session = await getSession();
  return session.isLoggedIn;
}

export async function GET() {
  try {
    const solutions = getSolutions();
    return NextResponse.json(solutions);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authorized = await checkAuth();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    saveSolution(body);
    
    // Trigger Next.js revalidation
    revalidatePath('/solutions');
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authorized = await checkAuth();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    saveSolution(body);
    
    revalidatePath('/solutions');
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Creation failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authorized = await checkAuth();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ID param' }, { status: 400 });
    }

    const deleted = deleteSolution(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    revalidatePath('/solutions');
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
