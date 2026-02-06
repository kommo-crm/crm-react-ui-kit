import { Dispatch, RefObject, SetStateAction } from 'react';

import type { FocusChangeEvent } from 'src/hooks';

import { ContextMenuMode } from '../../ContextMenu.enums';
import { ContextMenuModeType } from '../../ContextMenu.types';

export interface UseContextMenuOptions {
  /**
   * The mode of the context menu.
   */
  mode: ContextMenuMode;
  /**
   * The open state of the dropdown menu when it is initially rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: boolean;
  /**
   * The duration of the animation.
   */
  animationDuration: number;
  /**
   * The delay of the hover close.
   */
  hoverCloseDelay: number;
  /**
   * The callback function to be called when the context menu is opened.
   */
  onOpen?: (open: boolean) => void;
  /**
   * The callback function to be called when the context menu is animated open.
   */
  onAnimatedOpen?: (open: boolean) => void;
  /**
   * Whether the context menu is open forcefully.
   */
  isOpen?: boolean;
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
   * Called when focus moves outside the menu.
   * Call preventDefault() to prevent menu closure.
   */
  onFocusOutside?: (event: FocusChangeEvent) => void;
  /**
   * Tolerance in pixels for detecting cursor movement toward the menu.
   * Higher values make the detection more lenient.
   */
  isAimingTolerance: number;
  /**
   * Timeout in milliseconds before considering cursor movement as idle.
   * Used to reset aiming state when cursor stops moving.
   */
  isAimingIdleTimeout: number;
}

export interface UseContextMenuResult {
  /**
   * Whether the context menu is open.
   */
  isOpen: boolean;
  /**
   * The mode of the context menu.
   */
  mode: ContextMenuMode;
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
   * The duration of the animation.
   */
  animationDuration: number;
  /**
   * The delay of the hover close.
   */
  hoverCloseDelay: number;
  /**
   * Closes the menu immediately.
   */
  closeMenuImmediately: (preventFocusRestore?: boolean) => void;
  /**
   * The callback function to be called when the context menu content is entered.
   */
  onContentEnter: () => void;
  /**
   * The callback function to be called when the context menu content is left.
   */
  onContentLeave: () => void;
  /**
   * The callback function to be called when the child menu is opened.
   */
  onChildOpen: (value: boolean, childModeValue: ContextMenuModeType) => void;
  /**
   * The callback function to be called when the submenu is opened.
   */
  onSubmenuOpen: (value: boolean) => void;
  /**
   * Whether the root content is blocked.
   */
  isRootContentBlocked: boolean;
  /**
   * Whether the child menu is open.
   */
  isChildOpen: boolean;
  /**
   * Whether the item with the focused input is open.
   */
  itemWithFocusedInput: string | null;
  /**
   * Sets the item with the focused input.
   */
  setItemWithFocusedInput: Dispatch<SetStateAction<string | null>>;
  /**
   * Whether the focus should be restored.
   */
  shouldPreventFocusRestore: () => boolean;
  /**
   * Sets the callback for when focus moves outside the menu.
   */
  setOnFocusOutside: (
    callback: ((event: FocusChangeEvent) => void) | undefined
  ) => void;
}
