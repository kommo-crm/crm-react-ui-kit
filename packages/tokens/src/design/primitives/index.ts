import type { Leaves } from '@/types/token-path';
import { Primitive, PrimitiveVars } from '@/types/common';

import color from './color';

const primitives = {
  color,
} as Record<Primitive, PrimitiveVars>;

type Primitives = typeof primitives;

export type PrimitivePath = Leaves<Primitives>;
export type { Primitives };
export default primitives;
