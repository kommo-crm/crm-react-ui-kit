import { defineUiKitSemanticTokens, defineUiKitTheme } from '@/define';

const semanticTokens = defineUiKitSemanticTokens({});

export default defineUiKitTheme({
  id: 'light-ui-kit',
  prefix: 'crm-ui-kit',
  semanticTokens,
});
