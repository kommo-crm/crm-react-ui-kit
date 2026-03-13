import { PRIMITIVE_GROUPS } from '@/const';
import themes from '@/design/themes';
import { resolveSemanticTokens } from '@/utils/resolveSemanticTokens';

import { collectTokens } from './collectTokens';

function buildTokens(): unknown {
  return Object.fromEntries(
    collectTokens().map(({ themeId }) => {
      const theme = themes[themeId as keyof typeof themes];

      const primitives = Object.fromEntries(
        PRIMITIVE_GROUPS.map((group) => {
          const groupData = (theme.primitives as Record<string, unknown>)[
            group.key
          ];
          const data = group.themeVariant
            ? (groupData as Record<string, unknown>)[themeId]
            : groupData;

          return [group.key, data];
        })
      );

      const semantic = resolveSemanticTokens(theme.semantic, theme.primitives);

      return [themeId, { primitives, semantic }];
    })
  );
}

const serialized = (): string => JSON.stringify(buildTokens(), null, 2);

export function generateEsm(): string {
  return `export const tokens = ${serialized()};\n`;
}

export function generateCjs(): string {
  return [
    '"use strict";',
    'Object.defineProperty(exports, "__esModule", { value: true });',
    `exports.tokens = ${serialized()};`,
    '',
  ].join('\n');
}
