import { SemanticUiKitTokens } from '@/types/semantic';

import { defineSemanticTokens, defineTheme } from '@/define';

const semanticTokens = defineSemanticTokens<SemanticUiKitTokens>({
  palette: {
    text: {
      error: 'color.light.red.600',
    },
  },
});

export const lightUiKitTheme = defineTheme<SemanticUiKitTokens>({
  id: 'light-ui-kit',
  prefix: 'crm-ui-kit',
  semanticTokens,
});
