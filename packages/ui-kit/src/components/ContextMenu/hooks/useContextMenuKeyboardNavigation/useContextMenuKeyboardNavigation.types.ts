import { RefObject } from 'react';

export interface UseContextMenuKeyboardNavigationOptions {
  /**
   * Whether the menu is open.
   */
  isOpen: boolean;
  /**
   * Whether the menu is animated open (for hover mode).
   */
  isAnimatedOpen: boolean;
}

export interface UseContextMenuKeyboardNavigationResult {
  /**
   * The ref to the content of the context menu.
   */
  navigationContentRef: RefObject<HTMLDivElement>;
}
