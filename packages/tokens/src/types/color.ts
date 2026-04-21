export type Hex = `#${string}`;

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
  | ColorFunction
  | ColorKeyword;

export type ColorScales =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;
