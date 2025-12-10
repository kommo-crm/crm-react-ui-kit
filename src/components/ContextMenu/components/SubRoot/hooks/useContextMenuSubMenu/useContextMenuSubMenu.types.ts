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
