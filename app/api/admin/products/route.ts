import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { getProducts, saveProduct, deleteProduct } from '@/lib/content-utils';

async function checkAuth() {
  const session = await getSession();
  return session.isLoggedIn;
}

export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json(products);
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
    saveProduct(body);
    
    revalidatePath('/products');
    revalidatePath(`/products/${body.slug}`);
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
    saveProduct(body);
    
    revalidatePath('/products');
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
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug param' }, { status: 400 });
    }

    const deleted = deleteProduct(slug);
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    revalidatePath('/products');
    revalidatePath('/solutions');
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
