import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { Text, TextInheritTheme } from 'src/components/Text';

import { CounterBadgeProps } from './CounterBadge.props';
import { CounterBadgeTheme } from './CounterBadge.themes';

import s from './CounterBadge.module.css';

type S = HTMLSpanElement;

export const CounterBadge = forwardRef<S, CounterBadgeProps>((props, ref) => {
  const { children, className, theme, ...rest } = props;

  const themeClassName = useThemeClassName<CounterBadgeTheme>(theme);

  return (
    <span
      ref={ref}
      className={cx(s.badge, themeClassName, className)}
      {...rest}
    >
      <Text size="ms" theme={TextInheritTheme} className={s.text}>
        {children}
      </Text>
    </span>
  );
});

CounterBadge.displayName = 'CounterBadge';
