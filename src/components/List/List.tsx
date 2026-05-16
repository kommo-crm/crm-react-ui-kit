import React, { forwardRef } from 'react';
import cx from 'classnames';

import { Text, TextPrimaryTheme } from 'src/components/Text';

import { ListProps } from './List.props';
import { Item } from './components/Item';

import s from './List.module.css';

type ListElement = HTMLUListElement | HTMLOListElement;

const ListBase = forwardRef<ListElement, ListProps>((props, forwardedRef) => {
  const {
    type = 'bulleted',
    size = 'l',
    theme = TextPrimaryTheme,
    className = '',
    children,
    ...rest
  } = props;

  return (
    <Text
      as={type === 'numbered' ? 'ol' : 'ul'}
      ref={forwardedRef}
      size={size}
      theme={theme}
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
    </Text>
  );
});

ListBase.displayName = 'List';

export const List = Object.assign(ListBase, { Item });
