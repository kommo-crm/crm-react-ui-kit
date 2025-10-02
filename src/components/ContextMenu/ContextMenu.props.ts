import { type DropdownMenuProps as RadixDropdownMenuRootProps } from '@radix-ui/react-dropdown-menu';

import { ContextMenuModeType } from './ContextMenu.types';

export type ContextMenuRootProps = Omit<
  RadixDropdownMenuRootProps,
  'onOpenChange' | 'modal' | 'open'
> & {
  /**
   * Called whenever the open state of the menu changes.
   */
  onOpen?: (open: boolean) => void;
  /**
   * Called whenever the animated open state of the menu changes.
   */
  onAnimatedOpen?: (open: boolean) => void;
  /**
   * Defines how the menu is triggered.
   *
   * - `click`: menu opens on click, closes on outside click.
   * - `hover`: menu opens and closes on mouse hover.
   */
  mode: ContextMenuModeType;
  /**
   * Whether the menu should close when another menu is opened.
   * It only works in conjunction with other similar menus.
   */
  autoCloseOnOtherOpen?: boolean;
  /**
   * Whether the menu is a submenu.
   */
  isSubmenu?: boolean;
  /**
   * Whether the menu should close when clicked.
   *
   * @default true
   */
  isCloseOnClick?: boolean;
  /**
   * Whether the context menu is open forcefully.
   */
  isOpen?: boolean;
  /**
   * Whether the item should enable inner input focus.
   *
   * @default false
   */
  enableInnerInputFocus?: boolean;
  /**
   * The container to focus the blocker on.
   *
   * @default [document.body]
   */
  backgroundFocusBlockerContainers?: (
    | HTMLElement
    | (() => HTMLElement)
    | null
  )[];
  /**
   * The class name of the background focus blocker.
   */
  backgroundFocusBlockerClassName?: string;
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
  mode: ContextMenuModeType;
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
   * It only makes sense when mode is `click`
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
   * Called when the mouse enters the ContextMenu element.
   */
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Called when the mouse leaves the ContextMenu element.
   */
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Whether the submenu is open.
   *
   * @remarks
   * This prop is only used for `SubRoot` (submenu) components.
   */
  subMenuOpen?: boolean;
  /**
   * The callback function to be called when the submenu is opened.
   *
   * @remarks
   * This prop is only used for `SubRoot` (submenu) components.
   */
  setSubMenuOpen?: (open: boolean) => void;
  /**
   * The id of the trigger.
   *
   * @remarks
   * This prop is only used for `SubRoot` (submenu) components.
   */
  triggerId?: string;
  /**
   * The callback function to be called when the menu is opened by keyboard.
   */
  onOpenByKeyboard: (value: boolean) => void;
  /**
   * Whether the menu is open.
   */
  isOpen: boolean;
  /**
   * Whether the menu should close when clicked.
   */
  isCloseOnClick: boolean;
  /**
   * The callback function to be called when the child menu is opened.
   */
  onChildOpen: (value: boolean, mode: ContextMenuModeType) => void;
  /**
   * The callback function to be called when the submenu is opened.
   *
   * @remarks
   * This prop is only used for `ContextMenu` (root) components.
   */
  onSubmenuOpen?: (value: boolean) => void;
  /**
   * Whether the root menu content is blocked.
   *
   * @remarks
   * This prop is only used for `ContextMenu` (root) components.
   */
  isRootContentBlocked?: boolean;
  /**
   * Whether the child menu is open.
   *
   * @remarks
   * This prop is only used for `ContextMenu` (root) components.
   */
  isChildOpen?: boolean;
  /**
   * Whether the menu should close when the root menu is closed.
   *
   * @remarks
   * This prop is only used for `ContextMenu` (root) components.
   */
  shouldCloseRootMenuOnClick?: boolean;
}

export interface ContextMenuRootContextProps {
  /**
   * Immediately closes the root menu without waiting for any hover or animation delays.
   */
  closeRootMenuImmediately: (closeRootMenu?: boolean) => void;
  /**
   * Sets whether the item with the focused input is open.
   */
  setItemWithFocusedInput: (itemWithFocusedInput: string | null) => void;
  /**
   * Whether the item with the focused input is open.
   */
  itemWithFocusedInput: string | null;
  /**
   * Whether the item should enable inner input focus.
   */
  enableInnerInputFocus: boolean;
}
