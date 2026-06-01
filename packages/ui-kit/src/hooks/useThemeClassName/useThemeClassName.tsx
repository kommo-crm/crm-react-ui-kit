import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';

import { CrmUiKitCSSProperties } from 'src/lib/theme';

const DEFAULT_PREFIX = 'crm-ui-kit-theme';

const stylesMap = new Map<object, string>();

const createClass = <T extends CrmUiKitCSSProperties>(newTheme: T) => {
  const className = `${DEFAULT_PREFIX}-${nanoid(5)}`;
  const styleElement = document.createElement('style');
  const stylesString = Object.entries(newTheme)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n  ');

  styleElement.textContent = `.${className} {\n  ${stylesString}\n}`;
  document.head.appendChild(styleElement);

  return className;
};

export const useThemeClassName = <T extends CrmUiKitCSSProperties>(
  theme: T
) => {
  const [className, setClassName] = useState<string>('');

  useMemo(() => {
    const existedClassName = stylesMap.get(theme);

    if (existedClassName) {
      setClassName(existedClassName);
    } else {
      const themeClassName = createClass(theme);

      stylesMap.set(theme, themeClassName);
      setClassName(themeClassName);
    }
  }, [theme]);

  return className;
};
