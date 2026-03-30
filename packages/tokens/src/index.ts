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

const tsTokens = generateTs();
const cssTokens = generateCss();
const minCssTokens = generateMinCss();
const sassTokens = generateSass();
const lessTokens = generateLess();

for (const theme of Object.keys(tsTokens) as Array<keyof typeof tsTokens>) {
  fs.writeFileSync(
    path.join(generatedDir, `${theme}.ts`),
    tsTokens[theme],
    'utf8'
  );
  console.log(`  ✓ .generated/${theme}.ts`);

  write(`${theme}/tokens.css`, cssTokens[theme]);
  write(`${theme}/tokens.min.css`, minCssTokens[theme]);
  write(`${theme}/tokens.scss`, sassTokens[theme]);
  write(`${theme}/tokens.less`, lessTokens[theme]);
}
