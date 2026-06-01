import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { SpinnerProps } from './Spinner.props';
import { SpinnerTheme } from './Spinner.themes';

import s from './Spinner.module.css';

type S = HTMLSpanElement;

export const Spinner = forwardRef<S, SpinnerProps>((props, ref) => {
  const { isCentered = false, className = '', theme, ...rest } = props;

  const themeClassName = useThemeClassName<SpinnerTheme>(theme);

  return (
    <span
      ref={ref}
      className={cx(
        s.spinner,
        {
          [s.centered]: isCentered,
        },
        themeClassName,
        className
      )}
      {...rest}
    />
  );
});

Spinner.displayName = 'Spinner';
