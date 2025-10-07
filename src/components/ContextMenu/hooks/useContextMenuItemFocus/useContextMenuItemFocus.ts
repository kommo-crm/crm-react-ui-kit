import { useEffect, useState } from 'react';

import { useLevelContext } from '../../providers/LevelProvider';

import { useMouseMoveOutside } from '../useMouseMoveOutside/useMouseMoveOutside';

import { UseContextMenuItemFocusOptions } from './useContextMenuItemFocus.types';

export const useContextMenuItemFocus = <T extends HTMLElement>({
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
}: UseContextMenuItemFocusOptions<T>) => {
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
    dataHighlighted: isFocused ? '' : undefined,

    onFocus: (e: React.FocusEvent<T>) => {
      if (!hasSubmenu) {
        setActiveItemId(id);
      }

      setIsFocused(!isDisabled);
      onFocus?.(e);
    },

    onMouseEnter: (e: React.MouseEvent<T>) => {
      if (!hasSubmenu) {
        setActiveItemId(id);
      }

      setIsFocused(!isDisabled);
      onMouseEnter?.(e);
    },

    onBlur: (e: React.FocusEvent<T>) => {
      setIsFocused(false);
      onBlur?.(e);
    },

    onMouseLeave: (e: React.MouseEvent<T>) => {
      setIsFocused(false);
      onMouseLeave?.(e);
    },

    onKeyDown: (e: React.KeyboardEvent<T>) => {
      if (hasSubmenu && e.key === 'ArrowLeft') {
        setIsFocused(false);
      }

      onKeyDown?.(e);
    },
  };
};
