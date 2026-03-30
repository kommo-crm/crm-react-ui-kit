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

      return {
        themeId: themeKey,
        selector: conditions ? conditions.join(',\n') : ':root',
        primitiveVars: flattenVars(themeConfig.primitives),
        semantic: flattenVars(themeConfig.semantic),
      };
    }
  );
}
