import { ComponentPropsWithoutRef } from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

export type SubProps = ComponentPropsWithoutRef<typeof RadixDropdownMenuSub>;

export interface ContextMenuSubContextProps {
  /**
   * Indicates whether the submenu's open animation is currently active.
   */
  animatedOpen: boolean;
  /**
   * Triggers the submenu's open animation after it has been mounted.
   */
  startAnimation: () => void;
}
