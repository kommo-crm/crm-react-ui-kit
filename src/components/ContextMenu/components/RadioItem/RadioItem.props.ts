import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import type { RadioItem as RadixDropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';

import type { ContextMenuRadioItemThemeType } from './RadioItem.theme';

type RadixRadioItemProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuRadioItem>,
  'disabled' | 'checked' | 'textValue'
>;

export type RadioItemProps = RadixRadioItemProps & {
  /**
   * Theme.
   */
  theme: ContextMenuRadioItemThemeType;
  /**
   * Icon to the left of the text.
   */
  icon?: ReactElement;
  /**
   * Child text element. Use the Text component.
   */
  text?: ReactElement;
  /**
   * Whether the RadioItem is disabled.
   */
  isDisabled?: boolean;
};
