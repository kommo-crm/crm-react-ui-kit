import React, { forwardRef } from 'react';
import { ItemIndicator as RadixDropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import type { ItemIndicatorProps } from './ItemIndicator.props';

import s from './ItemIndicator.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemIndicator';

export const ItemIndicator = forwardRef<HTMLDivElement, ItemIndicatorProps>(
  ({ theme, className, children, ...props }, ref) => {
    const themeClassName = useThemeClassName(theme);

    return (
      <RadixDropdownMenuItemIndicator
        ref={ref}
        className={cx(s.item_indicator, themeClassName, className)}
        {...props}
      >
        {children}
      </RadixDropdownMenuItemIndicator>
    );
  }
);

ItemIndicator.displayName = DISPLAY_NAME;
