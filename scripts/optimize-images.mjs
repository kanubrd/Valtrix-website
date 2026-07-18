#!/usr/bin/env node

/**
 * Image optimization script wrapper
 * Compiles and runs the TypeScript image optimizer
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('Starting image optimization...\n');

// Use tsx to run TypeScript directly
const child = spawn('npx', ['tsx', 'lib/image-optimizer.ts'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('Failed to start optimization:', error);
  process.exit(1);
});

child.on('close', (code) => {
  if (code !== 0) {
    console.error(`\nOptimization failed with exit code ${code}`);
    process.exit(code);
  }
});
