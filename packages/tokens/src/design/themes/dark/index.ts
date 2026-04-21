import { ThemeConfig } from '@/types/common';
import { SemanticTokens } from '@/types/semantic';

import { defineSemanticTokens, defineTheme } from '@/define';

const semanticTokens = defineSemanticTokens<SemanticTokens>({});

export const darkTheme: ThemeConfig<SemanticTokens> =
  defineTheme<SemanticTokens>({
    id: 'dark',
    semanticTokens,
    conditions: [':root[data-color-scheme=dark]'],
  });
