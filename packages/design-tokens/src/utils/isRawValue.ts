import type { RGBA, RGB } from '@/types/common';
import type { PrimitivePath } from '@/primitives';

export const isRawValue = (
  value: PrimitivePath | RGBA | RGB
): value is RGBA | RGB => value.startsWith('rgba(') || value.startsWith('rgb(');
