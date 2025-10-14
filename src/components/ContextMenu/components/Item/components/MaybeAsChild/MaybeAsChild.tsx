import React, { cloneElement, forwardRef, isValidElement } from 'react';

import { MaybeAsChildProps } from './MaybeAsChild.props';

const DISPLAY_NAME = 'ContextMenu.MaybeAsChild';

export const MaybeAsChild = forwardRef<HTMLDivElement, MaybeAsChildProps>(
  ({ asChild, children, ...rest }, ref) => {
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
  }
);

MaybeAsChild.displayName = DISPLAY_NAME;
