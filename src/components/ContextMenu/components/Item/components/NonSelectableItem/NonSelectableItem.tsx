import React, { cloneElement, forwardRef, isValidElement } from 'react';

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
