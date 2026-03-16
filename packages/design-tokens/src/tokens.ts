import { PRIMITIVE_GROUPS } from '@/const';
import themes from '@/design/themes';
import { collectTokens } from '@/scripts/collectTokens';
import { resolveSemanticTokens } from '@/utils/resolveSemanticTokens';

export type { ColorValue, Hex, RGB, RGBA, HSL, HSLA, CSSVariable, ColorFunction, ColorKeyword, ColorShades, ScaledShades } from '@/types/color';
export type { Theme, ColorScale } from '@/const';

function buildTokens() {
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

export const tokens = buildTokens();
