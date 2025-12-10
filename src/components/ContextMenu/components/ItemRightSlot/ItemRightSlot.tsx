import React, { forwardRef, useEffect, useState, useRef } from 'react';
import cx from 'classnames';

import { mergeRefs } from 'src/lib/utils';

import type { ItemRightSlotProps } from './ItemRightSlot.props';

import s from './ItemRightSlot.module.css';

const DISPLAY_NAME = 'ContextMenu.ItemRightSlot';

export const ItemRightSlot = forwardRef<HTMLDivElement, ItemRightSlotProps>(
  (props, ref) => {
    const {
      className,
      children,
      onClick,
      onPointerDown,
      onPointerUp,

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

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hasSubmenu) {
        // Necessary if the Item is a link.
        e.preventDefault();
        // Necessary to stop propogation before Item
        e.stopPropagation();
      }

      onClick?.(e);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (hasSubmenu) {
        // Necessary if the Item is a link.
        e.preventDefault();
        // Necessary to stop propogation before Item
        e.stopPropagation();
      }

      onPointerDown?.(e);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      if (hasSubmenu) {
        // Necessary if the Item is a link.
        e.preventDefault();
        // Necessary to stop propogation before Item
        e.stopPropagation();
      }

      onPointerUp?.(e);
    };

    return (
      <div
        ref={mergeRefs(slotRef, ref)}
        className={cx(s.rightSlot, className)}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ItemRightSlot.displayName = DISPLAY_NAME;
