import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let data: unknown;

    if (contentType.includes('application/json')) {
      data = await req.json();
    } else {
      const text = await req.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    // Acknowledge web vitals beacon
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Analytics endpoint operational' });
}
