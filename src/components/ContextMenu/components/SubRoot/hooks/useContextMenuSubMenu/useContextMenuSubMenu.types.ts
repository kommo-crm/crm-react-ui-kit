import { Dispatch, RefObject, SetStateAction } from 'react';

import { ContextMenuModeType } from '../../../../ContextMenu.types';

export interface UseContextMenuSubMenuOptions {
  /**
   * The name of the display.
   */
  displayName: string;
  /**
   * The mode of the context menu.
   */
  mode: ContextMenuModeType;
  /**
   * The open state of the dropdown menu when it is initially rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: boolean;
  /**
   * The callback function to be called when the context menu is opened.
   */
  onOpen?: (open: boolean) => void;
  /**
   * The callback function to be called when the context menu is animated open.
   */
  onAnimatedOpen?: (open: boolean) => void;
}

export interface UseContextMenuSubMenuResult {
  /**
   * The mode of the context menu.
   */
  mode: ContextMenuModeType;
  /**
   * Whether the submenu is open.
   */
  isOpen: boolean;
  /**
   * The callback function to be called when the context menu is opened.
   */
  onOpenChange: (value: boolean) => void;
  /**
   * The callback function to be called when the context menu is opened by keyboard.
   */
  onOpenByKeyboard: (value: boolean) => void;
  /**
   * The ref to the trigger of the context menu.
   */
  triggerRef: RefObject<HTMLButtonElement>;
  /**
   * The ref to the content of the context menu.
   */
  contentRef: RefObject<HTMLDivElement>;
  /**
   * Whether the context menu is animated open.
   */
  isAnimatedOpen: boolean;
  /**
   * The duration of the context menu and submenus opening/closing
   * animation in milliseconds.
   */
  animationDuration: number;
  /**
   * The delay in milliseconds before the context menu closes when
   * the user stops hovering over it.
   */
  hoverCloseDelay: number;
  /**
   * Immediately closes the context menu without waiting
   * for any hover or animation delays.
   */
  closeMenuImmediately: () => void;
  /**
   * The callback function to be called when the context menu content is entered.
   */
  onContentEnter: () => void;
  /**
   * The callback function to be called when the context menu content is left.
   */
  onContentLeave: () => void;
  /**
   * The id of the trigger of the context menu.
   */
  triggerId: string;
  /**
   * The callback function to be called when the context menu is opened by child click.
   */
  onChildOpen: (value: boolean, childModeValue: ContextMenuModeType) => void;
  /**
   * Whether the item with the focused input is open.
   */
  itemWithFocusedInput: string | null;
  /**
   * Sets the item with the focused input.
   */
  setItemWithFocusedInput: Dispatch<SetStateAction<string | null>>;
  /**
   * Sets the open state of the submenu.
   */
  setIsSubMenuOpen: (open: boolean) => void;
}
