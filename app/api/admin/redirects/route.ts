import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getSession } from '@/lib/auth';

async function checkAuth() {
  const session = await getSession();
  return session.isLoggedIn;
}

const REDIRECTS_FILE = path.join(process.cwd(), 'data', 'content', 'redirects.json');

export async function GET() {
  try {
    if (!fs.existsSync(REDIRECTS_FILE)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(REDIRECTS_FILE, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (e) {
    console.error('Error reading redirects:', e);
    return NextResponse.json({ error: 'Failed to read redirects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authorized = await checkAuth();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { source, destination } = await req.json();
    if (!source || !destination) {
      return NextResponse.json({ error: 'Missing source or destination' }, { status: 400 });
    }

    // Normalise slash formats
    const cleanSource = '/' + source.replace(/^\/+|\/+$/g, '');
    const cleanDestination = '/' + destination.replace(/^\/+|\/+$/g, '');

    // Safety checks
    if (cleanSource === cleanDestination) {
      return NextResponse.json({ error: 'Source and destination URLs cannot be identical.' }, { status: 400 });
    }

    let redirects = [];
    if (fs.existsSync(REDIRECTS_FILE)) {
      const data = fs.readFileSync(REDIRECTS_FILE, 'utf8');
      redirects = JSON.parse(data);
    }

    // Remove any existing duplicate source to avoid double redirections
    redirects = redirects.filter((r: any) => r.source !== cleanSource);
    redirects.push({ source: cleanSource, destination: cleanDestination, permanent: true });

    // Ensure parents directories exist
    const dir = path.dirname(REDIRECTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(REDIRECTS_FILE, JSON.stringify(redirects, null, 2), 'utf8');
    return NextResponse.json({ success: true, redirects });
  } catch (e) {
    console.error('Error saving redirect:', e);
    return NextResponse.json({ error: 'Failed to save redirect' }, { status: 500 });
  }
}
