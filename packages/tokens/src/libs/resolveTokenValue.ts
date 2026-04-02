import { isRawColorValue } from '@/libs/isRawColorValue';
import { TokenPath, TokenValue } from '@/types/common';

/**
 * Resolves a single token value: returns it as-is if it's a raw CSS color,
 * otherwise traverses the tokens object using the dot-separated path.
 * @example 'color.light.azure.50' → '#f8fcfe'
 */
export const resolveTokenValue = (
  tokens: Record<string, unknown>,
  value: TokenPath | TokenValue
): string =>
  isRawColorValue(value)
    ? value
    : (value
        .split('.')
        .reduce<unknown>(
          (acc, key) => (acc as Record<string, unknown>)[key],
          tokens
        ) as string);
