import getPrimitiveVarName from '@/libs/getPrimitiveVarName';
import { isRawValue } from '@/libs/isRawValue';
import minify from '@/libs/minify';

import { collectTokens } from './collectTokens';

function toVarRef(value: string): string {
  return isRawValue(value as Parameters<typeof isRawValue>[0])
    ? value
    : `var(--${getPrimitiveVarName(value)})`;
}

export function generateCss(): string {
  const blocks = collectTokens().map(
    ({ selector, primitiveVars, semantic }) => {
      const allVars = {
        ...primitiveVars,
        ...Object.fromEntries(
          Object.entries(semantic).map(([k, v]) => [k, toVarRef(v)])
        ),
      };

      const varLines = Object.entries(allVars)
        .map(([name, value]) => `  --${name}: ${value};`)
        .join('\n');

      return `${selector} {\n${varLines}\n}`;
    }
  );

  return blocks.join('\n\n');
}

export function generateMinCss(): string {
  return minify(generateCss());
}
