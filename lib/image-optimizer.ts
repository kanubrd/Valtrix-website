/**
 * Build-time image optimization script
 * Scans /public for images and generates optimized WebP and AVIF variants
 * 
 * **Validates: Requirements 25.1, 25.2, 25.3, 25.4, 25.5**
 * 
 * Usage:
 *   node --loader ts-node/esm lib/image-optimizer.ts
 *   or add to package.json build script
 */

import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';

// Type definitions for sharp (will be dynamically imported)
type Sharp = any;
type SharpModule = {
  default: (input: string | Buffer) => Sharp;
};

interface OptimizationResult {
  originalPath: string;
  originalSize: number;
  webpPath?: string;
  webpSize?: number;
  avifPath?: string;
  avifSize?: number;
  error?: string;
}

interface OptimizationSummary {
  totalFiles: number;
  processedFiles: number;
  skippedFiles: number;
  errors: number;
  originalTotalSize: number;
  optimizedTotalSize: number;
  savings: number;
  savingsPercent: number;
}

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const QUALITY = 85;
const PUBLIC_DIR = join(process.cwd(), 'public');

/**
 * Recursively scan directory for image files
 */
async function scanDirectory(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const subFiles = await scanDirectory(fullPath);
        files.push(...subFiles);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }
  
  return files;
}

/**
 * Get file size in bytes
 */
