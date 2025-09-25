import { type DropdownMenuProps as RadixDropdownMenuRootProps } from '@radix-ui/react-dropdown-menu';

import { ContextMenuModeType } from '../../ContextMenu.types';

export type ContextMenuSubRootProps = Omit<
  RadixDropdownMenuRootProps,
  'onOpenChange' | 'modal'
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
   *
   * @default "hover"
   */
  mode?: ContextMenuModeType;
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
   * Whether the submenu should close when the root menu is closed.
   */
  isCloseWithRootMenu?: boolean;
  /**
   * Whether the menu should close when clicked.
   */
  isCloseOnClick?: boolean;
};
