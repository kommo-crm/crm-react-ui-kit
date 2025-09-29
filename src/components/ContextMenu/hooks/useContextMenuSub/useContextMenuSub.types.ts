import { ContextMenuModeType } from '../../ContextMenu.types';

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
  onOpen?: (open: boolean) => void;
  /**
   * Whether the submenu should close when the root menu is closed.
   */
  isCloseWithRootMenu: boolean;
}
