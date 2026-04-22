import type { ObjectLeaves } from '@/types/utils/object-leaves';

import { color } from './color';

export const primitives = {
  color,
} as const;

type PrimitiveTokens = typeof primitives;

export type PrimitivePath = ObjectLeaves<PrimitiveTokens>;
export type { PrimitiveTokens };
