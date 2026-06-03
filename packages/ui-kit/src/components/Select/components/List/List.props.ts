import { ReactElement } from 'react';

import { DropdownListProps as BaseListProps } from 'src/components/DropdownList';

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

export type ListProps = BaseListProps & ListPortalProps;
