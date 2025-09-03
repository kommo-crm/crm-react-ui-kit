import type { ComponentPropsWithoutRef } from 'react';
import type { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';

type RadixItemProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuItem>,
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
   * Whether the item is not selectable.
   */
  isNotSelectable?: boolean;
  /**
   * Whether the item has a submenu.
   */
  hasSubmenu?: boolean;
};
