import React, { forwardRef, useCallback, useMemo, useRef } from 'react';

import { useOnOutsideClick } from '@kommo-crm/react-hooks';

import { Portal } from '@ui-kit/components/Portal';

import { DropdownList as BaseList } from '@ui-kit/components/DropdownList';

import { mergeRefs } from '@ui-kit/lib/utils';

import { noop } from '@ui-kit/utils';

import { useSelectContext } from '../../Select.context';

import { SelectItem } from '../../Select.types';

import { useListPlacement } from './hooks';

import { ListPortalProps, ListProps } from './List.props';

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
  const { container, children, theme, className } = props;

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

  const placement = useListPlacement({ isOpened, listRef });

  const handleOutsideClick = useCallback(() => {
    if (isOpened) {
      onOpen(false);
    }
  }, [isOpened, onOpen]);

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

  return (
    <ListPortal container={container}>
      <BaseList
        className={className}
        ref={mergeRefs(listRef, ref)}
        isOpened={isOpened}
        placement={placement}
        theme={theme}
        onHoveredIndexChange={handleHoveredIndexChange}
        onToggle={handleListToggle}
        onSelect={handleItemSelect}
        hoveredIndex={value ? itemsMap[value.value] : hoveredIndex}
      >
        {children}
      </BaseList>
    </ListPortal>
  );
});

List.displayName = DISPLAY_NAME;
