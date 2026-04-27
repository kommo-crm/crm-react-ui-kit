import { resolveTokenValue } from '@/libs/resolveTokenValue';
import { TokenPath, TokenValue, UsableTokens } from '@/types/common';

/**
 * Recursively resolves a token tree by replacing dot-path references
 * with their actual values from the provided tokens object.
 */
export const resolveTokens = (
  node: string | Record<string, unknown>,
  tokens: UsableTokens
): string | Record<string, unknown> => {
  if (typeof node === 'string') {
    return resolveTokenValue(tokens, node as TokenPath | TokenValue);
  }

  return Object.fromEntries(
    Object.entries(node).map(([key, value]) => [
      key,
      resolveTokens(value as string | Record<string, unknown>, tokens),
    ])
  );
};
