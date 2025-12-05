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
   * Whether the item is dangerous.
   */
  isDanger?: boolean;
  /**
   * Whether the item is selectable.
   */
  isSelectable?: boolean;
  /**
   * Whether the item should close the current menu when selected.
   *
   * @default true
   */
  shouldCloseCurrentMenuOnSelect?: boolean;
  /**
   * Whether the item should close the root menu when selected.
   *
   * @default false
   */
  shouldCloseRootMenuOnSelect?: boolean;
};
