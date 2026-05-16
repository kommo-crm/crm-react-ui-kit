import { HTMLAttributes, ReactElement } from 'react';

import { ListThemeType } from './List.theme';

export interface BaseDropdownListProps
  extends Omit<HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  /**
   * Object with CSS theme properties.
   */
  theme: ListThemeType;
  /**
   * Child elements that will be displayed inside the component.
   */
  children: React.ReactNode;
  /**
   * Custom CSS class for component.
   */
  className?: string;
  /**
   * Flag indicates whether the component is in the open state.
   */
  isOpened?: boolean;
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

export type ListPortalProps = {
  /**
   * Select List.
   */
  children: ReactElement | JSX.Element[];
  /**
   * The container in which to define the List.
   */
  container?: Element | DocumentFragment | null;
};

export type ListProps = BaseDropdownListProps & ListPortalProps;
