import themes from '@/design/themes';
import { resolveSemanticTokens } from '@/utils/resolveSemanticTokens';

import { collectTokens } from './collectTokens';

export function generateJs(): string {
  const result = Object.fromEntries(
    collectTokens().map(({ themeId, primitiveVars }) => {
      const theme = themes[themeId as keyof typeof themes];
      const semantic = resolveSemanticTokens(theme.semantic, theme.primitives);

      return [themeId, { primitives: primitiveVars, semantic }];
    })
  );

  return `export const tokens = ${JSON.stringify(result, null, 2)};\n`;
}
