import { SemanticUiKitTokens } from '@/types/semantic';

import { defineSemanticTokens, defineTheme } from '@/define';

const semanticTokens = defineSemanticTokens<SemanticUiKitTokens>({});

export const lightUiKitTheme = defineTheme<SemanticUiKitTokens>({
  id: 'light-ui-kit',
  prefix: 'crm-ui-kit',
  semanticTokens,
});
