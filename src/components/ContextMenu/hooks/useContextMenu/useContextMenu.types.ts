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
   * Whether the context menu should close when another menu is opened.
   */
  autoCloseOnOtherOpen?: boolean;
  /**
   * Whether the context menu is disabled.
   */
  isDisabled?: boolean;
}
