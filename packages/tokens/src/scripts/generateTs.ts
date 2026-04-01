import primitives from '@/design/primitives';
import themes from '@/design/themes';
import { resolveSemanticTokens } from '@/libs/resolveSemanticTokens';

const HEADER = '// Auto-generated. Do not edit manually.\n';

export function generatePrimitivesTs(): string {
  return `${HEADER}export const color = ${JSON.stringify(primitives.color, null, 2)} as const;\n`;
}

export function generateThemesTs(): Record<string, string> {
  return Object.fromEntries(
    themes.map((theme) => {
      const semantic = resolveSemanticTokens(theme.semanticTokens, primitives);
      const component = resolveSemanticTokens(theme.componentTokens, primitives);
      const lines = [
        `${HEADER}export const semantic = ${JSON.stringify(semantic, null, 2)} as const;`,
        `export const component = ${JSON.stringify(component, null, 2)} as const;\n`,
      ].join('\n');
      return [theme.id, lines];
    })
  );
}
