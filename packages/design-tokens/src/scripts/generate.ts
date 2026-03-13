import * as fs from 'fs';
import * as path from 'path';

import { THEMES, SCALES, themesConfig } from '@/const';
import themes from '@/design/themes';
import flattenVars from '@/utils/flattenVars';
import minify from '@/utils/minify';
import { resolveSemanticTokens } from '@/utils/resolveSemanticTokens';

function generateCSS(): string {
  const blocks: string[] = [];

  for (const themeName of THEMES) {
    const config = themesConfig[themeName];

    const theme = themes[themeName];

    const colorVariant =
      theme.primitives.color[themeName as keyof typeof theme.primitives.color];

    const primitiveVars: Record<string, string> = {};

    for (const [family, shades] of Object.entries(colorVariant)) {
      for (const scale of SCALES) {
        const value = (shades as Record<number, string>)[scale];

        if (value !== undefined) {
          primitiveVars[`color-${theme.id}-${family}-${scale}`] = value;
        }
      }
    }

    const resolved = resolveSemanticTokens(theme.semantic, theme.primitives);

    const semanticVars = flattenVars(resolved as Record<string, unknown>);

    const allVars = { ...primitiveVars, ...semanticVars };

    const varLines = Object.entries(allVars)
      .map(([name, value]) => `  --${name}: ${value};`)
      .join('\n');

    const selector = config.conditions
      ? config.conditions.join(',\n')
      : ':root';

    blocks.push(`${selector} {\n${varLines}\n}`);
  }

  return blocks.join('\n\n');
}

const distDir = path.resolve(__dirname, '../../dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const css = generateCSS();

fs.writeFileSync(path.join(distDir, 'tokens.css'), css, 'utf8');
fs.writeFileSync(path.join(distDir, 'tokens.min.css'), minify(css), 'utf8');
