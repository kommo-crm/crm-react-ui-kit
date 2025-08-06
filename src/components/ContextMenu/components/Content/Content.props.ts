import { ComponentPropsWithoutRef } from 'react';
import { Content as RadixDropdownMenuContent } from '@radix-ui/react-dropdown-menu';

import { ContextMenuContentThemeType } from './Content.theme';

export type ContentProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenuContent
> & {
  /**
   * Theme.
   */
  theme: ContextMenuContentThemeType;
};
