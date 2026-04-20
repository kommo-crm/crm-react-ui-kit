import { defineUiKitSemanticTokens, defineUiKitTheme } from '@/define';

const semanticTokens = defineUiKitSemanticTokens({});

export const lightUiKitTheme = defineUiKitTheme({
  id: 'light-ui-kit',
  prefix: 'crm-ui-kit',
  semanticTokens,
});
