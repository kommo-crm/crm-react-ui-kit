import themes from '@/design/themes';
import { resolveSemanticTokens } from '@/libs/resolveSemanticTokens';
import { Theme, ThemeConfig } from '@/types/common';

export function generateTs(): Record<Theme, string> {
  return Object.fromEntries(
    (Object.entries(themes) as Array<[Theme, ThemeConfig]>).map(
      ([themeId, theme]) => {
        const semanticVars = resolveSemanticTokens(
          theme.semantic,
          theme.primitives
        );

        const primitives = { color: theme.primitives.color[themeId] };
        const tokens = { primitives, semantic: semanticVars };
        const content = `// Auto-generated. Do not edit manually.\nexport const tokens = ${JSON.stringify(tokens, null, 2)} as const;\n`;

        return [themeId, content];
      }
    )
  ) as Record<Theme, string>;
}
