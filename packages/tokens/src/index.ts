import * as fs from 'fs';
import * as path from 'path';

import { generateCss, generateMinCss } from '@/scripts/generateCss';
import { generateLess } from '@/scripts/generateLess';
import { generateSass } from '@/scripts/generateSass';
import { generateTs } from '@/scripts/generateTs';

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const generatedDir = path.resolve(rootDir, '.generated');

fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(generatedDir, { recursive: true });

const write = (filename: string, content: string): void => {
  const dest = path.join(distDir, filename);

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content, 'utf8');
  console.log(`  ✓ dist/${filename}`);
};

console.log('Generating design tokens...');

fs.writeFileSync(path.join(generatedDir, 'tokens.ts'), generateTs(), 'utf8');
console.log('  ✓ .generated/tokens.ts');

write('tokens.css', generateCss());
write('tokens.min.css', generateMinCss());
write('tokens.less', generateLess());
write('tokens.scss', generateSass());
