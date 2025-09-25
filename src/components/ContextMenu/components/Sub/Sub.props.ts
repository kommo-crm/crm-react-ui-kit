import { ComponentPropsWithoutRef } from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { ContextMenuModeType } from '../../ContextMenu.types';

export type SubProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuSub>,
  'onOpenChange'
> & {
  /**
   * Defines how the submenu is triggered.
   *
   * @default "hover"
   */
  mode?: ContextMenuModeType;
  /**
   * Called when submenu open state changes.
   */
  onOpen?: (open: boolean) => void;
};

export interface ContextMenuSubContextProps {
  /**
   * Defines how the submenu is triggered.
   */
  mode: ContextMenuModeType;
  /**
   * Indicates whether the submenu is initially open.
   */
  defaultOpen?: boolean;
  /**
   * Indicates whether the submenu's open animation is currently active.
   */
  animatedOpen: boolean;
  /**
   * Sets the open state of the submenu.
   */
  setOpen: (open: boolean) => void;
  /**
   * Indicates whether the submenu is currently open.
   */
  open: boolean;
  /**
   * Triggers the submenu's open animation after it has been mounted.
   */
  startAnimation: () => void;
  /**
   * Called when the mouse enters the Sub element.
   */
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Called when the mouse leaves the Sub element.
   */
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * The id of the trigger of the submenu.
   */
  triggerId: string;
  /**
   * The callback function to be called when the submenu is opened by keyboard.
   */
  onOpenByKeyboard: (value: boolean) => void;
  /**
   * Reference to the DOM element that acts as the submenu trigger.
   */
  triggerRef: React.RefObject<HTMLDivElement>;
  /**
   * Reference to the DOM element containing the submenu content.
   */
  contentRef: React.RefObject<HTMLDivElement>;
}
