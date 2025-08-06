import React, { forwardRef, useEffect } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { Text } from 'src/components/Text';

import { useContextMenuContext } from 'src/components/ContextMenu/ContextMenu.context';

import { TextContextMenuTheme } from '../../../Text';

import { useSubSelectContext } from '../../SubSelect.context';

import { useLevelProviderContext } from '../../../LevelProvider';

import type { SubSelectValueProps } from './Value.props';

import s from './Value.module.css';

const DISPLAY_NAME = 'ContextMenu.SubSelect.Value';

export const Value = forwardRef<HTMLDivElement, SubSelectValueProps>(
  (
    {
      theme,
      className,
      children,
      icon,
      label,
      placeholder = '',
      separator = ':',
      ...props
    },
    ref
  ) => {
    const { value } = useSubSelectContext(DISPLAY_NAME);
    const { disableItemIconAlign } = useContextMenuContext(DISPLAY_NAME);
    const { hasItemWithIcon, registerItemWithItem } =
      useLevelProviderContext(DISPLAY_NAME);

    const themeClassName = useThemeClassName(theme);

    useEffect(() => {
      if (icon) {
        registerItemWithItem();
      }
    }, [icon]);

    return (
      <div
        ref={ref}
        className={cx(s.value, themeClassName, className)}
        data-no-icon-align={
          icon || (!disableItemIconAlign && !hasItemWithIcon) ? '' : undefined
        }
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
