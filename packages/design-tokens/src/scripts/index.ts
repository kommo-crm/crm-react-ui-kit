import * as fs from 'fs';
import * as path from 'path';

import { generateCss, generateMinCss } from './generateCss';
import { generateJs } from './generateJs';
import { generateLess } from './generateLess';
import { generateSass } from './generateSass';

const distDir = path.resolve(__dirname, '../../dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const write = (filename: string, content: string): void => {
  fs.writeFileSync(path.join(distDir, filename), content, 'utf8');
  console.log(`  ✓ dist/${filename}`);
};

console.log('Generating design tokens...');

write('tokens.css', generateCss());
write('tokens.min.css', generateMinCss());
write('tokens.less', generateLess());
write('tokens.scss', generateSass());
write('tokens.js', generateJs());
