import React, { forwardRef } from 'react';

import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { type TextProps } from './Text.props';

import { TextTheme } from './Text.themes';

import s from './Text.module.css';

const cn = {
  s: s.s,
  m: s.m,
  ms: s.ms,
  l: s.l,
  xl: s.xl,
};

export const Text = forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const {
    children,
    className = '',
    isEllipsis = false,
    maxRows = 1,
    theme,
    style = {},
    size,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<TextTheme>(theme);

  const isLineClampAllowed = maxRows > 1;

  switch (size) {
    case 's':
    case 'm':
    case 'ms':
    case 'l':
    case 'xl':
      return (
        <span
          ref={ref}
          style={{
            ...(isLineClampAllowed && { WebkitLineClamp: maxRows }),
            ...style,
          }}
          className={cx(s.text, cn[size], themeClassName, className, {
            [s.ellipsis]: isEllipsis,
            [s.line_clamp]: isLineClampAllowed,
          })}
          {...rest}
        >
          {children}
        </span>
      );

    default:
  }

  throw new Error('Unknown size was presented');
});

Text.displayName = 'Text';