async function getFileSize(filePath: string): Promise<number> {
  try {
    const stats = await stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Optimize a single image file
 */
async function optimizeImage(
  filePath: string,
  sharp: (input: string | Buffer) => Sharp
): Promise<OptimizationResult> {
  const result: OptimizationResult = {
    originalPath: filePath,
    originalSize: await getFileSize(filePath),
  };
  
  try {
    const ext = extname(filePath).toLowerCase();
    const fileNameWithoutExt = basename(filePath, ext);
    const dirPath = dirname(filePath);
    
    // Load image with sharp
    let image = sharp(filePath);
    
    // Get image metadata
    const metadata = await image.metadata();
    
    // Strip EXIF metadata (Requirement 25.3)
    image = image.rotate(); // Auto-rotate based on EXIF, then strip
    
    // Apply lossless PNG optimization if source is PNG (Requirement 25.4)
    if (ext === '.png') {
      const pngPath = filePath;
      await sharp(filePath)
        .rotate()
        .png({ 
          quality: 100, 
          compressionLevel: 9, 
          adaptiveFiltering: true,
          palette: true 
        })
        .toFile(pngPath + '.tmp');
      
      // Check if optimized version is smaller
      const tmpSize = await getFileSize(pngPath + '.tmp');
      if (tmpSize < result.originalSize) {
        const fs = await import('fs/promises');
        await fs.rename(pngPath + '.tmp', pngPath);
        result.originalSize = tmpSize;
      } else {
        // Remove temp file if not smaller
        const fs = await import('fs/promises');
        await fs.unlink(pngPath + '.tmp');
      }
    }
    
    // Generate WebP variant (Requirement 25.1, 25.2)
    const webpPath = join(dirPath, `${fileNameWithoutExt}.webp`);
    await sharp(filePath)
      .rotate()
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(webpPath);
    
    result.webpPath = webpPath;
    result.webpSize = await getFileSize(webpPath);
    
    // Generate AVIF variant (Requirement 25.1, 25.2)
    const avifPath = join(dirPath, `${fileNameWithoutExt}.avif`);
    await sharp(filePath)
      .rotate()
      .avif({ quality: QUALITY, effort: 9 })
      .toFile(avifPath);
    
    result.avifPath = avifPath;
    result.avifSize = await getFileSize(avifPath);
    
  } catch (error) {
    result.error = error instanceof Error ? error.message : String(error);
  }
  
  return result;
}

/**
 * Main optimization function
 */
async function optimizeImages(): Promise<void> {
  console.log('🖼️  Image Optimization Started');
  console.log('================================\n');
  
  // Check if sharp is installed
  let sharp: (input: string | Buffer) => Sharp;
  try {
    const sharpModule = await import('sharp') as SharpModule;
    sharp = sharpModule.default;
    console.log('✓ Sharp library loaded\n');
  } catch (error) {
    console.error('❌ Error: sharp library not found.');
    console.error('   Please install: npm install sharp --save-dev\n');
    process.exit(1);
  }
  
  // Check if public directory exists
  if (!existsSync(PUBLIC_DIR)) {
    console.error(`❌ Error: Public directory not found at ${PUBLIC_DIR}\n`);
    process.exit(1);
  }
  
  console.log(`📁 Scanning directory: ${PUBLIC_DIR}\n`);
  
  // Scan for images
  const imageFiles = await scanDirectory(PUBLIC_DIR);
  
  if (imageFiles.length === 0) {
    console.log('ℹ️  No images found to optimize\n');
    return;
  }
  
  console.log(`📊 Found ${imageFiles.length} image(s) to process\n`);
  
  // Initialize summary
  const summary: OptimizationSummary = {
    totalFiles: imageFiles.length,
    processedFiles: 0,
    skippedFiles: 0,
    errors: 0,
    originalTotalSize: 0,
    optimizedTotalSize: 0,
    savings: 0,
    savingsPercent: 0,
  };
  
  // Process each image
  for (let i = 0; i < imageFiles.length; i++) {
    const filePath = imageFiles[i];
    const fileName = basename(filePath);
    const relPath = filePath.replace(PUBLIC_DIR, '');
    
    console.log(`[${i + 1}/${imageFiles.length}] Processing: ${relPath}`);
    
    const result = await optimizeImage(filePath, sharp);
    
    if (result.error) {
      console.log(`  ❌ Error: ${result.error}\n`);
      summary.errors++;
      continue;
    }
    
    summary.processedFiles++;
    summary.originalTotalSize += result.originalSize;
    
    // Calculate best compression (AVIF usually smallest)
    const bestSize = Math.min(
      result.avifSize || Infinity,
      result.webpSize || Infinity
    );
    
    if (bestSize < Infinity) {
      summary.optimizedTotalSize += bestSize;
    }
    
    console.log(`  ✓ Original: ${formatBytes(result.originalSize)}`);
    
    if (result.webpSize) {
      const webpSavings = ((1 - result.webpSize / result.originalSize) * 100).toFixed(1);
      console.log(`  ✓ WebP: ${formatBytes(result.webpSize)} (${webpSavings}% smaller)`);
    }
    
    if (result.avifSize) {
      const avifSavings = ((1 - result.avifSize / result.originalSize) * 100).toFixed(1);
      console.log(`  ✓ AVIF: ${formatBytes(result.avifSize)} (${avifSavings}% smaller)`);
    }
    
    console.log('');
  }
  
  // Calculate total savings (Requirement 25.5)
  summary.savings = summary.originalTotalSize - summary.optimizedTotalSize;
  summary.savingsPercent = summary.originalTotalSize > 0
    ? (summary.savings / summary.originalTotalSize) * 100
    : 0;
  
  // Print summary report
  console.log('================================');
  console.log('📊 Optimization Summary');
  console.log('================================\n');
  console.log(`Total files found:    ${summary.totalFiles}`);
  console.log(`Successfully processed: ${summary.processedFiles}`);
  console.log(`Errors:               ${summary.errors}\n`);
  console.log(`Original total size:  ${formatBytes(summary.originalTotalSize)}`);
  console.log(`Optimized total size: ${formatBytes(summary.optimizedTotalSize)}`);
  console.log(`Total savings:        ${formatBytes(summary.savings)}`);
  console.log(`Savings percentage:   ${summary.savingsPercent.toFixed(1)}%\n`);
  
  if (summary.processedFiles > 0) {
    console.log('✅ Image optimization completed successfully!\n');
  } else {
    console.log('⚠️  No images were optimized\n');
  }
}

// Run optimization if executed directly
// Check if this module is being run directly
const isMainModule = process.argv[1] && (
  import.meta.url === `file://${process.argv[1]}` ||
  import.meta.url.endsWith(process.argv[1]) ||
  process.argv[1].includes('image-optimizer')
);

if (isMainModule) {
  optimizeImages().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { optimizeImages, scanDirectory, optimizeImage };
