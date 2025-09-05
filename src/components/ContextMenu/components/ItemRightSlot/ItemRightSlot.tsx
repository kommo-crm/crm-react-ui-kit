import React, { forwardRef, useEffect, useState, useRef } from 'react';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useStopContextMenuEvents } from '../../hooks/useStopContextMenuEvents/useStopContextMenuEvents';

import type { ItemRightSlotProps } from './ItemRightSlot.props';

import s from './ItemRightSlot.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemRightSlot';

export const ItemRightSlot = forwardRef<HTMLDivElement, ItemRightSlotProps>(
  ({ className, children, ...rest }, ref) => {
    const slotRef = useRef<HTMLDivElement>(null);
    const [hasSubmenu, setHasSubmenu] = useState(false);

    useEffect(() => {
      if (!slotRef.current) {
        return;
      }

      const trigger = slotRef.current.querySelector('[data-submenu-trigger]');

      setHasSubmenu(!!trigger);
    }, [children]);

    const stopEventsHook = useStopContextMenuEvents();
    const stopEvents = hasSubmenu ? stopEventsHook : {};

    return (
      <div
        ref={mergeRefs(slotRef, ref)}
        className={cx(s.right_slot, className)}
        data-submenu-right-slot={hasSubmenu ? '' : undefined}
        {...stopEvents}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ItemRightSlot.displayName = DISPLAY_NAME;
