import React, {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useOnOutsideClick } from '@kommo-crm/react-hooks';

import { Portal } from 'src/components/Portal';

import { DropdownList as BaseList } from 'src/components/DropdownList';

import { mergeRefs } from 'src/lib/utils';

import { noop } from 'src/utils';

import { useSelectContext } from '../../Select.context';

import { SelectItem } from '../../Select.types';

import { ListPortalProps, ListProps } from './List.props';

type L = HTMLUListElement;

type ListPlacement = 'top' | 'bottom';

const DEFAULT_PLACEMENT: ListPlacement = 'bottom';

const resolveListPlacement = (
  placement: ListPlacement,
  listEl: HTMLUListElement
): ListPlacement => {
  const { top, bottom, height } = listEl.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const overflowsBottom = bottom > viewportHeight;
  const overflowsTop = top < 0;
  const tallerThanViewport = height > viewportHeight;

  if (placement === 'bottom') {
    return overflowsBottom ? 'top' : 'bottom';
  }

  if (overflowsTop || tallerThanViewport) {
    return 'bottom';
  }

  return 'top';
};

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
  const preferBottomFallbackRef = useRef(false);
  const [placement, setPlacement] = useState<ListPlacement>(DEFAULT_PLACEMENT);

  useLayoutEffect(() => {
    if (!isOpened) {
      preferBottomFallbackRef.current = false;
      setPlacement(DEFAULT_PLACEMENT);

      return;
    }

    const listEl = listRef.current;

    if (!listEl || preferBottomFallbackRef.current) {
      return;
    }

    const nextPlacement = resolveListPlacement(placement, listEl);

    if (nextPlacement === placement) {
      return;
    }

    if (nextPlacement === 'bottom' && placement === 'top') {
      preferBottomFallbackRef.current = true;
    }

    setPlacement(nextPlacement);
  }, [isOpened, children, placement]);

  useLayoutEffect(() => {
    if (!isOpened) {
      return;
    }

    listRef.current?.focus({ preventScroll: true });
  }, [isOpened, placement]);

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
