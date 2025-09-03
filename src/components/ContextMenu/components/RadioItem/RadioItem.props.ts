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
};
