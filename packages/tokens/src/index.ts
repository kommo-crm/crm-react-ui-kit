import { collectPrimitives, collectThemes } from '@/scripts/collectTokens';
import {
  generatePrimitivesCss,
  generateThemesCss,
  minifyCss,
} from '@/scripts/generateCss';
import {
  generatePrimitivesJson,
  generateThemesJson,
} from '@/scripts/generateJson';
import {
  generatePrimitivesLess,
  generateThemesLess,
} from '@/scripts/generateLess';
import {
  generatePrimitivesSass,
  generateThemesSass,
} from '@/scripts/generateSass';
import { generatePrimitivesTs, generateThemesTs } from '@/scripts/generateTs';
import { writeFile, distDir, generatedDir } from '@/libs/writeFile';

console.log('Generating design tokens...\n');

const primitiveCollection = collectPrimitives();
const themeCollections = collectThemes();

// ── TypeScript ──────────────────────────────────────────────────────────────
console.log('TypeScript:');

writeFile(generatedDir, 'primitives.ts', generatePrimitivesTs(), () =>
  console.log('  ✓ primitives.ts')
);

for (const [themeId, content] of Object.entries(generateThemesTs())) {
  writeFile(generatedDir, `${themeId}.ts`, content, () =>
    console.log(`  ✓ ${themeId}.ts`)
  );
}

// ── CSS ─────────────────────────────────────────────────────────────────────
console.log('\nCSS:');

const primitivesCss = generatePrimitivesCss(primitiveCollection);
writeFile(distDir, 'primitives/tokens.css', primitivesCss, () =>
  console.log('  ✓ primitives/tokens.css')
);
writeFile(distDir, 'primitives/tokens.min.css', minifyCss(primitivesCss), () =>
  console.log('  ✓ primitives/tokens.min.css')
);

const themesCss = generateThemesCss(themeCollections);
for (const [themeId, css] of Object.entries(themesCss)) {
  writeFile(distDir, `${themeId}/tokens.css`, css, () =>
    console.log(`  ✓ ${themeId}/tokens.css`)
  );
  writeFile(distDir, `${themeId}/tokens.min.css`, minifyCss(css), () =>
    console.log(`  ✓ ${themeId}/tokens.min.css`)
  );
}

// ── SCSS ─────────────────────────────────────────────────────────────────────
console.log('\nSCSS:');

writeFile(
  distDir,
  'primitives/tokens.scss',
  generatePrimitivesSass(primitiveCollection),
  () => console.log('  ✓ primitives/tokens.scss')
);

for (const [themeId, scss] of Object.entries(
  generateThemesSass(themeCollections)
)) {
  writeFile(distDir, `${themeId}/tokens.scss`, scss, () =>
    console.log(`  ✓ ${themeId}/tokens.scss`)
  );
}

// ── LESS ─────────────────────────────────────────────────────────────────────
console.log('\nLESS:');

writeFile(
  distDir,
  'primitives/tokens.less',
  generatePrimitivesLess(primitiveCollection),
  () => console.log('  ✓ primitives/tokens.less')
);

for (const [themeId, less] of Object.entries(
  generateThemesLess(themeCollections)
)) {
  writeFile(distDir, `${themeId}/tokens.less`, less, () =>
    console.log(`  ✓ ${themeId}/tokens.less`)
  );
}

// ── JSON ─────────────────────────────────────────────────────────────────────
console.log('\nJSON:');

writeFile(distDir, 'primitives/tokens.json', generatePrimitivesJson(), () =>
  console.log('  ✓ primitives/tokens.json')
);

for (const [themeId, json] of Object.entries(generateThemesJson())) {
  writeFile(distDir, `${themeId}/tokens.json`, json, () =>
    console.log(`  ✓ ${themeId}/tokens.json`)
  );
}

console.log('\nDone!');
