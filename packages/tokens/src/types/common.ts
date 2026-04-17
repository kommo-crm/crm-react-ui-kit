import {
  SemanticUiKitTokens,
  SemanticUiKitTokenPath,
  SemanticTokens,
  SemanticTokenPath,
} from '@/types/semantic';
import { ColorValue } from './color';
import { PrimitivePath } from '@/design/primitives';

export type ThemeConfig = BaseThemeConfig | UiKitThemeConfig;

export type UiKitThemeConfig = {
  id: string;
  conditions?: string[];
  prefix?: string;
  isUiKitTheme: true;
  semanticTokens: SemanticUiKitTokens;
};

export type BaseThemeConfig = {
  id: string;
  semanticTokens: SemanticTokens;
  conditions?: string[];
  prefix?: string;
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
