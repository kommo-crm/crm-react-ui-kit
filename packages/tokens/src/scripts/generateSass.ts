import getPrimitiveVarName from '@/libs/getPrimitiveVarName';
import { isRawValue } from '@/libs/isRawValue';

import { collectTokens } from './collectTokens';

function toVarRef(value: string): string {
  return isRawValue(value as Parameters<typeof isRawValue>[0])
    ? value
    : `$${getPrimitiveVarName(value)}`;
}

export function generateSass(): string {
  const lines: string[] = [];

  for (const { themeId, primitiveVars, semantic } of collectTokens()) {
    const isLight = themeId === 'light';
    const semanticPrefix = isLight ? '' : `${themeId}-`;

    lines.push(`// === ${themeId} ===`);

    for (const [name, value] of Object.entries(primitiveVars)) {
      lines.push(`$${name}: ${value};`);
    }

    for (const [name, value] of Object.entries(semantic)) {
      lines.push(`$${semanticPrefix}${name}: ${toVarRef(value)};`);
    }

    lines.push('');
  }

  return lines.join('\n');
}
