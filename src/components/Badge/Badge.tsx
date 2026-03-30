import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { Text, TextPrimaryTheme, type TextTheme } from 'src/components/Text';

import { type BadgeProps } from './Badge.props';
import { type BadgeThemeType } from './Badge.themes';

import s from './Badge.module.css';

type S = HTMLSpanElement;

const TextBadgeTheme: TextTheme = {
  ...TextPrimaryTheme,
  '--crm-ui-kit-text-color': 'inherit',
};

export const Badge = forwardRef<S, BadgeProps>((props, ref) => {
  const { theme, title, className, ...rest } = props;

  const themeClassName = useThemeClassName<BadgeThemeType>(theme);

  return (
    <span
      ref={ref}
      className={cx(s.badge, themeClassName, className)}
      {...rest}
    >
      <Text size="ms" isEllipsis theme={TextBadgeTheme}>
        {title}
      </Text>
    </span>
  );
});

Badge.displayName = 'Badge';
