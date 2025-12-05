import React, { forwardRef, useEffect, useState, useRef } from 'react';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import { useStopEvents } from '../../hooks';

import type { ItemRightSlotProps } from './ItemRightSlot.props';

import s from './ItemRightSlot.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemRightSlot';

export const ItemRightSlot = forwardRef<HTMLDivElement, ItemRightSlotProps>(
  (props, ref) => {
    const {
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
    } = props;

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

    const stoppedHandlers = useStopEvents({
      handlers: defaultHandlers,
    });

    const handlers = hasSubmenu ? stoppedHandlers : defaultHandlers;

    return (
      <div
        ref={mergeRefs(slotRef, ref)}
        className={cx(s.rightSlot, className)}
        {...handlers}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ItemRightSlot.displayName = DISPLAY_NAME;
