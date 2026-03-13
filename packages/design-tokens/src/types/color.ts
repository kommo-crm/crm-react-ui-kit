import { Scale } from './common';

export type Hex = `#${string}`; // #fff, #ffffff, #ffffffff

export type RGB =
  | `rgb(${number}, ${number}, ${number})`
  | `rgb(${number} ${number} ${number})`;

export type RGBA =
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgba(${number} ${number} ${number} / ${number})`;

export type HSL =
  | `hsl(${number}, ${number}%, ${number}%)`
  | `hsl(${number} ${number}% ${number}%)`;

export type HSLA =
  | `hsla(${number}, ${number}%, ${number}%, ${number})`
  | `hsl(${number} ${number}% ${number}% / ${number})`;

export type CSSVariable = `var(--${string})`;

export type ColorFunction =
  | `color(${string})`
  | `lab(${string})`
  | `lch(${string})`
  | `oklab(${string})`
  | `oklch(${string})`;

export type ColorKeyword =
  | 'transparent'
  | 'currentColor'
  | 'inherit'
  | 'initial'
  | 'unset'
  | 'revert';

export type ColorValue =
  | Hex
  | RGB
  | RGBA
  | HSL
  | HSLA
  | CSSVariable
  | ColorFunction
  | ColorKeyword;

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

/** Values of a single color family indexed by scale:
 * { 50: '#fff', 100: '#f5f5f5', ... } */
export type ScaledShades = Record<Scale, ColorValue>;
