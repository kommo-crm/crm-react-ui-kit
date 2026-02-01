import { type DropdownMenuProps as RadixDropdownMenuRootProps } from '@radix-ui/react-dropdown-menu';

import { ContextMenuModeType } from '../../ContextMenu.types';

export type ContextMenuSubRootProps = Omit<
  RadixDropdownMenuRootProps,
  'onOpenChange' | 'modal'
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
   *
   * @default "hover"
   */
  mode?: ContextMenuModeType;
  /**
   * Whether the root menu should close when item selected.
   *
   * @default true
   */
  shouldCloseRootMenuOnSelect?: boolean;
  /**
   * Whether the submenu should close when item selected.
   *
   * @default true
   */
  shouldCloseCurrentMenuOnSelect?: boolean;
};
