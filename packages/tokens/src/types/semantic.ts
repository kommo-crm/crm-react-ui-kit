import type { ColorFunction, ColorKeyword, ColorValue } from '@/types/color';
import type { PrimitivePath } from '@/design/primitives';

export type SemanticPaletteValue =
  | PrimitivePath
  | Exclude<ColorValue, ColorFunction | ColorKeyword>;

export type SemanticBackground = 'base' | 'primary' | 'secondary' | 'error';
export type SemanticForeground =
  | 'primary'
  | 'inverted'
  | 'secondary'
  | 'tertiary'
  | 'error'
  | 'accent';

export type SemanticBorder = 'medium' | 'strong' | 'error';
export type SemanticOverlay = 'disabled';

export type SemanticTokens = {
  palette: {
    background: Record<SemanticBackground, SemanticPaletteValue>;
    foreground: Record<SemanticForeground, SemanticPaletteValue>;
    border: Record<SemanticBorder, SemanticPaletteValue>;
    overlay: Record<SemanticOverlay, SemanticPaletteValue>;
  };
};
