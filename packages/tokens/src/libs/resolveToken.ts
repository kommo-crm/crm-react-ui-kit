import type { PrimitivePath, Primitives } from '@/design/primitives';
import type { ColorValue } from '@/types/color';
import { isRawValue } from '@/libs/isRawValue';

export const resolveTokenValue = (
  primitives: Primitives,
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
