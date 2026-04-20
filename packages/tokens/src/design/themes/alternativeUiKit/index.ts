import { defineUiKitSemanticTokens, defineUiKitTheme } from '@/define';

const semanticTokens = defineUiKitSemanticTokens({});

export const alternativeUiKitTheme = defineUiKitTheme({
  id: 'alternative-ui-kit',
  prefix: 'crm-ui-kit',
  conditions: [':root[data-crm-ui-kit-theme="alternative"]'],
  semanticTokens,
});
