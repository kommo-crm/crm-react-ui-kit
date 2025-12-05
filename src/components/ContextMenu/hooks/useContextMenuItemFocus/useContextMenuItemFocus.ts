import { useEffect, useState } from 'react';

import { KeyboardKey } from 'src/lib/keyboard';

import { useLevelContext } from '../../providers/LevelProvider';

import { useMouseMoveOutside } from './hooks';

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
    onKeyDown,
    isSelectable = true,
  } = options;

  const [isFocused, setIsFocused] = useState(false);
  const { setActiveItemId, activeItemId } = useLevelContext(displayName);

  useMouseMoveOutside(ref, () => {
    setIsFocused(false);
  });

  if (isDisabled) {
    return {
      dataHighlighted: undefined,
      onFocus: undefined,
      onMouseEnter: undefined,
      onBlur: undefined,
      onMouseLeave: undefined,
      onKeyDown: undefined,
    };
  }

  useEffect(() => {
    if (hasSubmenu && activeItemId === null) {
      setIsFocused(false);
    }
  }, [activeItemId]);

  return {
    dataHighlighted: isFocused && isSelectable ? '' : undefined,

    onFocus: (e: React.FocusEvent<T>) => {
      if (!isSelectable) {
        onFocus?.(e);

        return;
      }

      if (!hasSubmenu) {
        setActiveItemId(id);
      }

      setIsFocused(!isDisabled);
      onFocus?.(e);
    },

    onMouseEnter: (e: React.MouseEvent<T>) => {
      if (!isSelectable) {
        onMouseEnter?.(e);

        return;
      }

      if (!hasSubmenu) {
        setActiveItemId(id);
      }

      setIsFocused(!isDisabled);
      onMouseEnter?.(e);
    },

    onBlur: (e: React.FocusEvent<T>) => {
      if (!isSelectable) {
        onBlur?.(e);

        return;
      }

      setIsFocused(false);
      onBlur?.(e);
    },

    onMouseLeave: (e: React.MouseEvent<T>) => {
      if (!isSelectable) {
        onMouseLeave?.(e);

        return;
      }

      setIsFocused(false);
      onMouseLeave?.(e);
    },

    onKeyDown: (e: React.KeyboardEvent<T>) => {
      if (!isSelectable) {
        onKeyDown?.(e);

        return;
      }

      if (hasSubmenu && e.key === KeyboardKey.ARROW_LEFT) {
        setIsFocused(false);
      }

      onKeyDown?.(e);
    },
  };
};
