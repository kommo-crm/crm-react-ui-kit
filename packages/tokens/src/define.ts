import { ThemeConfig } from '@/types/common';

export const defineSemanticTokens = <SemanticTokens>(
  tokens: SemanticTokens
): SemanticTokens => tokens;

export const defineTheme = <SemanticTokens>(
  config: ThemeConfig<SemanticTokens>
): ThemeConfig<SemanticTokens> => config;
