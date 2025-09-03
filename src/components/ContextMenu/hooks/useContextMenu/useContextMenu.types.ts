import { ContextMenuMode } from '../..';

export interface UseContextMenuOptions {
  /**
   * The mode of the context menu.
   */
  mode: ContextMenuMode;
  /**
   * Whether the context menu is initially open.
   */
  initialOpen?: boolean;
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
   * Whether the context menu should close when another menu is opened.
   */
  autoCloseOnOtherOpen?: boolean;
}
