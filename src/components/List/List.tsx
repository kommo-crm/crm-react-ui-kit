import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { TextPrimaryTheme, TextSizes, TextTheme } from 'src/components/Text';

import { ListProps } from './List.props';
import { Item } from './components/Item';

import s from './List.module.css';

type ListElement = HTMLUListElement | HTMLOListElement;

const sizeClassName: Record<TextSizes, string> = {
  s: s.s,
  m: s.m,
  ms: s.ms,
  l: s.l,
  xl: s.xl,
};

const ListBase = forwardRef<ListElement, ListProps>((props, forwardedRef) => {
  const {
    type = 'bulleted',
    size = 'l',
    theme = TextPrimaryTheme,
    className = '',
    children,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<TextTheme>(theme);

  const classes = cx(
    s.list,
    sizeClassName[size],
    themeClassName,
    {
      [s.bulleted]: type === 'bulleted',
      [s.numbered]: type === 'numbered',
    },
    className
  );

  if (type === 'numbered') {
    return (
      <ol
        ref={forwardedRef as React.RefObject<HTMLOListElement>}
        className={classes}
        {...rest}
      >
        {children}
      </ol>
    );
  }

  return (
    <ul
      ref={forwardedRef as React.RefObject<HTMLUListElement>}
      className={classes}
      {...rest}
    >
      {children}
    </ul>
  );
});

ListBase.displayName = 'List';

export const List = Object.assign(ListBase, { Item });
