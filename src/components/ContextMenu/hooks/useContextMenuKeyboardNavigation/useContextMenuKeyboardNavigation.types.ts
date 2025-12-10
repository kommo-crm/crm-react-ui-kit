import { RefObject } from 'react';

import { ContextMenuMode } from '../../ContextMenu.enums';

export interface UseContextMenuKeyboardNavigationOptions {
  /**
   * Whether the menu is open.
   */
  isOpen: boolean;
  /**
   * Whether the menu is animated open (for hover mode).
   */
  isAnimatedOpen: boolean;
  /**
   * Ref to the root content element.
   */
  contentRef: RefObject<HTMLElement>;
  /**
   * The mode of the context menu.
   */
  mode: ContextMenuMode;
}
