import React, { forwardRef, MutableRefObject } from 'react';
import cx from 'classnames';
import { useKeyboardListNavigation } from '@kommo-crm/react-hooks';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { CustomScrollClassName } from 'src/stylesheets/utils/BaseClasses';

import { noop } from 'src/utils';

import { ListProps } from './List.props';
import { ListThemeType } from './List.theme';

import s from './List.module.css';

type L = HTMLUListElement;

export const List = forwardRef<L, ListProps>((props, ref) => {
  const {
    className = '',
    theme,
    children,
    isOpened,
    hoveredIndex = 0,
    onSelect = noop,
    onToggle = noop,
    onHoveredIndexChange = noop,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<ListThemeType>(theme);

  const { onKeyDown } = useKeyboardListNavigation({
    itemsLength: React.Children.toArray(children).length,
    onSelect,
    onToggle,
    isOpened,
    listRef: ref as MutableRefObject<HTMLUListElement>,
    hoveredIndex,
    onHoveredIndexChange,
  });

  return (
    isOpened && (
      <ul
        onKeyDown={onKeyDown}
        ref={ref}
        tabIndex={0}
        className={cx(
          CustomScrollClassName,
          s.list,
          themeClassName,
          {
            [s.opened]: isOpened,
          },
          className
        )}
        role="list"
        {...rest}
      >
        {children}
      </ul>
    )
  );
});

List.displayName = 'List';
