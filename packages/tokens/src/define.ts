import { ThemeConfig, UiKitThemeConfig } from '@/types/common';
import { SemanticUiKitTokens, SemanticTokens } from '@/types/semantic';

export const defineUiKitSemanticTokens = (
  tokens: SemanticUiKitTokens
): SemanticUiKitTokens => tokens;

export const defineUiKitTheme = (
  config: Omit<UiKitThemeConfig, 'isUiKitTheme'>
): UiKitThemeConfig => ({ ...config, isUiKitTheme: true });

export const defineSemanticTokens = (tokens: SemanticTokens): SemanticTokens =>
  tokens;

export const defineTheme = (config: ThemeConfig): ThemeConfig => config;
