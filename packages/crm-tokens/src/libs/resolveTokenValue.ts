import { isRawColorValue } from '@/libs/isRawColorValue';
import { TokenPath, TokenValue, UsableTokens } from '@/types/common';

/**
 * Resolves a single token value: returns it as-is if it's a raw CSS color,
 * otherwise traverses the tokens object using the dot-separated path.
 * @example 'color.light.azure.50' → '#f8fcfe'
 */
export const resolveTokenValue = (
  tokens: UsableTokens,
  value: TokenPath | TokenValue
): string =>
  isRawColorValue(value)
    ? value
    : (value.split('.').reduce<unknown>((acc, key, index, parts) => {
        const node = (acc as Record<string, unknown>)[key];

        if (!node) {
          const resolved = parts.slice(0, index).join('.');
          const location = resolved ? `"${resolved}" → "${key}"` : `"${key}"`;

          throw new Error(
            `Token not found: ${location} does not exist in path "${value}"`
          );
        }

        return node;
      }, tokens) as string);
