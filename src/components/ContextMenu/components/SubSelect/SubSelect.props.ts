import { type DropdownMenuSubProps as RadixDropdownMenuSubProps } from '@radix-ui/react-dropdown-menu';

import { SubSelectOption } from './SubSelect.types';
import { SortDirection } from './SubSelect.enums';

export interface SubSelectContextProps {
  /**
   * Current selected item.
   */
  value?: SubSelectOption;
  /**
   * Current sort direction (optional).
   */
  sortDirection?: SortDirection;
  /**
   * Change handler for value or direction.
   */
  onChange: (value: SubSelectOption, sortDirection?: SortDirection) => void;
}

export type SubSelectProps = RadixDropdownMenuSubProps & SubSelectContextProps;
