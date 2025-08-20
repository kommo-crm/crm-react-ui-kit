import React, { forwardRef } from 'react';
import { ItemIndicator as RadixDropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import type { ItemIndicatorProps } from './ItemIndicator.props';

import s from './ItemIndicator.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemIndicator';

export const ItemIndicator = forwardRef<HTMLDivElement, ItemIndicatorProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <RadixDropdownMenuItemIndicator
        ref={ref}
        className={cx(s.item_indicator, className)}
        {...rest}
      >
        {children}
      </RadixDropdownMenuItemIndicator>
    );
  }
);

ItemIndicator.displayName = DISPLAY_NAME;
