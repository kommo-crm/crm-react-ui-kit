import { ComponentPropsWithoutRef } from 'react';
import { Sub as RadixDropdownMenuSub } from '@radix-ui/react-dropdown-menu';

import { ContextMenuModeType } from '../../ContextMenu.types';
import { PointerDownOutsideEvent } from '../SubContent/SubContent.types';

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
  onOpen?: (isOpen: boolean) => void;
  /**
   * Whether the root menu should close when item selected.
   *
   * @default true
   */
  shouldCloseRootMenuOnSelect?: boolean;
  /**
   * Whether the submenu should close when item selected.
   *
   * @default true
   */
  shouldCloseCurrentMenuOnSelect?: boolean;
  /**
   * Called whenever the value of `isAimingRef` changes
   * in the context menu bus.
   *
   * This ref tracks whether the cursor is currently moving toward the active menu,
   * which is used to prevent menu closure when navigating between menus in hover mode.
   * The callback is triggered whenever this tracking state changes.
   */
  onAiming?: (isAiming: boolean) => void;
  /**
   * Tolerance in pixels for detecting cursor movement toward the submenu.
   * Higher values make the detection more lenient.
   *
   * @default 0
   */
  aimingTolerance?: number;
  /**
   * Timeout in milliseconds before considering cursor movement as idle.
   * Used to reset aiming state when cursor stops moving.
   *
   * @default 200
   */
  aimingIdleTimeout?: number;
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
  isAnimatedOpen: boolean;
  /**
   * Sets the open state of the submenu.
   */
  setIsOpen: (isOpen: boolean) => void;
  /**
   * Indicates whether the submenu is currently open.
   */
  isOpen: boolean;
  /**
   * Called when mouse enters the submenu content area.
   * Keeps the menu open in hover mode by canceling close timers.
   */
  onContentEnter: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Called when mouse leaves the submenu content area.
   * Allows the menu to close in hover mode.
   */
  onContentLeave: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * The id of the trigger of the submenu.
   */
  triggerId: string;
  /**
   * The callback function to be called when the submenu is opened by keyboard.
   */
  onOpenByKeyboard: (isOpen: boolean) => void;
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
  onChildOpen: (isChildOpen: boolean, mode: ContextMenuModeType) => void;
  /**
   * The callback function to be called when the subroot is opened.
   */
  onSubRootOpen: (isSubRootOpen: boolean) => void;
  /**
   * Whether the root menu should close when item selected.
   *
   * @default true
   */
  shouldCloseRootMenuOnSelect: boolean;
  /**
   * Whether the submenu should close when item selected.
   *
   * @default true
   */
  shouldCloseCurrentMenuOnSelect: boolean;
  /**
   * Immediately closes the menu without waiting for any hover or animation delays.
   */
  closeMenuImmediately: () => void;
  /**
   * Sets whether the item with the focused input is open.
   */
  setItemWithFocusedInput: (itemWithFocusedInput: string | null) => void;
  /**
   * Whether the item with the focused input is open.
   */
  itemWithFocusedInput: string | null;
  /**
   * Returns whether the cursor is currently moving toward the submenu.
   */
  isAiming: () => boolean;
  /**
   * The callback function to be called when the pointer down outside event occurs.
   */
  onPointerDownOutside: (e: PointerDownOutsideEvent) => void;
}
