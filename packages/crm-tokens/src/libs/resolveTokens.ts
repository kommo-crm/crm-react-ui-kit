import { resolveTokenValue } from '@/libs/resolveTokenValue';
import { TokenPath, TokenValue, UsableTokens } from '@/types/common';

export type Resolved<T> = T extends string
  ? string
  : { [K in keyof T]: Resolved<T[K]> };

/**
 * Recursively resolves a token tree by replacing dot-path references
 * with their actual values from the provided tokens object.
 */
export const resolveTokens = <T extends string | Record<string, unknown>>(
  node: T,
  tokens: UsableTokens
): Resolved<T> => {
  if (typeof node === 'string') {
    return resolveTokenValue(
      tokens,
      node as TokenPath | TokenValue
    ) as Resolved<T>;
  }

  return Object.fromEntries(
    Object.entries(node).map(([key, value]) => [
      key,
      resolveTokens(value as string | Record<string, unknown>, tokens),
    ])
  ) as Resolved<T>;
};
