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
   * Delay in milliseconds before the menu opens
   * when the user hovering on it.
   *
   * @default 100
   */
  hoverOpenDelay?: number;
};

export interface ContextMenuContextProps {
  /**
   * Reference to the DOM element that acts as the menu trigger.
   *
   * Used for positioning calculations and detecting
   * whether the cursor is inside the trigger area.
   */
  triggerRef: React.RefObject<HTMLButtonElement>;
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
  hoverCloseDelay: number;
  /**
   * Delay in milliseconds before the menu opens
   * when the user hovering on it.
   *
   * @default 100
   */
  hoverOpenDelay: number;
}
