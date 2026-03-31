import getPrimitiveVarName from '@/libs/getPrimitiveVarName';
import { isRawValue } from '@/libs/isRawValue';

import type { PrimitiveCollection, ThemeCollection, VarGroup } from './collectTokens';

function toVarRef(value: string): string {
  return isRawValue(value as Parameters<typeof isRawValue>[0])
    ? value
    : `@${getPrimitiveVarName(value)}`;
}

function renderGroups(groups: VarGroup[], transform: (v: string) => string): string {
  return groups
    .map(({ name, vars }) => {
      const lines = Object.entries(vars)
        .map(([k, v]) => `@${k}: ${transform(v)};`)
        .join('\n');
      return `// ${name}\n${lines}`;
    })
    .join('\n\n');
}

export function generatePrimitivesLess(collection: PrimitiveCollection): string {
  return renderGroups(collection.groups, (v) => v);
}

export function generateThemesLess(collections: ThemeCollection[]): Record<string, string> {
  return Object.fromEntries(
    collections.map(({ themeId, semantic, component }) => {
      const semanticSection = `// ── Semantic ──\n\n${renderGroups(semantic.groups, toVarRef)}`;
      const componentSection = `// ── Component ──\n\n${renderGroups(component.groups, toVarRef)}`;
      return [themeId, `${semanticSection}\n\n${componentSection}`];
    })
  );
}
