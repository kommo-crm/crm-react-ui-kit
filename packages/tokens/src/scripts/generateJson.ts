import themes from '@/design/themes';
import { isRawValue } from '@/libs/isRawValue';
import { Theme, ThemeConfig } from '@/types/common';

type DTCGToken = {
  $type: string;
  $value: string;
};

type DTCGNode = DTCGToken | { [key: string]: DTCGNode };

function primitiveToDTO(node: unknown): DTCGNode {
  if (typeof node === 'string') {
    return { $type: 'color', $value: node };
  }

  return Object.fromEntries(
    Object.entries(node as Record<string, unknown>).map(([k, v]) => [
      k,
      primitiveToDTO(v),
    ])
  );
}

function semanticToDTO(node: unknown): DTCGNode {
  if (typeof node === 'string') {
    const value = isRawValue(node as Parameters<typeof isRawValue>[0])
      ? node
      : `{${node}}`;

    return { $type: 'color', $value: value };
  }

  return Object.fromEntries(
    Object.entries(node as Record<string, unknown>).map(([k, v]) => [
      k,
      semanticToDTO(v),
    ])
  );
}

export function generateJson(): Record<Theme, string> {
  return Object.fromEntries(
    (Object.entries(themes) as Array<[Theme, ThemeConfig]>).map(
      ([themeId, theme]) => {
        const dtcg: DTCGNode = {
          primitives: primitiveToDTO(theme.primitives),
          semantic: semanticToDTO(theme.semantic),
        };

        return [themeId, JSON.stringify(dtcg, null, 2)];
      }
    )
  ) as Record<Theme, string>;
}
