import getPrimitiveVarName from '@/libs/getPrimitiveVarName';
import { isRawValue } from '@/libs/isRawValue';
import { Theme } from '@/types/common';

import { collectTokens } from './collectTokens';

function toVarRef(value: string): string {
  return isRawValue(value as Parameters<typeof isRawValue>[0])
    ? value
    : `@${getPrimitiveVarName(value)}`;
}

export function generateLess(): Record<Theme, string> {
  return Object.fromEntries(
    collectTokens().map(({ themeId, primitiveVars, semantic }) => {
      const lines: string[] = [];

      for (const [name, value] of Object.entries(primitiveVars)) {
        lines.push(`@${name}: ${value};`);
      }

      for (const [name, value] of Object.entries(semantic)) {
        lines.push(`@${name}: ${toVarRef(value)};`);
      }

      return [themeId, lines.join('\n')];
    })
  ) as Record<Theme, string>;
}
