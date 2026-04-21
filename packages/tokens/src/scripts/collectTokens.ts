import { primitives } from '@/design/primitives';
import { themes } from '@/design/themes';
import { flattenVars } from '@/libs/flattenVars';

export type VarGroup = {
  name: string;
  vars: Record<string, string>;
};

export type PrimitiveCollection = {
  flat: Record<string, string>;
  groups: VarGroup[];
};

export type ThemeCollection = {
  themeId: string;
  selector: string;
  semantic: {
    flat: Record<string, string>;
    groups: VarGroup[];
  };
};

function toGroups(flat: Record<string, string>, keyIndex = 0): VarGroup[] {
  const map = new Map<string, Record<string, string>>();

  for (const [key, value] of Object.entries(flat)) {
    const group = key.split('-')[keyIndex];

    if (!map.has(group)) {
      map.set(group, {});
    }

    map.get(group)![key] = value;
  }

  return Array.from(map.entries()).map(([name, vars]) => ({ name, vars }));
}

export function collectPrimitives(): PrimitiveCollection {
  // Group by color family: 'color-light-azure-50' → family = 'azure' (index 2)
  const flat = flattenVars(primitives);

  return { flat, groups: toGroups(flat, 2) };
}

export function collectThemes(): ThemeCollection[] {
  return themes.map((themeConfig) => {
    const { id, conditions, semanticTokens, prefix } = themeConfig;
    const selector = conditions ? conditions.join(',\n') : ':root';

    const semanticFlat = flattenVars(semanticTokens, prefix);
    const prefixDepth = prefix ? prefix.split('-').length : 0;

    return {
      themeId: id,
      selector,
      semantic: {
        flat: semanticFlat,
        groups: toGroups(semanticFlat, prefixDepth),
      },
    };
  });
}
