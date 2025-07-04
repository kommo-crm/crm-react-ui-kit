import { ReactElement } from 'react';

import { ListProps as BaseListProps } from 'src/components/List';

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

export type SelectListProps = {
  /**
   * Flag which enables the focus on it after opening the List.
   */
  isFocusAfterOpenEnabled?: boolean;
};

export type ListProps = BaseListProps & ListPortalProps & SelectListProps;
