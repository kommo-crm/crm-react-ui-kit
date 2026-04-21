import { ThemeConfig } from '@/types/common';
import { SemanticTokens } from '@/types/semantic';

import { defineSemanticTokens, defineTheme } from '@/define';

const semanticTokens = defineSemanticTokens<SemanticTokens>({});

export const lightTheme: ThemeConfig<SemanticTokens> =
  defineTheme<SemanticTokens>({
    id: 'light',
    semanticTokens,
  });
