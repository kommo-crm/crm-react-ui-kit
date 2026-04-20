import { SemanticUiKitTokens } from '@/types/semantic';

import { defineSemanticTokens, defineTheme } from '@/define';

const semanticTokens = defineSemanticTokens<SemanticUiKitTokens>({
  palette: {
    text: {
      error: 'color.dark.red.300',
    },
  },
});

export const alternativeUiKitTheme = defineTheme<SemanticUiKitTokens>({
  id: 'alternative-ui-kit',
  prefix: 'crm-ui-kit',
  conditions: [':root[data-crm-ui-kit-theme="alternative"]'],
  semanticTokens,
});
