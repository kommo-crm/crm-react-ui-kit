import { ComponentPropsWithoutRef } from 'react';
import { SubContent as RadixDropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';

import { ContextMenuSubContentThemeType } from './SubContent.theme';

export type SubContentProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenuSubContent
> & {
  /**
   * Theme.
   */
  theme: ContextMenuSubContentThemeType;
};
