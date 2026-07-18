#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes Next.js build output and provides optimization recommendations
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const NEXT_DIR = '.next';
const STATIC_DIR = join(NEXT_DIR, 'static');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function analyzeDirectory(dir, results = { files: [], totalSize: 0 }) {
  try {
    const files = readdirSync(dir);
    
    for (const file of files) {
      const filePath = join(dir, file);
      const stats = statSync(filePath);
      
      if (stats.isDirectory()) {
        analyzeDirectory(filePath, results);
      } else if (stats.isFile()) {
        results.files.push({
          path: filePath.replace(NEXT_DIR + '/', ''),
          size: stats.size,
          type: file.split('.').pop()
        });
        results.totalSize += stats.size;
      }
    }
  } catch (error) {
    // Directory might not exist yet
  }
  
  return results;
}

function generateReport() {
  console.log('\n🔍 Analyzing Next.js Build Output...\n');
  
  const analysis = analyzeDirectory(STATIC_DIR);
  
  if (analysis.files.length === 0) {
    console.log('⚠️  No build files found. Run `npm run build` first.\n');
    return;
  }
  
  // Sort by size
  const sorted = analysis.files.sort((a, b) => b.size - a.size);
  
  // Group by type
  const byType = {};
  sorted.forEach(file => {
    if (!byType[file.type]) {
      byType[file.type] = { count: 0, size: 0 };
    }
    byType[file.type].count++;
    byType[file.type].size += file.size;
  });
  
  console.log('📊 Build Statistics:\n');
  console.log(`Total Files: ${analysis.files.length}`);
  console.log(`Total Size: ${formatBytes(analysis.totalSize)}\n`);
  
  console.log('📦 By File Type:\n');
  Object.entries(byType)
    .sort((a, b) => b[1].size - a[1].size)
    .forEach(([type, stats]) => {
      console.log(`  ${type.padEnd(10)} ${stats.count.toString().padStart(3)} files  ${formatBytes(stats.size).padStart(10)}`);
    });
  
  console.log('\n📈 Largest Files:\n');
  sorted.slice(0, 10).forEach((file, i) => {
    console.log(`  ${(i + 1).toString().padStart(2)}. ${formatBytes(file.size).padStart(10)}  ${file.path}`);
  });
  
  // Recommendations
  console.log('\n💡 Optimization Recommendations:\n');
  
  const largeJS = sorted.filter(f => f.type === 'js' && f.size > 100000);
  if (largeJS.length > 0) {
    console.log(`  ⚠️  ${largeJS.length} JavaScript files over 100KB detected`);
    console.log('     Consider code splitting or lazy loading');
  }
  
  const totalJS = byType['js']?.size || 0;
  if (totalJS > 500000) {
    console.log(`  ⚠️  Total JS size: ${formatBytes(totalJS)}`);
    console.log('     Consider using dynamic imports for large components');
  }
  
  if (byType['css']?.size > 100000) {
    console.log(`  ⚠️  CSS size: ${formatBytes(byType['css'].size)}`);
    console.log('     Consider purging unused CSS or using CSS modules');
  }
  
  console.log('\n✅ Analysis Complete!\n');
}

generateReport();
