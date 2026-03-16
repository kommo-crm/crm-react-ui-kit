import React, { cloneElement, forwardRef, isValidElement } from 'react';

import { NonSelectableItemProps } from './NonSelectableItem.props';

const DISPLAY_NAME = 'ContextMenu.NonSelectableItem';

/**
 * Props that can be passed to a child element when using asChild pattern.
 */
type SlotProps = React.HTMLAttributes<HTMLElement> & {
  ref?: React.Ref<HTMLElement>;
};

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

  /**
   * When asChild is true, we clone the child element and pass props to it
   * instead of wrapping it in a div. This allows the child to receive
   * all the props and ref directly.
   */
  if (asChild && isValidElement<SlotProps>(children)) {
    return cloneElement(children, {
      ...rest,
      ref,
    });
  }

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});

NonSelectableItem.displayName = DISPLAY_NAME;
