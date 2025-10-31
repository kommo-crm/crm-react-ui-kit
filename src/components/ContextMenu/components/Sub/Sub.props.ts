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
  /**
   * Whether the submenu should close when the root menu is closed.
   */
  shouldCloseRootMenuOnClick?: boolean;
  /**
   * Whether the menu should close when clicked.
   */
  isCloseOnClick?: boolean;
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
  isOpen: boolean;
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
   * The ref to the content of the submenu.
   */
  contentRef: React.RefObject<HTMLDivElement>;
  /**
   * The ref to the trigger of the submenu.
   */
  triggerRef: React.RefObject<HTMLDivElement>;
  /**
   * The callback function to be called when the child menu is opened.
   */
  onChildOpen: (value: boolean, mode: ContextMenuModeType) => void;
  /**
   * The callback function to be called when the subroot is opened.
   */
  onSubRootOpen: (value: boolean) => void;
  /**
   * Whether the submenu should close when the root menu is closed.
   *
   * @default true
   */
  shouldCloseRootMenuOnClick: boolean;
  /**
   * Whether the menu should close when clicked.
   *
   * @default true
   */
  isCloseOnClick: boolean;
  /**
   * Immediately closes the menu without waiting for any hover or animation delays.
   */
  closeMenuImmediately: () => void;
}
