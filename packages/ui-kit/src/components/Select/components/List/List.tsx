import React, {
  forwardRef,
  KeyboardEvent,
  ReactElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import { useOnOutsideClick } from '@kommo-crm/react-hooks';
import {
  measureElement,
  observeElementRect,
  useVirtualizer,
  type Virtualizer,
} from '@tanstack/react-virtual';

import { Portal } from '@ui-kit/components/Portal';

import { DropdownList as BaseList } from '@ui-kit/components/DropdownList';

import { type ScrollAreaVisibilityState } from '@ui-kit/components/ScrollArea';

import { Spinner, SpinnerPrimaryTheme } from '@ui-kit/components/Spinner';

import { mergeRefs } from '@ui-kit/lib/utils';

import { noop } from '@ui-kit/utils';

import { useSelectContext } from '../../Select.context';

import { ItemProps } from '../Item/Item.props';

import { isSelectPrevented } from '../Item/utils';

import { useListPosition } from './hooks';

import { getNextIndex } from './utils';

import { ListProvider } from './List.context';

import { ListPortalProps, ListProps } from './List.props';

import s from './List.module.css';

type L = HTMLUListElement;

const DISPLAY_NAME = 'Select.List';

/**
 * Height of a regular item. Items of another height are measured once rendered.
 */
const ITEM_ESTIMATED_HEIGHT = 34;

/**
 * Items rendered beyond the visible area on each side, so a fast scroll
 * does not show empty space.
 */
const OVERSCAN = 5;

/**
 * The default list max-height. Until the viewport is measured, the first render
 * already has enough items to fill the list, so its placement is resolved
 * from the full height.
 */
const INITIAL_VIEWPORT_HEIGHT = 300;

/**
 * Keeps the list out of sight until it is positioned, like Radix popper
 * content does. Unlike `visibility: hidden`, it stays accessible.
 */
const OFFSCREEN_TRANSFORM = 'translate(0, -200%)';

type ListVirtualizer = Virtualizer<HTMLDivElement, Element>;

/**
 * Without layout (jsdom in consumers' tests) elements have no height.
 * A zero-height viewport makes the virtualizer render no items at all,
 * so it falls back to the default list height.
 */
const observeViewportRect = (
  instance: ListVirtualizer,
  cb: (rect: { width: number; height: number }) => void
) =>
  observeElementRect(instance, (rect) =>
    cb(rect.height ? rect : { ...rect, height: INITIAL_VIEWPORT_HEIGHT })
  );

/**
 * Zero-height items would make the virtualizer render the next ones
 * after each measurement up to the whole list, so they keep the estimate.
 */
const measureItem = (
  element: Element,
  entry: ResizeObserverEntry | undefined,
  instance: ListVirtualizer
) => measureElement(element, entry, instance) || ITEM_ESTIMATED_HEIGHT;

const ListPortal = (props: ListPortalProps) => {
  const { container, children } = props;

  return container ? (
    <Portal container={container}>{children}</Portal>
  ) : (
    children
  );
};

export const List = forwardRef<L, ListProps>((props, ref) => {
  const {
    container,
    children,
    theme,
    className,
    isLoading = false,
    onScrollEnd,
    ...rest
  } = props;

  const {
    isOpened,
    onOpen,
    onHoveredIndexChange,
    onChange = noop,
    hoveredIndex,
    value,
    anchorElement,
  } = useSelectContext(DISPLAY_NAME);

  const { itemElements, items, itemsMap } = useMemo(() => {
    const elements = React.Children.toArray(children).filter(
      React.isValidElement
    ) as ReactElement<ItemProps>[];

    const map: Record<string, number> = {};

    const itemsChildren = elements.map((element, index) => {
      map[element.props.item.value] = index;

      return element.props.item;
    });

    return { itemElements: elements, items: itemsChildren, itemsMap: map };
  }, [children]);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  /**
   * Whether the end of the list is visible, tracked while `onScrollEnd` is set.
   */
  const isScrolledToEndRef = useRef(false);

  const getItemKey = useCallback(
    (index: number) => itemElements[index]?.key ?? index,
    [itemElements]
  );

  const virtualizer = useVirtualizer({
    count: itemElements.length,
    getScrollElement: () => viewportRef.current,
    estimateSize: () => ITEM_ESTIMATED_HEIGHT,
    getItemKey,
    overscan: OVERSCAN,
    initialRect: { width: 0, height: INITIAL_VIEWPORT_HEIGHT },
    observeElementRect: observeViewportRect,
    measureElement: measureItem,
  });

  const {
    setListElement,
    listStyle: positionStyle,
    isPositioned,
  } = useListPosition({
    isOpened,
    anchorElement,
  });

  /**
   * A new merged callback on every render would make React detach
   * and reattach the list box, restarting its positioning.
   */
  const containerMergedRef = useMemo(
    () => mergeRefs<HTMLDivElement>(containerRef, setListElement),
    [setListElement]
  );

  useLayoutEffect(() => {
    /**
     * The list may still be offscreen until it is positioned,
     * so focusing it must not scroll the page.
     */
    if (isOpened) {
      listRef.current?.focus({ preventScroll: true });
    }
  }, [isOpened]);

  const handleOutsideClick = useCallback(() => {
    if (isOpened) {
      onOpen(false);
    }
  }, [isOpened, onOpen]);

  useOnOutsideClick({
    ref: containerRef,
    handler: handleOutsideClick,
  });

  useLayoutEffect(() => {
    if (!isOpened) {
      return;
    }

    const selectedIndex = value ? (itemsMap[value.value] ?? -1) : -1;

    onHoveredIndexChange(selectedIndex);

    if (selectedIndex >= 0) {
      virtualizer.scrollToIndex(selectedIndex, { align: 'center' });
    }
  }, [isOpened]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;

    /**
     * The spinner is added below the last item: keep it in sight
     * when the loading starts at the end of the list.
     */
    if (isLoading && isScrolledToEndRef.current && viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [isLoading]);

  const handleScrollVisibilityChange = (state: ScrollAreaVisibilityState) => {
    isScrolledToEndRef.current = !state.isContentClippedAtBottom;

    if (isScrolledToEndRef.current && !isLoading) {
      onScrollEnd?.();
    }
  };

  const hoverItem = (index: number) => {
    onHoveredIndexChange(index);
    virtualizer.scrollToIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<L>) => {
    rest.onKeyDown?.(e);

    if (e.key === 'Escape') {
      onOpen(false);

      return;
    }

    /**
     * Keys typed into inputs and buttons inside an item belong to them.
     */
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':

      case 'ArrowUp': {
        e.preventDefault();

        const nextIndex = getNextIndex(
          hoveredIndex,
          e.key === 'ArrowDown' ? 1 : -1,
          items.length
        );

        if (nextIndex >= 0) {
          hoverItem(nextIndex);
        }

        break;
      }

      case 'Enter':
      case ' ':
        e.preventDefault();

        if (
          hoveredIndex >= 0 &&
          hoveredIndex < items.length &&
          !isSelectPrevented(itemElements[hoveredIndex].props.onSelect)
        ) {
          onChange(items[hoveredIndex]);
        }

        break;
      default:
        break;
    }
  };

  const listContextValue = useMemo(
    () => ({ measureItem: virtualizer.measureElement }),
    [virtualizer]
  );

  const virtualItems = virtualizer.getVirtualItems();
  const firstVirtualItem = virtualItems[0];
  const lastVirtualItem = virtualItems[virtualItems.length - 1];

  /**
   * Paddings stand for the items that are not rendered,
   * so the scroll height stays the same as with all of them.
   */
  const listStyle = {
    ...rest.style,
    paddingTop: firstVirtualItem?.start ?? 0,
    paddingBottom: lastVirtualItem
      ? virtualizer.getTotalSize() - lastVirtualItem.end
      : 0,
  };

  return (
    <ListPortal container={container}>
      <BaseList
        className={className}
        ref={containerMergedRef}
        style={
          isPositioned
            ? positionStyle
            : { ...positionStyle, transform: OFFSCREEN_TRANSFORM }
        }
        viewportRef={viewportRef}
        isOpened={isOpened}
        theme={theme}
        onScrollVisibilityChange={
          onScrollEnd ? handleScrollVisibilityChange : undefined
        }
      >
        <ListProvider value={listContextValue}>
          <ul
            role="list"
            tabIndex={0}
            {...rest}
            ref={mergeRefs(listRef, ref)}
            className={s.list}
            style={listStyle}
            onKeyDown={handleKeyDown}
          >
            {virtualItems.map(({ index }) => itemElements[index])}
          </ul>
        </ListProvider>

        {isLoading && (
          <div className={s.loader}>
            <Spinner theme={SpinnerPrimaryTheme} />
          </div>
        )}
      </BaseList>
    </ListPortal>
  );
});

List.displayName = DISPLAY_NAME;
