import { type DropdownMenuSubProps as RadixDropdownMenuSubProps } from '@radix-ui/react-dropdown-menu';

import { ContextMenuMode } from '../../ContextMenu.enums';

import { SubSelectOption } from './SubSelect.types';
import { SortDirection } from './SubSelect.enums';

export type ContextMenuSubSelectRootProps = RadixDropdownMenuSubProps & {
  /**
   * Current selected item.
   */
  value?: SubSelectOption;
  /**
   * Current sort direction.
   */
  sortDirection?: SortDirection;
  /**
   * Change handler for value or direction.
   */
  onChange: (value: SubSelectOption, sortDirection?: SortDirection) => void;
  /**
   * Defines how the SubSelect is triggered.
   *
   * @default ContextMenuMode.HOVER
   */
  mode?: ContextMenuMode;
};

export interface ContextMenuSubSelectContextProps {
  /**
   * Current selected item.
   */
  value?: SubSelectOption;
  /**
   * Current sort direction.
   */
  sortDirection?: SortDirection;
  /**
   * Change handler for value or direction.
   */
  onChange: (value: SubSelectOption, sortDirection?: SortDirection) => void;
  /**
   * Indicates whether the submenu's open animation is currently active.
   */
  animatedOpen: boolean;
  /**
   * Triggers the submenu's open animation after it has been mounted.
   */
  startAnimation: () => void;
  /**
   * Indicates whether the sub-select menu is currently open.
   */
  open: boolean;
  /**
   * Defines how the SubSelect is triggered.
   */
  mode: ContextMenuMode;
}
