import { type DropdownMenuProps as RadixDropdownMenuRootProps } from '@radix-ui/react-dropdown-menu';

import { MenuAimDirection } from './hooks/useMenuAim';

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
   * Whether the menu should close when item selected.
   *
   * @default true
   */
  shouldCloseCurrentMenuOnSelect?: boolean;
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
   * Whether the context menu should close when focus is lost.
   *
   * @default false
   */
  enableCloseOnFocusLoss?: boolean;
  /**
   * Called whenever the value of `isMovingTowardActiveMenuRef` changes
   * in the context menu bus.
   *
   * This ref tracks whether the cursor is currently moving toward the active menu,
   * which is used to prevent menu closure when navigating between menus in hover mode.
   * The callback is triggered whenever this tracking state changes.
   */
  onAiming?: (isAiming: boolean) => void;
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
   * Indicates whether the menu is fully open and ready to display
   * its content (used to coordinate animations).
   */
  isAnimatedOpen: boolean;
  /**
   * The duration of the menu and submenus opening/closing animation in milliseconds.
   */
  animationDuration: number;
  /**
   * Immediately closes the menu without waiting for any hover or animation delays.
   */
  closeMenuImmediately: () => void;
  /**
   * Called when mouse enters the menu content area.
   * Keeps the menu open in hover mode by canceling close timers.
   */
  onContentEnter: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Called when mouse leaves the menu content area.
   * Allows the menu to close in hover mode.
   */
  onContentLeave: (e: React.MouseEvent<HTMLElement>) => void;
  /**
   * Whether the submenu is open.
   *
   * @remarks
   * This prop is only used for `SubRoot` (submenu) components.
   */
  isSubMenuOpen?: boolean;
  /**
   * The callback function to be called when the submenu is opened.
   *
   * @remarks
   * This prop is only used for `SubRoot` (submenu) components.
   */
  setIsSubMenuOpen?: (open: boolean) => void;
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
   * Whether the menu should close when item selected.
   */
  shouldCloseCurrentMenuOnSelect: boolean;
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
   * Whether the root menu should close when item selected.
   *
   * @remarks
   * This prop is only used for `ContextMenu` (root) components.
   */
  shouldCloseRootMenuOnSelect?: boolean;
  /**
   * Sets whether the item with the focused input is open.
   */
  setItemWithFocusedInput: (itemWithFocusedInput: string | null) => void;
  /**
   * Whether the item with the focused input is open.
   */
  itemWithFocusedInput: string | null;
  /**
   * Checks if focus restoration should be prevented when menu closes.
   *
   * @remarks
   * This prop is only used for `ContextMenu` (root) components.
   */
  shouldPreventFocusRestore?: () => boolean;
  /**
   * Sets the menu aim direction.
   *
   * @remarks
   * This prop is only used for `ContextMenu` (root) components.
   */
  setMenuAimDirection?: (direction: MenuAimDirection) => void;
}

export interface ContextMenuRootContextProps {
  /**
   * Immediately closes the root menu without waiting for any hover or animation delays.
   */
  closeRootMenuImmediately: (closeRootMenu?: boolean) => void;
  /**
   * Whether the item should enable inner input focus.
   */
  enableInnerInputFocus: boolean;
}
