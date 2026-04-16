import getPrimitiveVarName from '@/libs/getPrimitiveVarName';
import { isRawColorValue } from '@/libs/isRawColorValue';

import type {
  PrimitiveCollection,
  ThemeCollection,
  VarGroup,
} from './collectTokens';

function toVarRef(value: string): string {
  return isRawColorValue(value as Parameters<typeof isRawColorValue>[0])
    ? value
    : `@${getPrimitiveVarName(value)}`;
}

function renderGroups(
  groups: VarGroup[],
  transform: (v: string) => string
): string {
  return groups
    .map(({ name, vars }) => {
      const lines = Object.entries(vars)
        .map(([k, v]) => `@${k}: ${transform(v)};`)
        .join('\n');
      return `// ${name}\n${lines}`;
    })
    .join('\n\n');
}

export function generatePrimitivesLess(
  collection: PrimitiveCollection
): string {
  return renderGroups(collection.groups, (v) => v);
}

export function generateThemesLess(
  collections: ThemeCollection[]
): Record<string, string> {
  return Object.fromEntries(
    collections.map(({ themeId, semantic }) => {
      const semanticSection = `// ── Semantic ──\n\n${renderGroups(semantic.groups, toVarRef)}`;
      return [themeId, `${semanticSection}\n`];
    })
  );
}
