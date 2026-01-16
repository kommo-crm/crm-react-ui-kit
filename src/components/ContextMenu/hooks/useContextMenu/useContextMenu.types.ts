import type { FocusChangeEvent } from 'src/hooks';

import { ContextMenuMode } from '../..';

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
}
