import { type DropdownMenuProps as RadixDropdownMenuRootProps } from '@radix-ui/react-dropdown-menu';

import { ContextMenuMode } from './ContextMenu.enums';

export type ContextMenuRootProps = Omit<
  RadixDropdownMenuRootProps,
  'onOpenChange' | 'modal'
> & {
  /**
   * Called whenever the open state of the menu changes.
   */
  onOpen?: (open: boolean) => void;
  /**
   * Defines how the menu is triggered.
   *
   * - `click`: menu opens on click, closes on outside click.
   * - `hover`: menu opens and closes on mouse hover.
   */
  mode: ContextMenuMode;
  /**
   * Delay in milliseconds before the menu closes
   * when the user stops hovering over it.
   *
   * @default 200
   */
  hoverCloseDelay?: number;
  /**
   * The duration of the menu and submenus opening/closing animation in milliseconds.
   *
   * @default 150
   */
  animationDuration?: number;
  /**
   * Whether to disable the label offset.
   *
   * @default false
   */
  disableLabelOffset?: boolean;
};

export interface ContextMenuContextProps {
  /**
   * Reference to the DOM element that acts as the menu trigger.
   */
  triggerRef: React.RefObject<HTMLButtonElement>;
  /**
   * Reference to the DOM element containing the menu content.
   */
  contentRef: React.RefObject<HTMLDivElement>;
  /**
   * Defines how the menu is triggered.
   *
   * - `click`: menu opens on click, closes on outside click.
   * - `hover`: menu opens and closes on mouse hover.
   */
  mode: ContextMenuMode;
  /**
   * Delay in milliseconds before the menu closes
   * when the user stops hovering over it.
   */
  hoverCloseDelay: number;
  /**
   * Indicates whether the menu is in a temporary hover-close state.
   */
  temporaryHoverClose: boolean;
  /**
   * Temporarily enables hover-based closing behavior for the menu.
   * When called, the menu will close on hover outside until it hides.
   *
   * It only makes sense when mode is `ContextMenuMode.CLICK`
   */
  enableTemporaryHoverClose: () => void;
  /**
   * CSS color value inherited from the background of the
   * first/last menu item depending on the menu side.
   */
  inheritedArrowColor: string | null;
  /**
   * Indicates whether the menu is fully open and ready to display
   * its content (used to coordinate animations).
   */
  animatedOpen: boolean;
  /**
   * The duration of the menu and submenus opening/closing animation in milliseconds.
   */
  animationDuration: number;
  /**
   * Immediately closes the menu without waiting for any hover or animation delays.
   */
  closeMenuImmediately: () => void;
  /**
   * Whether to disable the label offset.
   */
  disableLabelOffset: boolean;
}
