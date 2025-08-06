import { ComponentPropsWithoutRef } from 'react';
import { Arrow as RadixDropdownMenuArrow } from '@radix-ui/react-dropdown-menu';

import { ContextMenuArrowThemeType } from './Arrow.theme';

export type ArrowProps = ComponentPropsWithoutRef<
  typeof RadixDropdownMenuArrow
> & {
  /**
   * Theme.
   */
  theme: ContextMenuArrowThemeType;
};
