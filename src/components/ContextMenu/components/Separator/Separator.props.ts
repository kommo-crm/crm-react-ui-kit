import { ComponentPropsWithoutRef } from 'react';
import { Separator as RadixDropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';

export type SeparatorProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuSeparator>,
  'children'
>;
