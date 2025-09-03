import { useState } from 'react';

import { useLevelContext } from '../../providers/LevelProvider';

import { UseContextMenuItemFocusOptions } from './useContextMenuItemFocus.types';

export const useContextMenuItemFocus = ({
  displayName,
  id,
  isDisabled,
  isNotSelectable,
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
    };
  }

  return {
    dataHighlighted: isFocused ? '' : undefined,
    onFocus: () => {
      setActiveItemId(id);
      setIsFocused(!isDisabled);
    },
    onMouseEnter: () => {
      setActiveItemId(id);
      setIsFocused(!isDisabled);
      onMouseEnter?.();
    },
    onBlur: () => {
      setIsFocused(false);
    },
    onMouseLeave: () => {
      setIsFocused(false);
      onMouseLeave?.();
    },
  };
};
