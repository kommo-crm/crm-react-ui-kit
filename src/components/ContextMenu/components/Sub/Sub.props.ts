import { ComponentPropsWithoutRef } from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { ContextMenuMode } from '../../ContextMenu.enums';

export type SubProps = ComponentPropsWithoutRef<typeof RadixDropdownMenuSub> & {
  /**
   * Defines how the submenu is triggered.
   *
   * @default ContextMenuMode.HOVER
   */
  mode?: ContextMenuMode;
};

export interface ContextMenuSubContextProps {
  /**
   * Indicates whether the submenu's open animation is currently active.
   */
  animatedOpen: boolean;
  /**
   * Indicates whether the submenu is currently open.
   */
  open: boolean;
  /**
   * Triggers the submenu's open animation after it has been mounted.
   */
  startAnimation: () => void;
  /**
   * Defines how the submenu is triggered.
   */
  mode: ContextMenuMode;
}
