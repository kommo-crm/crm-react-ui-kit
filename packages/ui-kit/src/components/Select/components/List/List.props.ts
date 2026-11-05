import { HTMLAttributes, ReactElement } from 'react';

import { type DropdownListThemeType } from '@ui-kit/components/DropdownList';

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

export type ListProps = Omit<HTMLAttributes<HTMLUListElement>, 'children'> &
  ListPortalProps & {
    /**
     * Object with CSS theme properties.
     */
    theme: DropdownListThemeType;
    /**
     * Custom CSS class for the list box.
     */
    className?: string;
    /**
     * Shows a spinner after the items while the next portion is loading.
     * `onScrollEnd` is not called while it is `true`.
     * @default false
     */
    isLoading?: boolean;
    /**
     * Called when the end of the list becomes visible: the list is scrolled
     * to the end, or all the items fit without scrolling.
     * Use it to load the next portion of items and append them to the list.
     */
    onScrollEnd?: () => void;
  };
