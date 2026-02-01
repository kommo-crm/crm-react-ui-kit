import { ComponentPropsWithoutRef } from 'react';
import { Arrow as RadixDropdownMenuArrow } from '@radix-ui/react-dropdown-menu';

export type ArrowProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenuArrow
> & {
  /**
   * Custom class on Border Arrow.
   */
  borderClassName?: string;
};
