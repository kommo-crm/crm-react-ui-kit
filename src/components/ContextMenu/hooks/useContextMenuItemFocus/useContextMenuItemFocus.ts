import { useLayoutEffect, useState } from 'react';

import { useLevelContext } from '../../providers/LevelProvider';

import { useMouseMoveOutside } from '..';

import { UseContextMenuItemFocusOptions } from './useContextMenuItemFocus.types';

/**
 * Hook for managing focus and highlight state of context menu items.
 *
 * Radix menus rely heavily on native focus for item highlighting.
 * However, when using focus blockers (for inner input support), the native
 * focus system breaks. This hook provides a custom focus/highlight management
 * that works independently of native focus.
 *
 * Key features:
 * - Tracks `isFocused` state via mouse enter/leave and focus/blur events
 * - Provides `dataHighlighted` attribute for styling highlighted items
 * - Syncs with `LevelContext` to track active item at menu level
 * - Resets highlight when mouse moves outside the item
 * - Supports non-selectable items
 * - Handles submenu navigation (ArrowLeft to close submenu)
 * - Returns undefined handlers for disabled items
 */
export const useContextMenuItemFocus = <T extends HTMLElement>(
  options: UseContextMenuItemFocusOptions<T>
) => {
  const {
    displayName,
    id,
    ref,
    isDisabled,
    hasSubmenu,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onPointerEnter,
    onPointerLeave,
    onPointerMove,
    isSelectable = true,
    subMenuTriggerId,
  } = options;

  const [isFocused, setIsFocused] = useState(false);

  const { setActiveItemId, activeItemId, isMovingTowardMenuRef } =
    useLevelContext(displayName);

  useMouseMoveOutside(ref, () => {
    setIsFocused(false);
  });

  useLayoutEffect(() => {
    if (hasSubmenu) {
      if (
        activeItemId === null ||
        (activeItemId !== subMenuTriggerId && id !== activeItemId)
      ) {
        setIsFocused(false);
      }
    } else if (id !== activeItemId) {
      setIsFocused(false);
    }
  }, [activeItemId, subMenuTriggerId, hasSubmenu, id]);

  return {
    dataHighlighted: isFocused && isSelectable && !isDisabled ? '' : undefined,

    onFocus: (e: React.FocusEvent<T>) => {
      if (
        isSelectable &&
        !isDisabled &&
        !isMovingTowardMenuRef.current &&
        activeItemId !== id
      ) {
        setActiveItemId(id);
        setIsFocused(!isDisabled);
      }

      onFocus?.(e);
    },

    onMouseEnter: (e: React.MouseEvent<T>) => {
      if (
        isSelectable &&
        !isDisabled &&
        !isMovingTowardMenuRef.current &&
        activeItemId !== id
      ) {
        setActiveItemId(id);
        setIsFocused(!isDisabled);
      }

      onMouseEnter?.(e);
    },

    onBlur: (e: React.FocusEvent<T>) => {
      if (
        isSelectable &&
        !isDisabled &&
        !isMovingTowardMenuRef.current &&
        activeItemId !== id
      ) {
        setIsFocused(false);
      }

      onBlur?.(e);
    },

    onMouseLeave: (e: React.MouseEvent<T>) => {
      if (
        isSelectable &&
        !isDisabled &&
        !isMovingTowardMenuRef.current &&
        activeItemId !== id
      ) {
        setIsFocused(false);
      }

      onMouseLeave?.(e);
    },

    /**
     * This is necessary to disable the standard focus behavior
     * when hovering over an item and similar elements in Radix.
     */
    onPointerEnter: (e: React.PointerEvent<T>) => {
      e.preventDefault();

      onPointerEnter?.(e);
    },

    /**
     * This is necessary to disable the standard focus behavior
     * when hovering over an item and similar elements in Radix.
     */
    onPointerLeave: (e: React.PointerEvent<T>) => {
      e.preventDefault();

      onPointerLeave?.(e);
    },

    /**
     * This is necessary to disable the standard focus behavior
     * when hovering over an item and similar elements in Radix.
     */
    onPointerMove: (e: React.PointerEvent<T>) => {
      e.preventDefault();

      if (
        isSelectable &&
        !isDisabled &&
        !isMovingTowardMenuRef.current &&
        activeItemId !== id
      ) {
        setActiveItemId(id);
        setIsFocused(!isDisabled);
      }

      onPointerMove?.(e);
    },
  };
};
