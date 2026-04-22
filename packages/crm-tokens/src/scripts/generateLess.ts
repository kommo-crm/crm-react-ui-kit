import type { PrimitiveCollection, VarGroup } from './collectTokens';

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
