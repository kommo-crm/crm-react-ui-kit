import { ComponentPropsWithoutRef } from 'react';
import { Trigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

export type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuTrigger>,
  'asChild'
>;
