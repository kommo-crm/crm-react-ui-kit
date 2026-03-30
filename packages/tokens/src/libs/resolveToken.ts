import type { PrimitivePath, PrimitiveTokens } from '@/design/primitives';
import type { ColorValue } from '@/types/color';
import { isRawValue } from '@/libs/isRawValue';

export const resolveTokenValue = (
  primitives: PrimitiveTokens,
  value: PrimitivePath | ColorValue
): string =>
  isRawValue(value)
    ? value
    : (value
        .split('.')
        .reduce<unknown>(
          (acc, key) => (acc as Record<string, unknown>)[key],
          primitives
        ) as string);
