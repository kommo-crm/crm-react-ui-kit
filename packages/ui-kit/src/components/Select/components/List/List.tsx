import React, {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useOnOutsideClick } from '@kommo-crm/react-hooks';

import { Portal } from '@ui-kit/components/Portal';

import {
  DropdownList as BaseList,
  type DropdownListPlacement,
} from '@ui-kit/components/DropdownList';

import { mergeRefs } from '@ui-kit/lib/utils';

import { noop } from '@ui-kit/utils';

import { useSelectContext } from '../../Select.context';

import { SelectItem } from '../../Select.types';

import { ListPortalProps, ListProps } from './List.props';

type L = HTMLUListElement;

const resolveListPlacement = (
  placement: DropdownListPlacement,
  listEl: HTMLUListElement
): DropdownListPlacement => {
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
  const [placement, setPlacement] = useState<DropdownListPlacement>('bottom');

  /**
   * useLayoutEffect is used instead of useEffect to resolve the list placement
   * and focus it before the browser paints. This prevents a visible flicker
   * where the list briefly appears in the wrong position (e.g. bottom) before
   * jumping to the correct one (e.g. top).
   *
   * On open, the effect may run twice when placement needs to change:
   * 1st run — measures the list via getBoundingClientRect and updates placement state.
   * 2nd run — placement is already correct, so the list gets focused.
   *
   * preferBottomFallbackRef guards against an infinite loop when neither
   * placement fits (e.g. not enough space above or below). When the list in
   * "top" placement resolves back to "bottom", we accept "bottom" as the final
   * placement and skip re-resolving on the next run.
   */
  useLayoutEffect(() => {
    if (!isOpened) {
      preferBottomFallbackRef.current = false;
      setPlacement('bottom');

      return;
    }

    const listEl = listRef.current;

    if (!listEl) {
      return;
    }

    if (preferBottomFallbackRef.current) {
      listEl.focus();

      return;
    }

    const nextPlacement = resolveListPlacement(placement, listEl);

    if (nextPlacement === placement) {
      listEl.focus();

      return;
    }

    if (nextPlacement === 'bottom' && placement === 'top') {
      preferBottomFallbackRef.current = true;
    }

    setPlacement(nextPlacement);
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
