import { SemanticTokens, SemanticTokenPath } from '@/types/semantic';
import { ComponentTokens } from '@/types/component';
import { ColorValue } from './color';
import { PrimitivePath } from '@/design/primitives';

export type ThemeConfig = {
  id: string;
  semanticTokens: SemanticTokens;
  componentTokens: ComponentTokens;
  conditions?: string[];
  prefix?: string;
};

export type TokenPrimitiveValue = ColorValue;
export type TokenSemanticValue = PrimitivePath;
export type TokenComponentValue = PrimitivePath | SemanticTokenPath;
export type TokenValue = ColorValue;
export type TokenPath = PrimitivePath | SemanticTokenPath;
export type UsableTokens = Record<string, unknown>;
