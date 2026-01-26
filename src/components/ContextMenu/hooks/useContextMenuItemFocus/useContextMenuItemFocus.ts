import { useLayoutEffect, useState } from 'react';

import { useOnOutsideMouseMove } from '@kommo-crm/react-hooks';

import { useLevelContext } from '../../providers/LevelProvider';

import {
  UseContextMenuItemFocusOptions,
  UseContextMenuItemFocusResult,
} from './useContextMenuItemFocus.types';

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
): UseContextMenuItemFocusResult<T> => {
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

  const { setActiveItemId, activeItemId, isAiming, isChildAiming } =
    useLevelContext(displayName);

  useOnOutsideMouseMove({
    ref,
    handler: () => {
      setIsFocused(false);
    },
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
      const isAimingActive = isAiming?.() || isChildAiming?.();

      if (isSelectable && !isDisabled && !isAimingActive) {
        setActiveItemId(id);
        setIsFocused(!isDisabled);
      }

      onFocus?.(e);
    },

    onMouseEnter: (e: React.MouseEvent<T>) => {
      const isAimingActive = isAiming?.() || isChildAiming?.();

      if (isSelectable && !isDisabled && !isAimingActive) {
        setActiveItemId(id);
        setIsFocused(!isDisabled);
      }

      if (!isAimingActive) {
        onMouseEnter?.(e);
      }
    },

    onBlur: (e: React.FocusEvent<T>) => {
      const isAimingActive = isAiming?.() || isChildAiming?.();

      if (isSelectable && !isDisabled && !isAimingActive) {
        setIsFocused(false);
      }

      onBlur?.(e);
    },

    onMouseLeave: (e: React.MouseEvent<T>) => {
      const isAimingActive = isAiming?.() || isChildAiming?.();

      if (isSelectable && !isDisabled && !isAimingActive) {
        setIsFocused(false);
      }

      if (!isAimingActive) {
        onMouseLeave?.(e);
      }
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

      const isAimingActive = isAiming?.() || isChildAiming?.();

      if (isSelectable && !isDisabled && !isAimingActive) {
        setActiveItemId(id);
        setIsFocused(!isDisabled);
      }

      if (!isAimingActive) {
        onPointerMove?.(e);
      }
    },
  };
};
