import { PrimitiveTokens } from '@/design/primitives';
import { SemanticTokens } from '@/design/semantics';
import { ComponentTokens } from '@/design/components';

export type ThemeConfig = {
  primitiveTokens: PrimitiveTokens;
  semanticTokens: SemanticTokens;
  componentTokens: ComponentTokens;
  conditions?: string[];
};

export type Theme = 'light' | 'dark';
