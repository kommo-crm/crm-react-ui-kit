import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { Text } from 'src/components/Text';

import { TextContextMenuTheme } from '../../../Text';

import { useContextMenuSubSelectContext } from '../../SubSelect.context';

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
      ...rest
    },
    ref
  ) => {
    const themeClassName = useThemeClassName(theme);

    const { value } = useContextMenuSubSelectContext(DISPLAY_NAME);

    return (
      <div
        ref={ref}
        className={cx(s.value, themeClassName, className)}
        {...rest}
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
