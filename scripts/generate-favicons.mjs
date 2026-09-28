import { execSync } from 'child_process';
import path from 'path';

console.log('Generating production favicons and icons using verified generator...');
try {
  execSync('python scripts/build-favicons.py', { stdio: 'inherit', cwd: path.resolve('.') });
  console.log('Favicons generated and validated successfully.');
} catch (error) {
  console.error('Error generating favicons:', error);
  process.exit(1);
}
