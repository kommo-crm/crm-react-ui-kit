import { useLayoutEffect, useState } from 'react';

import { useContextMenuRootContext } from '../../ContextMenu.context';
import { useInnerInputsFocus, useChildrenWithBlocker } from '..';

import { UseItemInnerFocusOptions } from './useItemInnerFocus.types';

export function useItemInnerFocus({
  id,
  children,
  isSelectableProp,
  displayName,
  blockerClassName,
}: UseItemInnerFocusOptions) {
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
}
