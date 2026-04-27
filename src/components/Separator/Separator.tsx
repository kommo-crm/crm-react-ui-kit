import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { type SeparatorProps } from './Separator.props';
import { type SeparatorTheme } from './Separator.themes';

import s from './Separator.module.css';

type El = HTMLDivElement;

export const Separator = forwardRef<El, SeparatorProps>((props, ref) => {
  const { className = '', theme, orientation = 'horizontal', ...rest } = props;

  const themeClassName = useThemeClassName<SeparatorTheme>(theme);

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cx(
        s.separator,
        orientation === 'vertical' ? s.vertical : s.horizontal,
        themeClassName,
        className
      )}
      {...rest}
    />
  );
});

Separator.displayName = 'Separator';
