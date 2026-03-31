import themes from '@/design/themes';
import flattenVars from '@/libs/flattenVars';
import { Theme, ThemeConfig } from '@/types/common';

export type ThemeTokens = {
  themeId: Theme;
  selector: string;
  primitiveVars: Record<string, string>;
  semantic: Record<string, string>;
};

export function collectTokens(): ThemeTokens[] {
  return (Object.entries(themes) as Array<[Theme, ThemeConfig]>).map(
    ([themeKey, themeConfig]) => {
      const { conditions } = themeConfig;

      const prefix = `color.${themeKey}.`;
      const rawSemantic = flattenVars(themeConfig.semantic);
      const semantic = Object.fromEntries(
        Object.entries(rawSemantic).map(([k, v]) => [
          k,
          v.startsWith(prefix) ? `color.${v.slice(prefix.length)}` : v,
        ])
      );

      return {
        themeId: themeKey,
        selector: conditions ? conditions.join(',\n') : ':root',
        primitiveVars: flattenVars({ color: themeConfig.primitives.color[themeKey] }),
        semantic,
      };
    }
  );
}
