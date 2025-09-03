import type { ComponentPropsWithoutRef } from 'react';
import type { SubTrigger as RadixDropdownMenuSubTrigger } from '@radix-ui/react-dropdown-menu';

type RadixSubTriggerProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuSubTrigger>,
  'disabled' | 'textValue' | 'asChild'
>;

export type SubTriggerProps = RadixSubTriggerProps & {
  /**
   * Whether the SubTrigger is disabled.
   */
  isDisabled?: boolean;
};
