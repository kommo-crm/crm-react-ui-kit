import { ComponentPropsWithoutRef } from 'react';
import { SubContent as RadixDropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';

export type SubContentProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenuSubContent
> & {
  /**
   * Whether to disable auto positioning.
   *
   * @default false
   */
  disableAutoPositioning?: boolean;
  /**
   * Whether to disable repositioning.
   *
   * @default false
   */
  disableRepositioning?: boolean;
};
