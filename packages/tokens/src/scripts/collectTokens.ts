import { PRIMITIVE_GROUPS, THEMES, themesConfig } from '@/const';
import themes from '@/design/themes';
import flattenVars from '@/utils/flattenVars';
import getPrimitiveVarName from '@/utils/getPrimitiveVarName';

export type ThemeTokens = {
  themeId: string;
  selector: string;
  /** Flat map of primitive var names to actual values */
  primitiveVars: Record<string, string>;
  /** Flat map of semantic var names to raw paths or raw CSS values */
  semantic: Record<string, string>;
};

export function collectTokens(): ThemeTokens[] {
  return [...THEMES].map((themeName) => {
    const config = themesConfig[themeName];
    const theme = themes[themeName];
    const primitiveVars: Record<string, string> = {};

    for (const group of PRIMITIVE_GROUPS) {
      const groupData = (theme.primitives as Record<string, unknown>)[
        group.key
      ];
      const data = group.themeVariant
        ? (groupData as Record<string, unknown>)[theme.id]
        : groupData;

      if (group.scaled) {
        for (const [family, shades] of Object.entries(
          data as Record<string, unknown>
        )) {
          for (const scale of group.scales) {
            const value = (shades as Record<number, string>)[scale];

            if (value !== undefined) {
              const varName = getPrimitiveVarName(
                `${group.prefix}.${theme.id}.${family}.${scale}`
              );

              primitiveVars[varName] = value;
            }
          }
        }
      } else {
        Object.assign(
          primitiveVars,
          flattenVars(data as Record<string, unknown>, group.prefix)
        );
      }
    }

    return {
      themeId: theme.id,
      selector: config.conditions ? config.conditions.join(',\n') : ':root',
      primitiveVars,
      semantic: flattenVars(theme.semantic as Record<string, unknown>),
    };
  });
}
