import React, { cloneElement, forwardRef, isValidElement } from 'react';

import { NonSelectableItemProps } from './NonSelectableItem.props';

const DISPLAY_NAME = 'ContextMenu.NonSelectableItem';

/**
 * It is necessary because otherwise Radix retains focus control,
 * which we absolutely do not need for non-selectable items.
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

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children as React.ReactElement<unknown>,
      {
        ...rest,
        ref,
      } as any
    );
  }

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});

NonSelectableItem.displayName = DISPLAY_NAME;
