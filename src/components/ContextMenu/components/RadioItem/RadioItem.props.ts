import type { ComponentPropsWithoutRef } from 'react';
import type { RadioItem as RadixDropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';

type RadixRadioItemProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuRadioItem>,
  'disabled'
>;

export type RadioItemProps = RadixRadioItemProps & {
  /**
   * Whether the RadioItem is disabled.
   */
  isDisabled?: boolean;
  /**
   * A function for checking the presence of an icon.
   *
   * By default, the `hasItemIcon` from utils is used.
   */
  hasIconCheckFn?: (children: React.ReactNode) => boolean;
  /**
   * Whether the RadioItem should close the menu when clicked.
   */
  isCloseMenuOnClick?: boolean;
  /**
   * Whether the RadioItem should close the root menu when clicked.
   */
  isCloseWithRootMenu?: boolean;
};
