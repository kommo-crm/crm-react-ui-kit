import themes from '@/design/themes';
import { resolveSemanticTokens } from '@/utils/resolveSemanticTokens';

function buildTokens() {
  return Object.fromEntries(
    Object.entries(themes).map(([themeId, theme]) => {
      const semanticVars = resolveSemanticTokens(theme.semantic, theme.primitives);

      return [themeId, { primitives: theme.primitives, semantic: semanticVars }];
    })
  );
}

export function generateTs(): string {
  return `// Auto-generated. Do not edit manually.\nexport const tokens = ${JSON.stringify(buildTokens(), null, 2)} as const;\n`;
}
