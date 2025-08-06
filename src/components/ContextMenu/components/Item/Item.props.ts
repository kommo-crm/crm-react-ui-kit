import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import type { Item as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';

import type { ContextMenuItemThemeType } from './Item.theme';

type RadixItemProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuItem>,
  'disabled' | 'textValue'
>;

export type ItemProps = RadixItemProps & {
  /**
   * Theme.
   */
  theme: ContextMenuItemThemeType;
  /**
   * Icon to the left of the text.
   */
  icon?: ReactElement;
  /**
   * Child text element. Use the Text component.
   */
  text?: ReactElement;
  /**
   * Whether the item is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the item is dangerous (adds `data-danger`).
   */
  isDanger?: boolean;
};
