import getPrimitiveVarName from '@/libs/getPrimitiveVarName';
import { isRawValue } from '@/libs/isRawValue';
import minify from '@/libs/minify';
import { Theme } from '@/types/common';

import { collectTokens } from './collectTokens';

function toVarRef(value: string): string {
  return isRawValue(value as Parameters<typeof isRawValue>[0])
    ? value
    : `var(--${getPrimitiveVarName(value)})`;
}

export function generateCss(): Record<Theme, string> {
  return Object.fromEntries(
    collectTokens().map(({ themeId, selector, primitiveVars, semantic }) => {
      const allVars = {
        ...primitiveVars,
        ...Object.fromEntries(
          Object.entries(semantic).map(([k, v]) => [k, toVarRef(v)])
        ),
      };

      const varLines = Object.entries(allVars)
        .map(([name, value]) => `  --${name}: ${value};`)
        .join('\n');

      return [themeId, `${selector} {\n${varLines}\n}`];
    })
  ) as Record<Theme, string>;
}

export function generateMinCss(): Record<Theme, string> {
  return Object.fromEntries(
    Object.entries(generateCss()).map(([theme, css]) => [theme, minify(css)])
  ) as Record<Theme, string>;
}
