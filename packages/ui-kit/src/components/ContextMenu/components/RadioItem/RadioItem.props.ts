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
   * Whether the RadioItem should close the current menu when selected.
   *
   * @default true
   */
  shouldCloseCurrentMenuOnSelect?: boolean;
  /**
   * Whether the RadioItem should close the root menu when selected.
   *
   * @default true
   */
  shouldCloseRootMenuOnSelect?: boolean;
};
