import { ComponentPropsWithoutRef } from 'react';
import { Trigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

export type TriggerProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenuTrigger
> & {
  /**
   * Disables menu opening on trigger interaction in CLICK mode.
   */
  isDisabled?: boolean;
};
