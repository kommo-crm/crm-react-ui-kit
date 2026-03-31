import type { ColorValue } from '@/types/color';
import type { PrimitivePath } from '@/design/primitives';

export type PaletteValue = PrimitivePath | ColorValue;

export type PaletteBackground =
  | 'default'
  | 'default-disabled'
  | 'base'
  | 'primary'
  | 'primary-disabled'
  | 'secondary'
  | 'error';

export type PaletteForeground =
  | 'primary'
  | 'inverted'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'accent';

export type PaletteBorder = 'medium' | 'strong' | 'error';
export type PaletteOverlay = 'disabled';

export type PaletteText =
  | 'primary'
  | 'primary-inverse'
  | 'secondary-light'
  | 'secondary-dark'
  | 'secondary-dark-green';

export type PaletteLink = 'primary';

export type SemanticTokens = {
  palette: {
    background: Record<PaletteBackground, PaletteValue>;
    foreground: Record<PaletteForeground, PaletteValue>;
    border: Record<PaletteBorder, PaletteValue>;
    overlay: Record<PaletteOverlay, PaletteValue>;
    text: Record<PaletteText, PaletteValue>;
    link: Record<PaletteLink, PaletteValue>;
  };
};
