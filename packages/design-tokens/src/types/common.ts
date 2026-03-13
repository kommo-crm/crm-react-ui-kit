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

export type ColorShades = readonly [
  ColorValue, // 50
  ColorValue, // 100
  ColorValue, // 200
  ColorValue, // 300
  ColorValue, // 400
  ColorValue, // 500
  ColorValue, // 600
  ColorValue, // 700
  ColorValue, // 800
  ColorValue, // 900
];

export type ThemeConfig<S extends SemanticNode> = {
  id: Theme;
  primitives: Record<Primitive, PrimitiveVars>;
  semantic: S;
};

export type SemanticNode =
  | PrimitivePath
  | {
      [key: string]: SemanticNode | ColorValue;
    };
