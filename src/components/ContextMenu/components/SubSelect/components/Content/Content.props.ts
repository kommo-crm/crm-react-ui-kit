import { ComponentPropsWithoutRef } from 'react';
import { SubContent as RadixDropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';

import { ContextMenuSubSelectContentThemeType } from './Content.theme';

export type SubSelectContentProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenuSubContent
> & {
  /**
   * Theme.
   */
  theme: ContextMenuSubSelectContentThemeType;
};
