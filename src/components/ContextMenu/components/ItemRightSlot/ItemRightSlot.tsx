import React, { forwardRef } from 'react';
import cx from 'classnames';

import type { ItemRightSlotProps } from './ItemRightSlot.props';

import s from './ItemRightSlot.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemRightSlot';

export const ItemRightSlot = forwardRef<HTMLDivElement, ItemRightSlotProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={cx(s.right_slot, className)} {...rest}>
        {children}
      </div>
    );
  }
);

ItemRightSlot.displayName = DISPLAY_NAME;
