import { minify } from '@/libs/minify';

import type { PrimitiveCollection, VarGroup } from './collectTokens';

const HEADER = '/* Auto-generated. Do not edit manually. */\n';

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
  return `${HEADER}:root {\n${renderGroups(collection.groups, (v) => v)}\n}`;
}

export function minifyCss(css: string): string {
  return minify(css);
}
