import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { Text } from 'src/components/Text';

import { TextContextMenuTheme } from '../../../Text';

import { useSubSelectContext } from '../../SubSelect.context';

import type { SubSelectValueProps } from './Value.props';

import s from './Value.module.css';

const DISPLAY_NAME = 'ContextMenu.SubSelect.Value';

export const Value = forwardRef<HTMLDivElement, SubSelectValueProps>(
  (
    {
      theme,
      className,
      children,
      label,
      placeholder = '',
      separator = ':',
      ...props
    },
    ref
  ) => {
    const { value } = useSubSelectContext(DISPLAY_NAME);

    const themeClassName = useThemeClassName(theme);

    return (
      <div
        ref={ref}
        className={cx(s.value, themeClassName, className)}
        {...props}
      >
        <Text theme={TextContextMenuTheme} size="l">
          <span className={cx(s.label)}>
            {label}
            {separator}
          </span>
          {value ? (
            value.option
          ) : (
            <div className={cx(s.placeholder)}>{placeholder}</div>
          )}
        </Text>
        {children}
      </div>
    );
  }
);

Value.displayName = DISPLAY_NAME;
