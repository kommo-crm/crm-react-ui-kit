import { useState } from 'react';

import { useLevelContext } from '../../providers/LevelProvider';

import { UseContextMenuItemFocusOptions } from './useContextMenuItemFocus.types';

export const useContextMenuItemFocus = ({
  displayName,
  id,
  isDisabled,
  isNotSelectable,
  hasSubmenu,
  onMouseEnter,
  onMouseLeave,
}: UseContextMenuItemFocusOptions) => {
  const [isFocused, setIsFocused] = useState(false);
  const { setActiveItemId } = useLevelContext(displayName);

  if (isNotSelectable || isDisabled) {
    return {
      dataHighlighted: undefined,
      onFocus: undefined,
      onMouseEnter: undefined,
      onBlur: undefined,
      onMouseLeave: undefined,
      onKeyDown: undefined,
    };
  }

  return {
    dataHighlighted: isFocused ? '' : undefined,
    onFocus: () => {
      if (!hasSubmenu) {
        setActiveItemId(id);
      }

      setIsFocused(!isDisabled);
    },
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      if (!hasSubmenu) {
        setActiveItemId(id);
      }

      setIsFocused(!isDisabled);
      onMouseEnter?.(e);
    },
    onBlur: () => {
      setIsFocused(false);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      setIsFocused(false);
      onMouseLeave?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (hasSubmenu && e.key === 'ArrowLeft') {
        setIsFocused(false);
      }
    },
  };
};
