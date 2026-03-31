import primitives from '@/design/primitives';
import themes from '@/design/themes';
import flattenVars from '@/libs/flattenVars';

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
  component: {
    flat: Record<string, string>;
    groups: VarGroup[];
  };
};

function toGroups(flat: Record<string, string>): VarGroup[] {
  const map = new Map<string, Record<string, string>>();

  for (const [key, value] of Object.entries(flat)) {
    const group = key.split('-')[0];

    if (!map.has(group)) map.set(group, {});
    map.get(group)![key] = value;
  }

  return Array.from(map.entries()).map(([name, vars]) => ({ name, vars }));
}

export function collectPrimitives(): PrimitiveCollection {
  const flat = flattenVars(primitives as unknown as Record<string, unknown>);

  // Group by color family: 'color-light-azure-50' → family = 'azure' (index 2)
  const familyMap = new Map<string, Record<string, string>>();

  for (const [key, value] of Object.entries(flat)) {
    const family = key.split('-')[2];

    if (!familyMap.has(family)) familyMap.set(family, {});
    familyMap.get(family)![key] = value;
  }

  const groups = Array.from(familyMap.entries()).map(([name, vars]) => ({ name, vars }));

  return { flat, groups };
}

export function collectThemes(): ThemeCollection[] {
  return Object.values(themes).map((themeConfig) => {
    const { id, conditions, semanticTokens, componentTokens } = themeConfig;
    const selector = conditions ? conditions.join(',\n') : ':root';

    const semanticFlat = flattenVars(semanticTokens as unknown as Record<string, unknown>);
    const componentFlat = flattenVars(componentTokens as unknown as Record<string, unknown>);

    return {
      themeId: id,
      selector,
      semantic: { flat: semanticFlat, groups: toGroups(semanticFlat) },
      component: { flat: componentFlat, groups: toGroups(componentFlat) },
    };
  });
}
