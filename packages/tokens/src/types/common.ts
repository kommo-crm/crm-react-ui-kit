import {
  SemanticUiKitTokens,
  SemanticUiKitTokenPath,
  SemanticTokens,
  SemanticTokenPath,
} from '@/types/semantic';

import { PrimitivePath } from '@/design/primitives';

import { ColorValue } from './color';

export type ThemeConfig = BaseThemeConfig | UiKitThemeConfig;

export interface UiKitThemeConfig {
  id: string;
  conditions?: string[];
  prefix?: string;
  isUiKitTheme: true;
  semanticTokens: SemanticUiKitTokens;
}

export interface BaseThemeConfig {
  id: string;
  semanticTokens: SemanticTokens;
  conditions?: string[];
  prefix?: string;
  isUiKitTheme?: false;
}

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
export interface UsableTokens {
  [key: string]: unknown;
}
