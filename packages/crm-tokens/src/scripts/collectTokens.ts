import { primitives } from '@/design/primitives';
import { flattenVars } from '@/libs/flattenVars';

export interface VarGroup {
  /** Group name derived from the token key segment (e.g. "azure", "red"). */
  name: string;
  /** CSS variable entries belonging to this group, keyed by full token name. */
  vars: Record<string, string>;
}

export interface PrimitiveCollection {
  /** All primitive tokens flattened into a single CSS variable map. */
  flat: Record<string, string>;
  /** Tokens grouped by color family for structured output. */
  groups: VarGroup[];
}

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
