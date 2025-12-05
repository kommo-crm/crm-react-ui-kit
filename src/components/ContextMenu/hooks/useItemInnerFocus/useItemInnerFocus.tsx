import { useLayoutEffect, useState } from 'react';

import { useContextMenuRootContext } from '../../ContextMenu.context';

import { useChildrenWithBlocker } from '..';

import { useInnerInputsFocus } from './hooks';

import { UseItemInnerFocusOptions } from './useItemInnerFocus.types';

/**
 * Hook for managing focus behavior when context menu items contain
 * inner focusable elements (e.g., inputs, textareas).
 *
 * This hook solves the problem of focus conflicts in Radix-based menus:
 * when a user focuses an input inside a menu item, the menu should not
 * close and other items should not steal focus.
 *
 * Key features:
 * - Tracks whether the item contains inner inputs and if they are focused
 * - Automatically sets `isSelectable` to false for items with inner inputs
 *   (prevents item selection on click, allowing input interaction instead)
 * - Registers the focused item globally so other items can show a blocker
 * - Renders a focus blocker over other items when one item has a focused input
 */
export const useItemInnerFocus = (options: UseItemInnerFocusOptions) => {
  const { id, children, isSelectableProp, displayName, blockerClassName } =
    options;

  const {
    itemWithFocusedInput,
    setItemWithFocusedInput,
    enableInnerInputFocus,
  } = useContextMenuRootContext(displayName);

  const { hasInnerInput, isInnerInputFocused, handleNodeRef } =
    useInnerInputsFocus({ isEnabled: enableInnerInputFocus });

  const [isSelectable, setIsSelectable] = useState(isSelectableProp ?? true);

  useLayoutEffect(() => {
    if (isSelectableProp !== undefined || !enableInnerInputFocus) {
      setIsSelectable(isSelectableProp ?? true);

      return;
    }

    setIsSelectable(!hasInnerInput);
  }, [hasInnerInput, isSelectableProp, enableInnerInputFocus]);

  useLayoutEffect(() => {
    if (!enableInnerInputFocus) {
      return;
    }

    if (isInnerInputFocused) {
      setItemWithFocusedInput(id);
    } else if (itemWithFocusedInput === id) {
      setItemWithFocusedInput(null);
    }

    return () => {
      if (itemWithFocusedInput === id) {
        setItemWithFocusedInput(null);
      }
    };
  }, [
    isInnerInputFocused,
    itemWithFocusedInput,
    setItemWithFocusedInput,
    id,
    enableInnerInputFocus,
  ]);

  const childrenWithBlocker = useChildrenWithBlocker({
    displayName,
    children,
    shouldShowBlocker:
      itemWithFocusedInput !== null && itemWithFocusedInput !== id,
    blockerClassName,
  });

  return {
    isSelectable,
    setIsSelectable,
    handleNodeRef,
    childrenWithBlocker,
  };
};
