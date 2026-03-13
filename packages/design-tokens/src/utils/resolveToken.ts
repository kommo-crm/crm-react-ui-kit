import type { PrimitivePath, Primitives } from '@/primitives';
import type { RGBA, RGB } from '@/types/common';
import { isRawValue } from '@/utils/isRawValue';

export const resolveTokenValue = (
  primitives: Primitives,
  value: PrimitivePath | RGBA | RGB
): string =>
  isRawValue(value)
    ? value
    : (value
        .split('.')
        .reduce<unknown>(
          (acc, key) => (acc as Record<string, unknown>)[key],
          primitives
        ) as string);
