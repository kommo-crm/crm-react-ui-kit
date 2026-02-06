import { type DropdownMenuProps as RadixDropdownMenuRootProps } from '@radix-ui/react-dropdown-menu';

import type { FocusChangeEvent } from 'src/hooks';

import { ContextMenuModeType } from './ContextMenu.types';

export type ContextMenuRootProps = Omit<
  RadixDropdownMenuRootProps,
  'onOpenChange' | 'modal' | 'open'
> & {
  /**
   * Called whenever the open state of the menu changes.
   */
  onOpen?: (isOpen: boolean) => void;
  /**
   * Called whenever the animated open state of the menu changes.
   */
  onAnimatedOpen?: (isAnimatedOpen: boolean) => void;
  /**
   * Defines how the menu is triggered.
   *
   * - `click`: menu opens on click, closes on outside click.
   * - `hover`: menu opens and closes on mouse hover.
   */
  mode: ContextMenuModeType;
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
   * Called whenever the value of `isMovingTowardActiveMenuRef` changes
   * in the context menu bus.
   *
   * This ref tracks whether the cursor is currently moving toward the active menu,
   * which is used to prevent menu closure when navigating between menus in hover mode.
   * The callback is triggered whenever this tracking state changes.
   */
  onAiming?: (isAiming: boolean) => void;
  /**
   * Tolerance in pixels for detecting cursor movement toward the menu.
   * Higher values make the detection more lenient.
   *
   * @default 0
   */
  isAimingTolerance?: number;
  /**
   * Timeout in milliseconds before considering cursor movement as idle.
   * Used to reset aiming state when cursor stops moving.
   *
   * @default 200
   */
  isAimingIdleTimeout?: number;
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
  setIsSubMenuOpen?: (isOpen: boolean) => void;
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
  onOpenByKeyboard: (isOpen: boolean) => void;
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
  onChildOpen: (isOpen: boolean, mode: ContextMenuModeType) => void;
  /**
   * The callback function to be called when the submenu is opened.
   *
   * @remarks
   * This prop is only used for `ContextMenu` (root) components.
   */
  onSubmenuOpen?: (isOpen: boolean) => void;
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
   * Sets the callback for when focus moves outside the menu.
   * The callback can call preventDefault() to prevent menu closure.
   *
   * @remarks
   * This prop is only used for `ContextMenu` (root) components.
   */
  setOnFocusOutside?: (
    callback: ((event: FocusChangeEvent) => void) | undefined
  ) => void;
}

export interface ContextMenuRootContextProps {
  /**
   * Immediately closes the root menu without waiting for any hover or animation delays.
   */
  closeRootMenuImmediately: (closeRootMenu?: boolean) => void;
  /**
   * Reference to the DOM element containing the menu content.
   */
  navigationContentRef: React.RefObject<HTMLDivElement>;
}
