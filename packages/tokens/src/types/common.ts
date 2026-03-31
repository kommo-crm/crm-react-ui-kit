import { SemanticTokens } from '@/types/semantic';
import { ComponentTokens } from '@/types/component';

export type ThemeConfig = {
  id: string;
  semanticTokens: SemanticTokens;
  componentTokens: ComponentTokens;
  conditions?: string[];
};

export type Theme = 'light' | 'dark';
