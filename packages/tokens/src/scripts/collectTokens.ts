import { Theme, themesConfig } from '@/const';
import themes from '@/design/themes';
import flattenVars from '@/utils/flattenVars';

export type ThemeTokens = {
  themeId: Theme;
  selector: string;
  /** Flat map of primitive var names to actual values */
  primitiveVars: Record<string, string>;
  /** Flat map of semantic var names to raw paths or raw CSS values */
  semantic: Record<string, string>;
};

export function collectTokens(): ThemeTokens[] {
  return (
    Object.entries(themesConfig) as [Theme, (typeof themesConfig)[Theme]][]
  ).map(([themeKey, themeConfig]) => {
    const { conditions } = themeConfig;
    const theme = themes[themeKey];

    return {
      themeId: themeKey,
      selector: conditions ? conditions.join(',\n') : ':root',
      primitiveVars: flattenVars(theme.primitives as Record<string, unknown>),
      semantic: flattenVars(theme.semantic as Record<string, unknown>),
    };
  });
}
