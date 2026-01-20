import { useLayoutEffect, useState } from 'react';

import { useInnerFocusTracker } from '../useInnerFocusTracker/useInnerFocusTracker';

import { useLevelContext } from '../../providers';

import {
  UseItemInnerFocusOptions,
  UseItemInnerFocusResult,
} from './useItemInnerFocus.types';

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
export const useItemInnerFocus = (
  options: UseItemInnerFocusOptions
): UseItemInnerFocusResult => {
  const { id, isSelectable: isItemSelectable, displayName } = options;

  const { itemWithFocusedInput, setItemWithFocusedInput } =
    useLevelContext(displayName);

  const { hasInnerInput, isInnerInputFocused, handleNodeRef } =
    useInnerFocusTracker();

  const [isSelectable, setIsSelectable] = useState(isItemSelectable ?? true);

  useLayoutEffect(() => {
    if (isItemSelectable !== undefined) {
      setIsSelectable(isItemSelectable ?? true);

      return;
    }

    setIsSelectable(!hasInnerInput);
  }, [hasInnerInput, isItemSelectable]);

  useLayoutEffect(() => {
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
  }, [isInnerInputFocused, itemWithFocusedInput, setItemWithFocusedInput, id]);

  return {
    isSelectableConsideringInputFocus: isSelectable,
    setIsSelectable,
    handleNodeRef,
  };
};
