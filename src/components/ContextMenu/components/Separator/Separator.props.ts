import { ComponentPropsWithoutRef } from 'react';
import { Separator as RadixDropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';

import { ContextMenuSeparatorThemeType } from './Separator.theme';

type RadixSeparatorProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuSeparator>,
  'children'
>;

export type SeparatorProps = RadixSeparatorProps & {
  /**
   * Theme.
   */
  theme: ContextMenuSeparatorThemeType;
};
