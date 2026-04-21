import { PrimitivePath } from '@/design/primitives';

import { ColorValue } from './color';
export interface ThemeConfig<SemanticTokens> {
  id: string;
  semanticTokens: SemanticTokens;
  conditions?: string[];
  prefix?: string;
}

export type TokenPrimitiveValue = ColorValue;
export type TokenSemanticValue = PrimitivePath;
export type TokenValue = ColorValue;
export type TokenPath = PrimitivePath;
export interface UsableTokens {
  [key: string]: unknown;
}
