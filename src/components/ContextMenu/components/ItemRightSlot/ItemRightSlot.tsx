import React, { forwardRef, useEffect, useState, useRef } from 'react';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useStopContextMenuEvents } from '../../hooks';

import type { ItemRightSlotProps } from './ItemRightSlot.props';

import s from './ItemRightSlot.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemRightSlot';

export const ItemRightSlot = forwardRef<HTMLDivElement, ItemRightSlotProps>(
  (
    {
      className,
      children,
      onClick,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onPointerDown,
      onPointerUp,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,

      ...rest
    },
    ref
  ) => {
    const slotRef = useRef<HTMLDivElement>(null);
    const [hasSubmenu, setHasSubmenu] = useState(false);

    useEffect(() => {
      if (!slotRef.current) {
        return;
      }

      const trigger = slotRef.current.querySelector('[data-submenu-trigger]');

      setHasSubmenu(!!trigger);
    }, [children]);

    const defaultHandlers = {
      onClick,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onPointerDown,
      onPointerUp,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,
    };

    const stopEventsHook = useStopContextMenuEvents({
      handlers: defaultHandlers,
    });

    const handlers = hasSubmenu ? stopEventsHook : defaultHandlers;

    return (
      <div
        ref={mergeRefs(slotRef, ref)}
        className={cx(s.rightSlot, className)}
        data-submenu-right-slot={hasSubmenu ? '' : undefined}
        {...handlers}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ItemRightSlot.displayName = DISPLAY_NAME;
