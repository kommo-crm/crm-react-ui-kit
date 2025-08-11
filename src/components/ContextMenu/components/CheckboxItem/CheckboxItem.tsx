import React, { forwardRef } from 'react';
import { CheckboxItem as RadixDropdownMenuCheckboxItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useLevelContext } from '../../providers/LevelProvider';

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
    const themeClassName = useThemeClassName(theme);

    const { hasItemWithIcon } = useLevelContext(DISPLAY_NAME);

    return (
      <RadixDropdownMenuCheckboxItem
        ref={ref}
        className={cx(s.checkbox_item, themeClassName, className)}
        disabled={isDisabled}
        checked={isChecked}
        data-no-icon-align={icon || !hasItemWithIcon ? '' : undefined}
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
