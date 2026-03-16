import { Primitive, Theme } from '@/const';

import { ColorValue, ScaledShades } from './color';

export type { ColorScale } from '@/const';
export type { Theme, Primitive };

/** Primitive whose families live under a per-theme key:
 * { light: { azure: ScaledShades } } */
export type ThemeVariantPrimitive = Record<
  Theme,
  Record<string, ScaledShades | ColorValue>
>;

/** Primitive without theme splitting: { sm: '4px' } or { sm: ScaledShades } */
export type FlatPrimitive = Record<string, ScaledShades | ColorValue>;

export type PrimitiveVars = ThemeVariantPrimitive | FlatPrimitive;

export type ThemeConfig<S extends SemanticNode> = {
  id: Theme;
  primitives: Record<Primitive, PrimitiveVars>;
  semantic: S;
};

/** Dot-separated primitive path or raw CSS value */
export type SemanticNode = string | { [key: string]: SemanticNode };

type PrimitiveGroupBase = {
  /** Key in the `primitives` object */
  key: Primitive;
  /** CSS variable prefix, e.g. `color` → `--color-light-azure-50` */
  prefix: string;
  /**
   * Whether the primitive has per-theme sub-objects
   * (e.g. `primitives.color.light` / `primitives.color.dark`)
   */
  themeVariant: boolean;
};

export type PrimitiveGroupConfig =
  | (PrimitiveGroupBase & {
      scaled: true;
      /** Scale values used to index into family shades */
      scales: readonly number[];
    })
  | (PrimitiveGroupBase & { scaled: false });
