import type { Leaves } from '@/types/token-path';

import color from './color';

const primitives = {
  color,
} as const;

type Primitives = typeof primitives;

export type PrimitivePath = Leaves<Primitives>;
export type { Primitives };
export default primitives;
