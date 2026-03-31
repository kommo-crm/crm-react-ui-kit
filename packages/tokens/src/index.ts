import * as fs from 'fs';
import * as path from 'path';

import { collectPrimitives, collectThemes } from '@/scripts/collectTokens';
import { generatePrimitivesCss, generateThemesCss, minifyCss } from '@/scripts/generateCss';
import { generatePrimitivesJson, generateThemesJson } from '@/scripts/generateJson';
import { generatePrimitivesLess, generateThemesLess } from '@/scripts/generateLess';
import { generatePrimitivesSass, generateThemesSass } from '@/scripts/generateSass';
import { generatePrimitivesTs, generateThemesTs } from '@/scripts/generateTs';

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const generatedDir = path.resolve(rootDir, '.generated');

fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(generatedDir, { recursive: true });

function write(relPath: string, content: string): void {
  const dest = path.join(distDir, relPath);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content, 'utf8');
  console.log(`  ✓ dist/${relPath}`);
}

function writeGenerated(filename: string, content: string): void {
  fs.writeFileSync(path.join(generatedDir, filename), content, 'utf8');
  console.log(`  ✓ .generated/${filename}`);
}

console.log('Generating design tokens...\n');

const primitiveCollection = collectPrimitives();
const themeCollections = collectThemes();

// ── TypeScript ──────────────────────────────────────────────────────────────
console.log('TypeScript:');

writeGenerated('primitives.ts', generatePrimitivesTs());

for (const [themeId, content] of Object.entries(generateThemesTs())) {
  writeGenerated(`${themeId}.ts`, content);
}

// ── CSS ─────────────────────────────────────────────────────────────────────
console.log('\nCSS:');

const primitivesCss = generatePrimitivesCss(primitiveCollection);
write('primitives/tokens.css', primitivesCss);
write('primitives/tokens.min.css', minifyCss(primitivesCss));

const themesCss = generateThemesCss(themeCollections);
for (const [themeId, css] of Object.entries(themesCss)) {
  write(`${themeId}/tokens.css`, css);
  write(`${themeId}/tokens.min.css`, minifyCss(css));
}

// ── SCSS ─────────────────────────────────────────────────────────────────────
console.log('\nSCSS:');

write('primitives/tokens.scss', generatePrimitivesSass(primitiveCollection));

for (const [themeId, scss] of Object.entries(generateThemesSass(themeCollections))) {
  write(`${themeId}/tokens.scss`, scss);
}

// ── LESS ─────────────────────────────────────────────────────────────────────
console.log('\nLESS:');

write('primitives/tokens.less', generatePrimitivesLess(primitiveCollection));

for (const [themeId, less] of Object.entries(generateThemesLess(themeCollections))) {
  write(`${themeId}/tokens.less`, less);
}

// ── JSON ─────────────────────────────────────────────────────────────────────
console.log('\nJSON:');

write('primitives/tokens.json', generatePrimitivesJson());

for (const [themeId, json] of Object.entries(generateThemesJson())) {
  write(`${themeId}/tokens.json`, json);
}

console.log('\nDone!');
