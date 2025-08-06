import { ComponentPropsWithoutRef } from 'react';
import { Trigger as RadixDropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

import { ContextMenuTriggerThemeType } from './Trigger.theme';

type RadixTriggerProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuTrigger>,
  'asChild'
>;

export type TriggerProps = RadixTriggerProps & {
  /**
   * Theme.
   */
  theme: ContextMenuTriggerThemeType;
};
