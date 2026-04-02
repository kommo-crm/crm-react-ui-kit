import { resolveTokenValue } from '@/libs/resolveTokenValue';
import { TokenPath, TokenValue, UsableTokens } from '@/types/common';

export type Resolved<T> = T extends string
  ? string
  : { [K in keyof T]: Resolved<T[K]> };

/**
 * Recursively resolves a token tree by replacing dot-path references
 * with their actual values from the provided tokens object.
 */
export const resolveTokens = <T>(
  node: T,
  tokens: UsableTokens
): Resolved<T> => {
  if (typeof node === 'string') {
    console.log(node, tokens);
    return resolveTokenValue(
      tokens,
      node as TokenPath | TokenValue
    ) as Resolved<T>;
  }

  return Object.fromEntries(
    Object.entries(node as Record<string, unknown>).map(([key, value]) => [
      key,
      resolveTokens(value, tokens),
    ])
  ) as Resolved<T>;
};
