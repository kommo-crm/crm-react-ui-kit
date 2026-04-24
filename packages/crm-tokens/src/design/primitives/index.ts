import type { ObjectLeaves } from '@/types/utils/object-leaves';

import { colors } from './color';

export const primitives = {
  color: colors,
} as const;

type PrimitiveTokens = typeof primitives;

export type PrimitivePath = ObjectLeaves<PrimitiveTokens>;
export type { PrimitiveTokens };
