import React, { forwardRef } from 'react';
import cx from 'classnames';

import { ListProps, ListType } from './List.props';
import { Item } from './components/Item';

import s from './List.module.css';

const tags: Record<ListType, React.ElementType> = {
  bulleted: 'ul',
  numbered: 'ol',
};

const ListBase = forwardRef<HTMLElement, ListProps>((props, ref) => {
  const { type, className = '', children, ...rest } = props;
  const Tag = tags[type];

  return (
    <Tag
      ref={ref}
      className={cx(
        s.list,
        {
          [s.bulleted]: type === 'bulleted',
          [s.numbered]: type === 'numbered',
        },
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
});

ListBase.displayName = 'List';

export const List = Object.assign(ListBase, { Item });
