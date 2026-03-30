import type { ObjectLeaves } from '@/types/utils/object-leaves';

import color from './color';

const primitives = {
  color,
} as const;

type Primitives = typeof primitives;

export type PrimitivePath = ObjectLeaves<Primitives>;
export type { Primitives };
export default primitives;
