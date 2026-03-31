import primitives from '@/design/primitives';
import themes from '@/design/themes';
import { isRawValue } from '@/libs/isRawValue';

type DTCGToken = { $type: string; $value: string };
type DTCGNode = DTCGToken | { [key: string]: DTCGNode };

function primitiveToDTO(node: unknown): DTCGNode {
  if (typeof node === 'string') {
    return { $type: 'color', $value: node };
  }

  return Object.fromEntries(
    Object.entries(node as Record<string, unknown>).map(([k, v]) => [k, primitiveToDTO(v)])
  );
}

function semanticToDTO(node: unknown): DTCGNode {
  if (typeof node === 'string') {
    const value = isRawValue(node as Parameters<typeof isRawValue>[0]) ? node : `{${node}}`;
    return { $type: 'color', $value: value };
  }

  return Object.fromEntries(
    Object.entries(node as Record<string, unknown>).map(([k, v]) => [k, semanticToDTO(v)])
  );
}

export function generatePrimitivesJson(): string {
  return JSON.stringify(primitiveToDTO(primitives), null, 2);
}

export function generateThemesJson(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(themes).map(([themeId, theme]) => {
      const dto: DTCGNode = {
        semantic: semanticToDTO(theme.semanticTokens),
        component: semanticToDTO(theme.componentTokens),
      };
      return [themeId, JSON.stringify(dto, null, 2)];
    })
  );
}
