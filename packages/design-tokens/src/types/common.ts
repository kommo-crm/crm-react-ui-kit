import { PRIMITIVE_KEYS, SCALES, THEMES } from '@/const';
import { PrimitivePath } from '@/design/primitives';

import { ColorValue, ScaledShades } from './color';

export type Scale = (typeof SCALES)[number];

export type Theme = (typeof THEMES)[number];

export type Primitive = (typeof PRIMITIVE_KEYS)[number];

/** Primitive whose families live under
 * a per-theme key: { light: { azure: ScaledShades } } */
export type ThemeVariantPrimitive = Record<
  Theme,
  Record<string, ScaledShades | ColorValue>
>;

/** Primitive without theme splitting: { sm: '4px' } or { sm: ScaledShades } */
export type FlatPrimitive = Record<string, ScaledShades | ColorValue>;

export type PrimitiveVars = ThemeVariantPrimitive | FlatPrimitive;

export type SemanticNode =
  | PrimitivePath
  | {
      [key: string]: SemanticNode | ColorValue;
    };
