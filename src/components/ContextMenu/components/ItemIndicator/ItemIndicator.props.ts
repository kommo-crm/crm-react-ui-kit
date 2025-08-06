import { ComponentPropsWithoutRef } from 'react';
import { ItemIndicator as RadixDropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';

import { ContextMenuItemIndicatorThemeType } from './ItemIndicator.theme';

export type ItemIndicatorProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenuItemIndicator
> & {
  /**
   * Theme.
   */
  theme: ContextMenuItemIndicatorThemeType;
};
