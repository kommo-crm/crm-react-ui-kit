import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { NonSelectableItemProps } from './NonSelectableItem.props';

const DISPLAY_NAME = 'ContextMenu.NonSelectableItem';

/**
 * This is necessary because radix completely removes the ability to select text
 * for copying from the item, and we do not need this behavior.
 */
export const NonSelectableItem = forwardRef<
  HTMLDivElement,
  NonSelectableItemProps
>((props, ref) => {
  const {
    asChild,
    children,

    ...rest
  } = props;

  const Component = asChild ? Slot : 'div';

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});

NonSelectableItem.displayName = DISPLAY_NAME;
