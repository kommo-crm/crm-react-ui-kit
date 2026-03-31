import { SemanticTokens } from '@/types/semantic';
import { ComponentTokens } from '@/types/component';
import { ColorValue } from './color';
import { PrimitivePath } from '@/design/primitives';

export type Theme = string;

export type ThemeConfig = {
  id: Theme;
  semanticTokens: SemanticTokens;
  componentTokens: ComponentTokens;
  conditions?: string[];
};

export type ColorTokenValue = ColorValue | PrimitivePath;
