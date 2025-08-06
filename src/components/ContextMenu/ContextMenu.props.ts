import { type DropdownMenuProps as RadixDropdownMenuRootProps } from '@radix-ui/react-dropdown-menu';

import type { ContextMenuRootThemeType } from './ContextMenu.theme';
import { ContextMenuMode } from './ContextMenu.enums';

export type ContextMenuRootProps = Omit<
  RadixDropdownMenuRootProps,
  'onOpenChange'
> & {
  /**
   * Custom classes for styling.
   */
  className?: string;
  /**
   * Object with CSS theme properties.
   */
  theme: ContextMenuRootThemeType;
  /**
   * Delay in milliseconds before the menu closes
   * when the user stops hovering over it.
   *
   * Defaults to 200ms. Set to 0 for immediate close.
   */
  autoCloseDelay?: number;
  /**
   * Called whenever the open state of the menu changes.
   */
  onOpen?: (open: boolean) => void;
  /**
   * Defines how the menu is triggered.
   *
   * - `click`: menu opens on click, closes on outside click.
   * - `hover`: menu opens and closes on mouse hover.
   *
   * @default ContextMenuMode.Click
   */
  mode?: ContextMenuMode;
};

export interface ContextMenuContextProps {
  /**
   * Reference to the DOM element that acts as the menu trigger.
   *
   * Used for positioning calculations and detecting
   * whether the cursor is inside the trigger area.
   */
  triggerRef: React.RefObject<HTMLDivElement>;
  /**
   * Delay (in milliseconds) before automatically closing the menu
   * in `hover` mode when the cursor leaves the menu area.
   */
  autoCloseDelay: number;
}
