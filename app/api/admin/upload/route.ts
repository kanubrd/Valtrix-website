import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { getSession } from '@/lib/auth';

async function checkAuth() {
  const session = await getSession();
  return session.isLoggedIn;
}

export async function POST(req: NextRequest) {
  try {
    const authorized = await checkAuth();
    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const minWidthStr = formData.get('minWidth') as string | null;
    const minWidth = minWidthStr ? parseInt(minWidthStr, 10) : 1600;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Server-side type validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only JPEG, PNG, and WebP files are allowed' }, { status: 400 });
    }

    // Server-side size validation (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds maximum 10MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Initialize sharp and read image metadata for validation
    const image = sharp(buffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      return NextResponse.json({ error: 'Failed to read image dimensions' }, { status: 400 });
    }

    if (metadata.width < minWidth) {
      return NextResponse.json(
        { error: `Image width must be at least ${minWidth}px (got ${metadata.width}px)` },
        { status: 400 },
      );
    }

    // Process image: strip EXIF, convert to WebP, compress to quality 85, resize if too large (>4000px)
    let processed = image.keepExif().rotate(); // Auto-rotate based on EXIF before stripping
    if (metadata.width > 4000) {
      processed = processed.resize({ width: 4000, fit: 'inside', withoutEnlargement: true });
    }

    const finalBuffer = await processed
      .webp({ quality: 85 })
      .toBuffer();

    // Get final processed dimensions
    const finalMetadata = await sharp(finalBuffer).metadata();

    // Save to public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`;
    const filepath = path.join(uploadsDir, filename);

    fs.writeFileSync(filepath, finalBuffer);

    return NextResponse.json({
      url: `/uploads/${filename}`,
      width: finalMetadata.width,
      height: finalMetadata.height,
    });
  } catch (err: any) {
    console.error('Upload API failure:', err);
    return NextResponse.json({ error: err.message || 'Image upload failed' }, { status: 500 });
  }
}
