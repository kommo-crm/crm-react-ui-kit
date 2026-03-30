import type { PrimitiveTokens } from '@/design/primitives';
import type { ColorValue } from '@/types/color';
import { resolveTokenValue } from '@/libs/resolveToken';

export type Resolved<T> = T extends string
  ? string
  : { [K in keyof T]: Resolved<T[K]> };

export const resolveSemanticTokens = <T>(
  node: T,
  primitives: PrimitiveTokens
): Resolved<T> => {
  if (typeof node === 'string') {
    return resolveTokenValue(primitives, node as ColorValue) as Resolved<T>;
  }

  return Object.fromEntries(
    Object.entries(node as Record<string, unknown>).map(([key, value]) => [
      key,
      resolveSemanticTokens(value, primitives),
    ])
  ) as Resolved<T>;
};
