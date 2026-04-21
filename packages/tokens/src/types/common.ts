import { PrimitivePath } from '@/design/primitives';

import { ColorValue } from './color';

export interface UsableTokens {
  [key: string]: string | UsableTokens | undefined;
}

export interface ThemeConfig<SemanticTokens = UsableTokens> {
  id: string;
  semanticTokens: SemanticTokens;
  conditions?: string[];
  prefix?: string;
}

export type TokenPrimitiveValue = ColorValue;
export type TokenSemanticValue = PrimitivePath;
export type TokenValue = ColorValue;
export type TokenPath = PrimitivePath;
