import React, { forwardRef } from 'react';
import { CheckboxItem as RadixDropdownMenuCheckboxItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useContextMenuContext } from '../../ContextMenu.context';

import { useLevelProviderContext } from '../LevelProvider';

import type { CheckboxItemProps } from './CheckboxItem.props';

import s from './CheckboxItem.module.css';

const DISPLAY_NAME = 'ContextMenu.CheckboxItem';

export const CheckboxItem = forwardRef<HTMLDivElement, CheckboxItemProps>(
  (
    {
      theme,
      className,
      children,
      icon,
      text,
      onChange,
      isDisabled,
      isChecked,
      ...props
    },
    ref
  ) => {
    const { disableItemIconAlign } = useContextMenuContext(DISPLAY_NAME);
    const { hasItemWithIcon } = useLevelProviderContext(DISPLAY_NAME);

    const themeClassName = useThemeClassName(theme);

    return (
      <RadixDropdownMenuCheckboxItem
        ref={ref}
        className={cx(s.checkbox_item, themeClassName, className)}
        disabled={isDisabled}
        checked={isChecked}
        data-no-icon-align={
          icon || (!disableItemIconAlign && !hasItemWithIcon) ? '' : undefined
        }
        onCheckedChange={(checked) => {
          if (onChange) {
            const event = {
              target: { checked },
            } as React.ChangeEvent<HTMLInputElement>;

            onChange(event);
          }
        }}
        {...props}
      >
        {icon}
        {text}
        {children}
      </RadixDropdownMenuCheckboxItem>
    );
  }
);

CheckboxItem.displayName = DISPLAY_NAME;
