import { collectPrimitives } from '@/scripts/collectTokens';
import { generatePrimitivesCss, minifyCss } from '@/scripts/generateCss';
import { generatePrimitivesJson } from '@/scripts/generateJson';
import { generatePrimitivesLess } from '@/scripts/generateLess';
import { generatePrimitivesSass } from '@/scripts/generateSass';
import { generatePrimitivesTs } from '@/scripts/generateTs';
import { setup, writeFile, distDir, generatedDir } from '@/libs/writeFile';

(async () => {
  await setup();

  console.log('Generating design tokens...\n');

  const primitiveCollection = collectPrimitives();
  const primitiveCount = Object.keys(primitiveCollection.flat).length;

  console.log(`Primitives: ${primitiveCount}\n`);

  /**
   * TypeScript
   */
  console.log('TypeScript:');

  await writeFile(generatedDir, 'primitives.ts', generatePrimitivesTs());
  console.log('  ✓ primitives.ts');

  /**
   * CSS
   */
  console.log('\nCSS:');

  const primitivesCss = generatePrimitivesCss(primitiveCollection);

  await writeFile(distDir, 'primitives/tokens.css', primitivesCss);
  console.log('  ✓ primitives/tokens.css');

  await writeFile(
    distDir,
    'primitives/tokens.min.css',
    minifyCss(primitivesCss)
  );
  console.log('  ✓ primitives/tokens.min.css');

  /**
   * SCSS
   */
  console.log('\nSCSS:');

  await writeFile(
    distDir,
    'primitives/tokens.scss',
    generatePrimitivesSass(primitiveCollection)
  );
  console.log('  ✓ primitives/tokens.scss');

  /**
   * LESS
   */
  console.log('\nLESS:');

  await writeFile(
    distDir,
    'primitives/tokens.less',
    generatePrimitivesLess(primitiveCollection)
  );
  console.log('  ✓ primitives/tokens.less');

  /**
   * JSON
   */
  console.log('\nJSON:');

  await writeFile(distDir, 'primitives/tokens.json', generatePrimitivesJson());
  console.log('  ✓ primitives/tokens.json');

  console.log('\nDone!');
})();
