import React, {
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import cx from 'classnames';

import {
  useKeyboardListNavigation,
  useOnOutsideClick,
} from '@kommo-crm/react-hooks';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { CustomScrollClassName } from 'src/stylesheets/utils/BaseClasses';

import { Portal } from 'src/components/Portal';

import { mergeRefs } from 'src/lib/utils';

import { noop } from 'src/utils';

import { useSelectContext } from '../../Select.context';

import { SelectItem } from '../../Select.types';

import { ListPortalProps, ListProps } from './List.props';
import { ListThemeType } from './List.theme';

import s from './List.module.css';

type L = HTMLUListElement;

const DISPLAY_NAME = 'Select.List';

const ListPortal = (props: ListPortalProps) => {
  const { container, children } = props;

  return container ? (
    <Portal container={container}>{children}</Portal>
  ) : (
    children
  );
};

export const List = forwardRef<L, ListProps>((props, ref) => {
  const { container, children, theme, className = '' } = props;

  const themeClassName = useThemeClassName<ListThemeType>(theme);

  const {
    isOpened,
    onOpen,
    onHoveredIndexChange,
    onChange = noop,
    hoveredIndex,
    value,
  } = useSelectContext(DISPLAY_NAME);

  const { items, itemsMap } = useMemo(() => {
    const map: Record<string, number> = {};

    const itemsChildren = React.Children.toArray(children).map(
      (child, index) => {
        if (React.isValidElement(child)) {
          map[child.props.item.value] = index;

          return { ...child.props.item };
        }

        return {};
      }
    ) as SelectItem[];

    return { items: itemsChildren, itemsMap: map };
  }, [children]);

  const listRef = useRef<HTMLUListElement>(null);

  const handleOutsideClick = useCallback(() => {
    if (isOpened) {
      onOpen(false);
    }
  }, [isOpened]);

  useOnOutsideClick({
    ref: listRef,
    handler: handleOutsideClick,
  });

  const handleHoveredIndexChange = (index: number) => {
    onHoveredIndexChange(index);
  };

  const handleListToggle = useCallback(
    (toggle: boolean) => {
      onOpen(toggle);
    },
    [onOpen]
  );

  const handleItemSelect = useCallback(
    (index: number) => {
      onChange(items[index]);
    },
    [onChange, items]
  );

  const resolvedHoveredIndex = value ? itemsMap[value.value] : hoveredIndex;

  const { onKeyDown } = useKeyboardListNavigation({
    itemsLength: React.Children.toArray(children).length,
    onSelect: handleItemSelect,
    onToggle: handleListToggle,
    isOpened,
    listRef: listRef as MutableRefObject<HTMLUListElement>,
    hoveredIndex: resolvedHoveredIndex,
    onHoveredIndexChange: handleHoveredIndexChange,
  });

  useEffect(() => {
    /**
     * When opening the list, we transfer focus to it.
     */
    if (isOpened) {
      listRef.current?.focus();
    }
  }, [isOpened]);

  if (!isOpened) {
    return null;
  }

  return (
    <ListPortal container={container}>
      <ul
        ref={mergeRefs(listRef, ref)}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className={cx(
          CustomScrollClassName,
          s.list,
          s.opened,
          themeClassName,
          className
        )}
        role="list"
      >
        {children}
      </ul>
    </ListPortal>
  );
});

List.displayName = DISPLAY_NAME;
