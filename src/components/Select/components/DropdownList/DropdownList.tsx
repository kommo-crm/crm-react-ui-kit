import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { useOnOutsideClick } from '@kommo-crm/react-hooks';

import { Portal } from 'src/components/Portal';

import { List as BaseList } from 'src/components/Select/components/List';

import { mergeRefs } from 'src/lib/utils';

import { noop } from 'src/utils';

import { useSelectContext } from '../../Select.context';

import { SelectItem } from '../../Select.types';

import {
  DropdownListPortalProps,
  DropdownListProps,
} from './DropdownList.props';

type L = HTMLUListElement;

const DISPLAY_NAME = 'Select.DropdownList';

const DropdownListPortal = (props: DropdownListPortalProps) => {
  const { container, children } = props;

  return container ? (
    <Portal container={container}>{children}</Portal>
  ) : (
    children
  );
};

export const DropdownList = forwardRef<L, DropdownListProps>((props, ref) => {
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

  useEffect(() => {
    /**
     * When opening the list, we transfer focus to it.
     */
    if (isOpened) {
      listRef.current?.focus();
    }
  }, [isOpened]);

  return (
    <DropdownListPortal container={container}>
      <BaseList
        className={className}
        ref={mergeRefs(listRef, ref)}
        isOpened={isOpened}
        theme={theme}
        onHoveredIndexChange={handleHoveredIndexChange}
        onToggle={handleListToggle}
        onSelect={handleItemSelect}
        hoveredIndex={value ? itemsMap[value.value] : hoveredIndex}
      >
        {children}
      </BaseList>
    </DropdownListPortal>
  );
});

DropdownList.displayName = DISPLAY_NAME;
