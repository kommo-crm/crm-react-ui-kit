import primitives from '@/design/primitives';
import themes from '@/design/themes';
import { resolveTokens } from '@/libs/resolveTokens';

const HEADER = '// Auto-generated. Do not edit manually.\n';

export function generatePrimitivesTs(): string {
  return `${HEADER}export const color = ${JSON.stringify(primitives.color, null, 2)} as const;\n`;
}

export function generateThemesTs(): Record<string, string> {
  return Object.fromEntries(
    themes.map((theme) => {
      const semantic = resolveTokens(theme.semanticTokens, primitives);
      const lines = [
        `${HEADER}export const semantic = ${JSON.stringify(semantic, null, 2)} as const;`,
      ].join('\n');
      return [theme.id, lines];
    })
  );
}
