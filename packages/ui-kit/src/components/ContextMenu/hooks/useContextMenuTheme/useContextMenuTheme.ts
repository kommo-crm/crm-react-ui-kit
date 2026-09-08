import { useThemeClassName } from '@ui-kit/hooks/useThemeClassName';

import {
  ContextMenuTheme,
  ContextMenuThemeType,
} from '../../ContextMenu.themes';
import {
  THEME_DISPLAY_NAME,
  useContextMenuThemeContext,
} from '../../ContextMenu.context';

/**
 * Resolves the theme class name of a menu level (`Root`, `Sub` or `SubRoot`).
 *
 * A level that receives a `theme` is themed with it, otherwise it inherits the
 * theme of the level it is rendered in. The root level falls back to
 * `ContextMenuTheme`, which keeps `theme` optional and the component backward
 * compatible.
 */
export const useContextMenuTheme = (theme?: ContextMenuThemeType) => {
  const { themeClassName: inheritedThemeClassName } =
    useContextMenuThemeContext(THEME_DISPLAY_NAME);

  const ownThemeClassName = useThemeClassName<ContextMenuThemeType>(
    theme ?? ContextMenuTheme
  );

  if (theme || !inheritedThemeClassName) {
    return ownThemeClassName;
  }

  return inheritedThemeClassName;
};
