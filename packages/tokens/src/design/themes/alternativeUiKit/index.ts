import { defineUiKitSemanticTokens, defineUiKitTheme } from '@/define';

const semanticTokens = defineUiKitSemanticTokens({
  palette: {
    background: {
      default: 'color.dark.azure.100',
    },
  },
});

export default defineUiKitTheme({
  id: 'alternative-ui-kit',
  prefix: 'crm-ui-kit',
  conditions: [':root[data-crm-ui-kit-theme="alternative"]'],
  semanticTokens,
});
