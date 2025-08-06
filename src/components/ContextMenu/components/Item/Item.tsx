import React, { forwardRef } from 'react';
import { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import type { ItemProps } from './Item.props';

import s from './Item.module.css';

const DISPLAY_NAME = 'ContextMenu.Item';

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  (
    { theme, className, children, icon, text, isDisabled, isDanger, ...props },
    ref
  ) => {
    const themeClassName = useThemeClassName(theme);

    return (
      <RadixDropdownMenuItem
        ref={ref}
        className={cx(s.item, themeClassName, className)}
        disabled={isDisabled}
        data-danger={isDanger ? '' : undefined}
        data-has-icon={icon ? '' : undefined}
        {...props}
      >
        {icon}
        {text}
        {children}
      </RadixDropdownMenuItem>
    );
  }
);

Item.displayName = DISPLAY_NAME;
