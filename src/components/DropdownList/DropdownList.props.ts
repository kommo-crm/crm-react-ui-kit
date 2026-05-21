import { HTMLAttributes } from 'react';

import { DropdownListThemeType } from './DropdownList.theme';

export type DropdownListPlacement = 'top' | 'bottom';

export interface DropdownListProps
  extends Omit<HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  /**
   * Object with CSS theme properties.
   */
  theme: DropdownListThemeType;
  /**
   * Child elements that will be displayed inside the component.
   */
  children: React.ReactNode;
  /**
   * Custom CSS class for component.
   */
  className?: string;
  /**
   * Custom CSS class for a list item.
   */
  itemClassName?: string;
  /**
   * Flag indicates whether the component is in the open state.
   */
  isOpened?: boolean;
  /**
   * Vertical placement relative to the select root.
   * Determined automatically if not explicitly specified.
   */
  placement?: DropdownListPlacement;
  /**
   * A callback that works on selecting a list item.
   */
  onSelect?: (index: number) => void;
  /**
   * A callback that works on opening/closing a component.
   */
  onToggle?: (toggle: boolean) => void;
  /**
   * A callback that works on changing the active element in the list.
   */
  onHoveredIndexChange?: (index: number) => void;
  /**
   * Index of the hovered element.
   */
  hoveredIndex?: number;
}
