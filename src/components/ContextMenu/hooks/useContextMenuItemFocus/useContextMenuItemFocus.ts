import { useState } from 'react';

import { useLevelContext } from '../../providers/LevelProvider';

import { UseContextMenuItemFocusOptions } from './useContextMenuItemFocus.types';

export const useContextMenuItemFocus = ({
  displayName,
  id,
  isDisabled,
  hasSubmenu,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onKeyDown,
}: UseContextMenuItemFocusOptions) => {
  const [isFocused, setIsFocused] = useState(false);
  const { setActiveItemId } = useLevelContext(displayName);

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

  return {
    dataHighlighted: isFocused ? '' : undefined,

    onFocus: (e: React.FocusEvent<HTMLDivElement>) => {
      if (!hasSubmenu) {
        setActiveItemId(id);
      }

      setIsFocused(!isDisabled);
      onFocus?.(e);
    },

    onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasSubmenu) {
        setActiveItemId(id);
      }

      setIsFocused(!isDisabled);
      onMouseEnter?.(e);
    },

    onBlur: (e: React.FocusEvent<HTMLDivElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    },

    onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
      setIsFocused(false);
      onMouseLeave?.(e);
    },

    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (hasSubmenu && e.key === 'ArrowLeft') {
        setIsFocused(false);
      }

      onKeyDown?.(e);
    },
  };
};
