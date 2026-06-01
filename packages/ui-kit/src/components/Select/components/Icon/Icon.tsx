import React, { forwardRef } from 'react';

import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { IconProps } from './Icon.props';

import s from './Icon.module.css';

const DISPLAY_NAME = 'Select.Icon';

type S = HTMLSpanElement;

export const Icon = forwardRef<S, IconProps>((props, ref) => {
  const { theme, children } = props;

  const themeClassName = useThemeClassName(theme);

  return (
    children && (
      <span className={cx(s.wrapper, themeClassName)} ref={ref}>
        {children}
      </span>
    )
  );
});

Icon.displayName = DISPLAY_NAME;
