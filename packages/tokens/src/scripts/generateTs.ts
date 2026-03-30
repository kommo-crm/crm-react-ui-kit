import themes from '@/design/themes';
import { resolveSemanticTokens } from '@/libs/resolveSemanticTokens';
import { Theme, ThemeConfig } from '@/types/common';

function buildTokens() {
  return Object.fromEntries(
    (Object.entries(themes) as Array<[Theme, ThemeConfig]>).map(
      ([themeId, theme]) => {
        const semanticVars = resolveSemanticTokens(
          theme.semantic,
          theme.primitives
        );

        return [
          themeId,
          { primitives: theme.primitives, semantic: semanticVars },
        ];
      }
    )
  );
}

export function generateTs(): string {
  return `// Auto-generated. Do not edit manually.\nexport const tokens = ${JSON.stringify(buildTokens(), null, 2)} as const;\n`;
}
