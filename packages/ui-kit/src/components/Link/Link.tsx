import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { LinkProps } from './Link.props';
import { LinkTheme } from './Link.themes';

import s from './Link.module.css';

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { className = '', theme, children, ...rest } = props;

  const themeClassName = useThemeClassName<LinkTheme>(theme);

  return (
    <a ref={ref} className={cx(s.link, themeClassName, className)} {...rest}>
      {children}
    </a>
  );
});

Link.displayName = 'Link';
