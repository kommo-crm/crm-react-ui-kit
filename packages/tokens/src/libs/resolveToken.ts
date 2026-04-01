import type { PrimitivePath, PrimitiveTokens } from '@/design/primitives';
import type { ColorValue } from '@/types/color';
import { isRawColorValue } from '@/libs/isRawColorValue';

/**
 * Resolves a single token value: returns it as-is if it's a raw CSS color,
 * otherwise traverses the primitives object using the dot-separated path.
 * @example 'color.light.azure.50' → '#f8fcfe'
 */
export const resolveTokenValue = (
  primitives: PrimitiveTokens,
  value: PrimitivePath | ColorValue
): string =>
  isRawColorValue(value)
    ? value
    : (value
        .split('.')
        .reduce<unknown>(
          (acc, key) => (acc as Record<string, unknown>)[key],
          primitives
        ) as string);
