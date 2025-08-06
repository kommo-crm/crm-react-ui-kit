import type { ComponentPropsWithoutRef } from 'react';
import type { Item as RadixDropdownMenuSubSelectItem } from '@radix-ui/react-dropdown-menu';

import { SubSelectOption } from '../../SubSelect.types';

import type { ContextMenuSubSelectItemThemeType } from './Item.theme';

type RadixSubSelectItemProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDropdownMenuSubSelectItem>,
  'disabled' | 'textValue'
>;

export type SubSelectItemProps = RadixSubSelectItemProps & {
  /**
   * Theme.
   */
  theme: ContextMenuSubSelectItemThemeType;
  /**
   * Icon to the left of the text.
   */
  icon?: React.ReactElement;
  /**
   * The option object rendered by this item.
   * Contains the display label, unique value, and optional sortability flag.
   */
  item: SubSelectOption;
  /**
   * Optional icon to indicate sorting direction.
   * For the arrow to work correctly, it should look down by default.
   */
  sortIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  /**
   * Whether the SubSelectitem is disabled.
   */
  isDisabled?: boolean;
  /**
   * Whether the SubSelectitem is dangerous (adds `data-danger`).
   */
  isDanger?: boolean;
};
