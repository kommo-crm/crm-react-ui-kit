import type { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';

type RadixItemProps = Omit<
  React.ComponentPropsWithRef<typeof RadixDropdownMenuItem>,
  'disabled'
>;

export type ItemProps = RadixItemProps & {
  /**
   * Whether the item is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the item is dangerous (adds `data-danger`).
   */
  isDanger?: boolean;
  /**
   * A function for checking the presence of an icon.
   *
   * By default, the `hasItemIcon` from utils is used.
   */
  hasIconCheckFn?: (children: React.ReactNode) => boolean;
  /**
   * Whether the item should close the menu when clicked.
   *
   * @default true
   */
  isCloseMenuOnClick?: boolean;
  /**
   * Whether the item should close the root menu when clicked.
   *
   * @default false
   */
  shouldCloseRootMenuOnClick?: boolean;
  /**
   * Whether the item is selectable.
   */
  isSelectable?: boolean;
};
