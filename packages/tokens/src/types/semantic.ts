import type { ColorFunction, ColorKeyword, ColorValue } from '@/types/color';
import type { PrimitivePath } from '@/design/primitives';

export type PaletteValue = PrimitivePath | ColorValue;

export type PaletteBackground = 'base' | 'primary' | 'secondary' | 'error';
export type PaletteForeground =
  | 'primary'
  | 'inverted'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'accent';

export type PaletteBorder = 'medium' | 'strong' | 'error';
export type PaletteOverlay = 'disabled';

export type SemanticTokens = {
  palette: {
    background: Record<PaletteBackground, PaletteValue>;
    foreground: Record<PaletteForeground, PaletteValue>;
    border: Record<PaletteBorder, PaletteValue>;
    overlay: Record<PaletteOverlay, PaletteValue>;
  };
};
