import React, { forwardRef } from 'react';
import { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { Text } from 'src/components/Text';

import DefaultSortIcon from 'src/icons/directionArrowDown.svg';

import { TextContextMenuTheme } from '../../../Text';

import { useSubSelectContext } from '../../SubSelect.context';

import { SortDirection } from '../../SubSelect.enums';

import type { SubSelectItemProps } from './Item.props';

import s from './Item.module.css';

const DISPLAY_NAME = 'ContextMenu.SubSelect.Item';

export const Item = forwardRef<HTMLDivElement, SubSelectItemProps>(
  (
    {
      theme,
      className,
      children,
      icon,
      item,
      sortIcon,
      isDisabled,
      isDanger,
      ...props
    },
    ref
  ) => {
    const themeClassName = useThemeClassName(theme);

    const {
      value: selectedItem,
      sortDirection,
      onChange,
    } = useSubSelectContext(DISPLAY_NAME);
    const isActive = selectedItem?.value === item.value;

    const SortIcon = sortIcon || DefaultSortIcon;
    const showSortIcon = isActive && item.sortable;

    const handleSelect = () => {
      if (isDisabled) {
        return;
      }

      let nextDirection: SortDirection | undefined;

      if (item.sortable) {
        if (isActive) {
          nextDirection =
            sortDirection === SortDirection.ASC
              ? SortDirection.DESC
              : SortDirection.ASC;
        } else {
          nextDirection = SortDirection.ASC;
        }
      } else {
        nextDirection = undefined;
      }

      onChange(item, nextDirection);
    };

    return (
      <RadixDropdownMenuItem
        ref={ref}
        className={cx(s.item, themeClassName, className)}
        disabled={isDisabled}
        data-danger={isDanger ? '' : undefined}
        data-active={isActive ? '' : undefined}
        data-has-icon={icon ? '' : undefined}
        onSelect={handleSelect}
        {...props}
      >
        {icon}
        <Text theme={TextContextMenuTheme} size="l">
          {item.option}
        </Text>
        {showSortIcon && (
          <SortIcon
            className={cx(s.sort_icon, {
              [s.asc]: sortDirection === 'asc',
            })}
          />
        )}
        {children}
      </RadixDropdownMenuItem>
    );
  }
);

Item.displayName = DISPLAY_NAME;
