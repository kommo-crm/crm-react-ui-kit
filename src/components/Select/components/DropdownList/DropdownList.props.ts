import { ReactElement } from 'react';

import { ListProps } from 'src/components/Select/components/List';

export type DropdownListPortalProps = {
  /**
   * Select List.
   */
  children: ReactElement | JSX.Element[];
  /**
   * The container in which to define the List.
   */
  container?: Element | DocumentFragment | null;
};

export type DropdownListProps = ListProps & DropdownListPortalProps;
