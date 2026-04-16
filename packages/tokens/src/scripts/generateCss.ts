import getPrimitiveVarName from '@/libs/getPrimitiveVarName';
import { isRawColorValue } from '@/libs/isRawColorValue';
import minify from '@/libs/minify';

import type {
  PrimitiveCollection,
  ThemeCollection,
  VarGroup,
} from './collectTokens';

function toVarRef(value: string): string {
  return isRawColorValue(value as Parameters<typeof isRawColorValue>[0])
    ? value
    : `var(--${getPrimitiveVarName(value)})`;
}

function renderGroups(
  groups: VarGroup[],
  transform: (v: string) => string
): string {
  return groups
    .map(({ name, vars }) => {
      const lines = Object.entries(vars)
        .map(([k, v]) => `  --${k}: ${transform(v)};`)
        .join('\n');
      return `  /* ${name} */\n${lines}`;
    })
    .join('\n\n');
}

export function generatePrimitivesCss(collection: PrimitiveCollection): string {
  return `:root {\n${renderGroups(collection.groups, (v) => v)}\n}`;
}

export function generateThemesCss(
  collections: ThemeCollection[]
): Record<string, string> {
  return Object.fromEntries(
    collections.map(({ themeId, selector, semantic }) => {
      const semanticSection = `  /* ── Semantic ── */\n\n${renderGroups(semantic.groups, toVarRef)}`;
      const body = `${semanticSection}\n`;
      return [themeId, `${selector} {\n${body}\n}`];
    })
  );
}

export function minifyCss(css: string): string {
  return minify(css);
}
