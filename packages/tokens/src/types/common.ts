import {
  SemanticUiKitTokens,
  SemanticUiKitTokenPath,
  SemanticTokens,
  SemanticTokenPath,
} from '@/types/semantic';
import { ComponentTokens, ComponentUiKitTokens } from '@/types/component';
import { ColorValue } from './color';
import { PrimitivePath } from '@/design/primitives';

export type ThemeConfig = CoreThemeConfig | UiKitThemeConfig;

type BaseThemeConfig = {
  id: string;
  semanticTokens: SemanticTokens;
  componentTokens: ComponentTokens;
  conditions?: string[];
  prefix?: string;
};

export type UiKitThemeConfig = BaseThemeConfig & {
  isUiKitTheme: true;
  semanticTokens: SemanticUiKitTokens;
  componentTokens: ComponentUiKitTokens;
};

export type CoreThemeConfig = BaseThemeConfig & {
  isUiKitTheme?: false;
};

export type TokenPrimitiveValue = ColorValue;
export type TokenSemanticValue = PrimitivePath;
export type TokenComponentValue =
  | PrimitivePath
  | SemanticTokenPath
  | SemanticUiKitTokenPath;
export type TokenValue = ColorValue;
export type TokenPath =
  | PrimitivePath
  | SemanticTokenPath
  | SemanticUiKitTokenPath;
export type UsableTokens = Record<string, unknown>;
