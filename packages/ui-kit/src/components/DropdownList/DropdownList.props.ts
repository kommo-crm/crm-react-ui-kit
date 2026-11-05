import { HTMLAttributes, Ref } from 'react';

import { type ScrollAreaVisibilityState } from '@ui-kit/components/ScrollArea';

import { DropdownListThemeType } from './DropdownList.theme';

export interface DropdownListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Object with CSS theme properties.
   */
  theme: DropdownListThemeType;
  /**
   * Content of the list, scrolled inside the component.
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
   * Ref to the scrollable viewport of the list.
   */
  viewportRef?: Ref<HTMLDivElement>;
  /**
   * Called when the content becomes clipped or unclipped at the top or bottom.
   */
  onScrollVisibilityChange?: (state: ScrollAreaVisibilityState) => void;
}
