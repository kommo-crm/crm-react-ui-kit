import * as fs from 'fs';
import * as path from 'path';

import { generateCss, generateMinCss } from '@/scripts/generateCss';
import { generateLess } from '@/scripts/generateLess';
import { generateSass } from '@/scripts/generateSass';

const distDir = path.resolve(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const write = (filename: string, content: string): void => {
  const dest = path.join(distDir, filename);

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content, 'utf8');
  console.log(`  ✓ dist/${filename}`);
};

console.log('Generating design tokens...');

write('tokens.css', generateCss());
write('tokens.min.css', generateMinCss());
write('tokens.less', generateLess());
write('tokens.scss', generateSass());
