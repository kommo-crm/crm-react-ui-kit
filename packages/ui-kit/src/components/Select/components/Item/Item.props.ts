import { HTMLAttributes } from 'react';

import { SelectItem } from '../../Select.types';

import { SelectItemThemeType } from './Item.theme';

export interface ItemProps
  extends Omit<HTMLAttributes<HTMLLIElement>, 'onSelect'> {
  /**
   * Select element.
   */
  item: SelectItem;
  /**
   * Element's index
   */
  index: number;
  /**
   * Child elements.
   */
  children?: React.ReactNode;
  /**
   * Custom class for the element.
   */
  className?: string;
  /**
   * Theme of the component.
   */
  theme: SelectItemThemeType;
  /**
   * Whether the item holds its own controls, such as inputs or buttons.
   * Clicks on the controls and on the blocks around them neither select
   * the item nor close the list, so the controls work as usual.
   * A click on the rest of the row, the arrow keys and Enter
   * select the item as any other.
   * Use it for a custom option whose value is set by its own controls.
   * @default false
   */
  isInteractive?: boolean;
  /**
   * Called before the item is selected by a click on its row or by Enter.
   * Call `event.preventDefault()` to keep the item from being selected,
   * for example when it is selected by a button inside it only.
   */
  onSelect?: (event: Event) => void;
}
