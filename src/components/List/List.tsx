import React, { forwardRef } from 'react';
import cx from 'classnames';

import { ListProps } from './List.props';
import { Item } from './components/Item';

import s from './List.module.css';

type ListElement = HTMLUListElement | HTMLOListElement;

const ListBase = forwardRef<ListElement, ListProps>((props, forwardedRef) => {
  const { type = 'bulleted', className = '', children, ...rest } = props;

  switch (type) {
    case 'bulleted':
      return (
        <ul
          ref={forwardedRef}
          className={cx(s.list, s.bulleted, className)}
          {...rest}
        >
          {children}
        </ul>
      );

    case 'numbered':
      return (
        <ol
          ref={forwardedRef as React.Ref<HTMLOListElement>}
          className={cx(s.list, s.numbered, className)}
          {...rest}
        >
          {children}
        </ol>
      );
  }
});

ListBase.displayName = 'List';

export const List = Object.assign(ListBase, { Item });
