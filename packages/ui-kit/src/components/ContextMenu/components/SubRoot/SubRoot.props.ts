import { type DropdownMenuProps as RadixDropdownMenuRootProps } from '@radix-ui/react-dropdown-menu';

import { ContextMenuModeType } from '../../ContextMenu.types';

export type ContextMenuSubRootProps = Omit<
  RadixDropdownMenuRootProps,
  'onOpenChange' | 'modal' | 'defaultOpen' | 'open'
> & {
  /**
   * The open state of the submenu when it is initially rendered.
   * Use when you do not need to control its open state.
   */
  isDefaultOpen?: boolean;
  /**
   * The controlled open state of the submenu.
   * When passed, the submenu is fully controlled by the consumer: it never
   * opens or closes on its own and only reports the requested state
   * via `onOpen`.
   */
  isOpen?: boolean;
  /**
   * @deprecated Use `isDefaultOpen` instead.
   */
  defaultOpen?: boolean;
  /**
   * Called whenever the open state of the menu changes.
   *
   * In controlled mode (the `isOpen` prop is passed) the submenu doesn't change
   * its own state, so the callback reports the interaction that requests
   * the change and the consumer decides whether to apply it.
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
