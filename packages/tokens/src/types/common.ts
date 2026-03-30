import { PrimitiveTokens } from '@/design/primitives';
import { SemanticTokens } from './semantic';

export type ThemeConfig = {
  primitives: PrimitiveTokens;
  semantic: SemanticTokens;
  conditions?: string[];
};

export type Theme = 'light' | 'dark';
