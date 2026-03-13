import * as fs from 'fs';
import * as path from 'path';

import { THEMES, SCALES, PRIMITIVE_GROUPS, themesConfig } from '@/const';
import themes from '@/design/themes';
import flattenVars from '@/utils/flattenVars';
import getPrimitiveVarName from '@/utils/getPrimitiveVarName';
import { isRawValue } from '@/utils/isRawValue';
import minify from '@/utils/minify';

function semanticToVarRefs(node: unknown): unknown {
  if (typeof node === 'string') {
    return isRawValue(node as Parameters<typeof isRawValue>[0])
      ? node
      : `var(--${getPrimitiveVarName(node)})`;
  }

  return Object.fromEntries(
    Object.entries(node as Record<string, unknown>).map(([key, value]) => [
      key,
      semanticToVarRefs(value),
    ])
  );
}

function generateCSS(): string {
  const blocks: string[] = [];

  for (const themeName of THEMES) {
    const config = themesConfig[themeName];

    const theme = themes[themeName];

    const primitiveVars: Record<string, string> = {};

    for (const group of PRIMITIVE_GROUPS) {
      const groupData = (theme.primitives as Record<string, unknown>)[
        group.key
      ];
      const data = group.themeVariant
        ? (groupData as Record<string, unknown>)[theme.id]
        : groupData;

      if (group.scaled) {
        for (const [family, shades] of Object.entries(
          data as Record<string, unknown>
        )) {
          for (const scale of SCALES) {
            const value = (shades as Record<number, string>)[scale];

            if (value !== undefined) {
              const varName = getPrimitiveVarName(
                `${group.prefix}.${theme.id}.${family}.${scale}`
              );

              primitiveVars[varName] = value;
            }
          }
        }
      } else {
        Object.assign(
          primitiveVars,
          flattenVars(data as Record<string, unknown>, group.prefix)
        );
      }
    }

    const semanticVars = flattenVars(
      semanticToVarRefs(theme.semantic) as Record<string, unknown>
    );

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
