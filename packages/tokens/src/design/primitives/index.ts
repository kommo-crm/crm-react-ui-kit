import type { ObjectLeaves } from '@/types/utils/object-leaves';

import color from './color';

const primitives = {
  color,
} as const;

type PrimitiveTokens = typeof primitives;

export type PrimitivePath = ObjectLeaves<PrimitiveTokens>;
export type { PrimitiveTokens };
export default primitives;
