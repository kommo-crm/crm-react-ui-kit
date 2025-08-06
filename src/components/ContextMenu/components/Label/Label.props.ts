import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import type { Label as RadixDropdownMenuLabel } from '@radix-ui/react-dropdown-menu';

import type { ContextMenuLabelThemeType } from './Label.theme';

type RadixLabelProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuLabel>,
  'disabled' | 'textValue'
>;

export type LabelProps = RadixLabelProps & {
  /**
   * Theme.
   */
  theme: ContextMenuLabelThemeType;
  /**
   * Icon to the left of the text.
   */
  icon?: ReactElement;
  /**
   * Child text element. Use the Text component.
   */
  text?: ReactElement;
};
