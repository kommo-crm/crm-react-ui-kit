import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import type { ItemRightSlotProps } from './ItemRightSlot.props';

import s from './ItemRightSlot.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemRightSlot';

export const ItemRightSlot = forwardRef<HTMLDivElement, ItemRightSlotProps>(
  ({ theme, className, children, ...rest }, ref) => {
    const themeClassName = useThemeClassName(theme);

    return (
      <div
        ref={ref}
        className={cx(s.right_slot, themeClassName, className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ItemRightSlot.displayName = DISPLAY_NAME;
