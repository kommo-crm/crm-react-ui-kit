import { PrimitiveCollection } from '@/scripts/collectTokens';
import { generatePrimitivesCss, minifyCss } from '@/scripts/generateCss';
import { generatePrimitivesJson } from '@/scripts/generateJson';
import { generatePrimitivesLess } from '@/scripts/generateLess';
import { generatePrimitivesSass } from '@/scripts/generateSass';
import { generatePrimitivesTs } from '@/scripts/generateTs';
import { distDir, generatedDir } from '@/libs/writeFile';
import { Generator } from '@/types/generator';

export function createGenerators(collection: PrimitiveCollection): Generator[] {
  const css = generatePrimitivesCss(collection);

  return [
    {
      label: 'TypeScript',
      files: [
        {
          dir: generatedDir,
          path: 'primitives.ts',
          content: generatePrimitivesTs(),
        },
      ],
    },
    {
      label: 'CSS',
      files: [
        { dir: distDir, path: 'primitives/tokens.css', content: css },
        {
          dir: distDir,
          path: 'primitives/tokens.min.css',
          content: minifyCss(css),
        },
      ],
    },
    {
      label: 'SCSS',
      files: [
        {
          dir: distDir,
          path: 'primitives/tokens.scss',
          content: generatePrimitivesSass(collection),
        },
      ],
    },
    {
      label: 'LESS',
      files: [
        {
          dir: distDir,
          path: 'primitives/tokens.less',
          content: generatePrimitivesLess(collection),
        },
      ],
    },
    {
      label: 'JSON',
      files: [
        {
          dir: distDir,
          path: 'primitives/tokens.json',
          content: generatePrimitivesJson(),
        },
      ],
    },
  ];
}
