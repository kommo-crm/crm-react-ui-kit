import { CoreThemeConfig, UiKitThemeConfig } from '@/types/common';
import { SemanticUiKitTokens, SemanticTokens } from '@/types/semantic';

// ── UiKit ────────────────────────────────────────────────────────────────────

export const defineUiKitSemanticTokens = (
  tokens: SemanticUiKitTokens
): SemanticUiKitTokens => tokens;

export const defineUiKitTheme = (
  config: Omit<UiKitThemeConfig, 'isUiKitTheme'>
): UiKitThemeConfig => ({ ...config, isUiKitTheme: true });

// ── Core ─────────────────────────────────────────────────────────────────────

export const defineCoreSemanticTokens = (
  tokens: SemanticTokens
): SemanticTokens => tokens;

export const defineCoreTheme = (config: CoreThemeConfig): CoreThemeConfig =>
  config;
