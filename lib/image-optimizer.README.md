# Image Optimizer

Build-time image optimization script that generates modern image formats (WebP and AVIF) for all static images in the `/public` directory.

## Features

- ✅ **WebP Generation**: Creates WebP variants at 85% quality (Requirement 25.1, 25.2)
- ✅ **AVIF Generation**: Creates AVIF variants at 85% quality (Requirement 25.1, 25.2)
- ✅ **EXIF Stripping**: Removes metadata to reduce file size (Requirement 25.3)
- ✅ **PNG Optimization**: Applies lossless compression to PNG files (Requirement 25.4)
- ✅ **Size Reporting**: Displays detailed savings summary (Requirement 25.5)

## Usage

### Manual Execution

Run the optimizer manually:

```bash
npm run optimize:images
```

### Automatic Build-Time Optimization

The optimizer runs automatically during the build process:

```bash
npm run build
```

To skip image optimization during build:

```bash
npm run build:skip-optimize
```

## How It Works

1. **Scans** `/public` directory recursively for `.jpg`, `.jpeg`, and `.png` files
2. **Strips EXIF** metadata from all images using sharp's rotate method
3. **Optimizes PNGs** with lossless compression (level 9)
4. **Generates WebP** variants at 85% quality with effort level 6
5. **Generates AVIF** variants at 85% quality with effort level 9
6. **Reports** size savings and compression statistics

## Output Example

```
🖼️  Image Optimization Started
================================

✓ Sharp library loaded

📁 Scanning directory: /project/public

📊 Found 14 image(s) to process

[1/14] Processing: \hero-bg.png
  ✓ Original: 946.39 KB
  ✓ WebP: 277.18 KB (70.7% smaller)
  ✓ AVIF: 536.97 KB (43.3% smaller)

================================
📊 Optimization Summary
================================

Total files found:    14
Successfully processed: 14
Errors:               0

Original total size:  8.61 MB
Optimized total size: 1.84 MB
Total savings:        6.77 MB
Savings percentage:   78.6%

✅ Image optimization completed successfully!
```

## Integration with Next.js

Next.js automatically uses the optimized formats when serving images through the `next/image` component:

```tsx
import Image from 'next/image';

<Image 
  src="/hero-bg.png"  // Next.js will serve .avif or .webp if supported
  alt="Hero background"
  width={1920}
  height={1080}
  priority
/>
```

The browser automatically selects the best format:
- **AVIF** for browsers with AVIF support (best compression)
- **WebP** for browsers with WebP support (good compression)
- **Original PNG/JPG** as fallback for older browsers

## Performance Impact

Typical compression results:
- **PNG images**: 70-90% size reduction
- **JPG images**: 50-70% size reduction
- **Overall**: 75-80% size reduction on average

This significantly improves:
- ✅ Largest Contentful Paint (LCP)
- ✅ Page load time
- ✅ Bandwidth usage
- ✅ User experience on slow connections

## Configuration

Quality and effort settings can be adjusted in `lib/image-optimizer.ts`:

```typescript
const QUALITY = 85; // Image quality (0-100)

// WebP settings
.webp({ quality: QUALITY, effort: 6 })

// AVIF settings
.avif({ quality: QUALITY, effort: 9 })
```

## Requirements Validation

This script satisfies the following requirements from the premium-enterprise-enhancement spec:

- **25.1**: Generate WebP and AVIF variants ✓
- **25.2**: Use 85% quality setting ✓
- **25.3**: Strip EXIF metadata ✓
- **25.4**: Apply lossless PNG optimization ✓
- **25.5**: Report size savings to console ✓

## Troubleshooting

### Sharp Not Found

If you see "sharp library not found", install it:

```bash
npm install sharp --save-dev
```

Note: Sharp is typically already installed as a Next.js peer dependency.

### Permission Errors

Ensure the script has write permissions to the `/public` directory.

### Memory Issues

For large numbers of images, Node.js may need more memory:

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run optimize:images
```

## Testing

Run the test suite:

```bash
npm test lib/image-optimizer.test.ts
```

## Technical Details

- **Library**: sharp (high-performance image processing)
- **Formats**: WebP (VP8/VP9) and AVIF (AV1)
- **Compression**: Lossy for WebP/AVIF, lossless for PNG optimization
- **EXIF Handling**: Automatically stripped via rotate() method
- **Concurrent Processing**: Sequential to avoid memory issues with large images

## Best Practices

1. **Run before deployment**: Always optimize images before production builds
2. **Commit optimized files**: Include WebP/AVIF files in version control
3. **Monitor file sizes**: Check the summary report for unexpected size increases
4. **Use Next.js Image**: Always use `next/image` component to leverage optimized formats
5. **Set explicit dimensions**: Include width/height props to prevent layout shift

## See Also

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [WebP Format](https://developers.google.com/speed/webp)
- [AVIF Format](https://aomediacodec.github.io/av1-avif/)
