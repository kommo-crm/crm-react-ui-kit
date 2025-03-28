import React, { forwardRef, useMemo } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { omit } from 'src/utils';

import { type CalloutProps } from './Callout.props';
import { CalloutThemeType } from './themes/CalloutBase.theme';

import s from './Callout.module.css';

type D = HTMLDivElement;

export const Callout = forwardRef<D, CalloutProps>((props, ref) => {
  const {
    className = '',
    isIconAvailable = true,
    theme,
    children,
    ...rest
  } = props;

  const { Icon } = theme;

  const themeStyles = useMemo(() => omit(theme, ['Icon']), [theme]);

  const themeClassName =
    useThemeClassName<Omit<CalloutThemeType, 'Icon'>>(themeStyles);

  return (
    <div
      ref={ref}
      className={cx(s.wrapper, themeClassName, className)}
      {...rest}
    >
      {isIconAvailable && <Icon className={cx(s.icon)} />}

      {children}
    </div>
  );
});

Callout.displayName = 'Callout';
