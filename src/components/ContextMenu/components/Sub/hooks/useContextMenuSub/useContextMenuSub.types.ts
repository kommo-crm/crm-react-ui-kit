import { RefObject } from 'react';
import { Dispatch, SetStateAction } from 'react';

import { ContextMenuModeType } from '../../../../ContextMenu.types';
import { PointerDownOutsideEvent } from '../../../SubContent/SubContent.types';

export interface UseContextMenuSubOptions {
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
   */
  defaultOpen?: boolean;
  /**
   * Called when submenu open state changes.
   */
  onOpen?: (isOpen: boolean) => void;
  /**
   * Called whenever the value of `isAimingRef` changes
   * in the context menu bus.
   *
   * This ref tracks whether the cursor is currently moving toward the active menu,
   * which is used to prevent menu closure when navigating between menus in hover mode.
   * The callback is triggered whenever this tracking state changes.
   */
  onAiming?: (isAiming: boolean) => void;
}

export interface UseContextMenuSubResult {
  /**
   * Whether the submenu is open.
   */
  isOpen: boolean;
  /**
   * Sets the open state of the submenu.
   */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /**
   * Whether the submenu is animated open.
   */
  isAnimatedOpen: boolean;
  /**
   * Handles the content enter event.
   */
  handleContentEnter: () => void;
  /**
   * Handles the content leave event.
   */
  handleContentLeave: () => void;
  /**
   * Handles the open change event.
   */
  handleOpenChange: (value: boolean) => void;
  /**
   * Handles the pointer down outside event.
   */
  handlePointerDownOutside: (e: PointerDownOutsideEvent) => void;
  /**
   * The callback function to be called when the submenu is opened by keyboard.
   */
  onOpenByKeyboard: (isOpenByKeyboard: boolean) => void;
  /**
   * The id of the trigger of the submenu.
   */
  triggerId: string;
  /**
   * The ref to the content of the submenu.
   */
  contentRef: RefObject<HTMLDivElement>;
  /**
   * The ref to the trigger of the submenu.
   */
  triggerRef: RefObject<HTMLDivElement>;
  /**
   * The callback function to be called when the child menu is opened.
   */
  onChildOpen: (value: boolean, childModeValue: ContextMenuModeType) => void;
  /**
   * The callback function to be called when the subroot is opened.
   */
  onSubRootOpen: (isSubRootOpen: boolean) => void;
  /**
   * Immediately closes the menu without waiting for any hover or animation delays.
   */
  closeMenuImmediately: () => void;
  /**
   * Whether the item with the focused input is open.
   */
  itemWithFocusedInput: string | null;
  /**
   * Sets the item with the focused input.
   */
  setItemWithFocusedInput: (itemWithFocusedInput: string | null) => void;
  /**
   * Ref containing whether the cursor is currently moving toward the submenu.
   */
  isAimingContentRef: RefObject<boolean | null>;
}
