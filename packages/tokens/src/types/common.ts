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

export type UiKitThemeConfig = {
  id: string;
  conditions?: string[];
  prefix?: string;
  isUiKitTheme: true;
  semanticTokens: SemanticUiKitTokens;
  componentTokens: ComponentUiKitTokens;
};

export type CoreThemeConfig = {
  id: string;
  semanticTokens: SemanticTokens;
  componentTokens: ComponentTokens;
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
