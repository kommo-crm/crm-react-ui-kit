import { ContextMenuModeType } from '../../ContextMenu.types';

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
   * The duration of the animation.
   */
  animationDuration: number;
  /**
   * Whether the context menu is a submenu.
   */
  isSubmenu?: boolean;
  /**
   * Whether the submenu is open.
   */
  subMenuOpen?: boolean;
  /**
   * The callback function to be called when the submenu is opened.
   */
  setSubMenuOpen?: (open: boolean) => void;
  /**
   * The callback function to be called when the context submenu is closed.
   */
  closeRootMenuImmediately?: (forceCloseRootMenu?: boolean) => void;
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
   * Whether the context menu should close when another menu is opened.
   */
  autoCloseOnOtherOpen?: boolean;
  /**
   * Whether the context menu should close when the root menu is closed.
   */
  isCloseWithRootMenu?: boolean;
}
