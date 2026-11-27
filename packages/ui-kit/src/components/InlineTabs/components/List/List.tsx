import React, {
  createRef,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { List as RadixTabsList } from '@radix-ui/react-tabs';
import cx from 'classnames';

import { mergeRefs } from '@ui-kit/lib/utils';

import { InlineTabsContext } from '../../InlineTabs.context';
import { OverflowTab } from '../OverflowTab';

import { useTabsLayout } from './hooks/useTabsLayout';
import { useSlider } from './hooks/useSlider';

import { parseListChildren } from './utils';

import { MeasureLayer } from './components/MeasureLayer';
import { PanelTab } from './components/PanelTab';

import { type ListProps } from './List.props';
import { ListOverflowProvider } from './List.context';

import s from './List.module.css';

type El = HTMLDivElement;

export const List = forwardRef<El, ListProps>((props, ref) => {
  const { className, children, overflowButtonAriaLabel, onKeyDown, ...rest } =
    props;

  const { value } = useContext(InlineTabsContext);

  const { tabs, listChildren } = parseListChildren(children);

  const listRef = useRef<El>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLButtonElement>(null);
  const mergedRef = useMemo(() => mergeRefs(listRef, ref), [ref]);

  const tabCount = tabs.length;
  const measureTabRefs = useMemo(
    () => Array.from({ length: tabCount }, () => createRef<HTMLDivElement>()),
    [tabCount]
  );

  const { visibleCount, tabWidths, isSettled } = useTabsLayout({
    panelRef: listRef,
    measureLayerRef: measureRef,
    measureTabRefs,
    overflowButtonRef: overflowRef,
    tabValues: tabs.map((tab) => tab.props.value),
  });

  const selectedTabRef = useRef<HTMLElement | null>(null);

  /**
   * A callback ref: the Radix trigger types its ref as a button, while the
   * element under it is the tab div.
   */
  const setSelectedTab = useCallback((node: HTMLElement | null) => {
    selectedTabRef.current = node;
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuOpen = useCallback((isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  }, []);

  /**
   * A menu item resets the refs inside its tab on unmount; a new key remounts
   * the panel tab to attach them back.
   */
  const [menuGenerations, setMenuGenerations] = useState<
    Record<string, number>
  >({});
  const handleMenuItemUnmount = useCallback((tabValue: string) => {
    setMenuGenerations((generations) => ({
      ...generations,
      [tabValue]: (generations[tabValue] ?? 0) + 1,
    }));
  }, []);

  /**
   * The tab is a div, so Space would scroll the page: Radix selects the tab on
   * it but leaves the default action to the native button it expects. The
   * default is prevented here, after the event bubbles from the tab, because
   * Radix skips its own handler for an already prevented event.
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<El>) => {
      onKeyDown?.(event);

      const target = event.target as HTMLElement;

      if (event.key === ' ' && target.getAttribute('role') === 'tab') {
        event.preventDefault();
      }
    },
    [onKeyDown]
  );

  const isFocusLostRef = useRef(false);

  /**
   * A tab that moves to the menu gets `hidden`, and Chrome drops focus from
   * its trigger to body in the middle of the commit, often before the overflow
   * button is inserted. A native listener: React ignores events dispatched
   * during its commit, so `onBlur` never sees this blur. Without the button
   * yet, the loss is left for the layout effect below.
   */
  useEffect(() => {
    const list = listRef.current;

    if (!list) {
      return undefined;
    }

    const handleFocusOut = (event: FocusEvent) => {
      const { target, relatedTarget } = event;

      if (
        !(target instanceof HTMLElement) ||
        target.getAttribute('role') !== 'tab' ||
        !target.hidden ||
        relatedTarget
      ) {
        return;
      }

      if (overflowRef.current?.isConnected) {
        overflowRef.current.focus();
      } else {
        isFocusLostRef.current = true;
      }
    };

    list.addEventListener('focusout', handleFocusOut);

    return () => {
      list.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  /**
   * Runs in the list, after the overflow button of the commit is attached.
   * Browsers that keep focus on a hidden element give no blur, so the focused
   * hidden tab is checked too.
   */
  useLayoutEffect(() => {
    const activeElement = document.activeElement;

    const isOnHiddenTab =
      activeElement instanceof HTMLElement &&
      activeElement.hidden &&
      Boolean(listRef.current?.contains(activeElement));
    const isLostToBody =
      isFocusLostRef.current &&
      (!activeElement || activeElement === document.body);

    isFocusLostRef.current = false;

    if (isOnHiddenTab || isLostToBody) {
      overflowRef.current?.focus();
    }
  }, [visibleCount]);

  const hiddenTabs = tabs.slice(visibleCount);

  /** The menu unmounts with the overflow button without reporting onOpen(false). */
  if (isMenuOpen && hiddenTabs.length === 0) {
    setIsMenuOpen(false);
  }

  const slider = useSlider({
    panelRef: listRef,
    selectedTabRef,
    overflowButtonRef: overflowRef,
    value,
    isSelectedHidden: hiddenTabs.some((tab) => tab.props.value === value),
    isEnabled: isSettled,
  });

  return (
    <RadixTabsList
      ref={mergedRef}
      className={cx(s.list, className)}
      {...rest}
      onKeyDown={handleKeyDown}
    >
      <MeasureLayer ref={measureRef} tabs={tabs} tabRefs={measureTabRefs} />

      <ListOverflowProvider
        hiddenTabs={hiddenTabs}
        overflowRef={overflowRef}
        overflowButtonAriaLabel={overflowButtonAriaLabel}
        onOpenChange={handleMenuOpen}
        onMenuItemUnmount={handleMenuItemUnmount}
      >
        {listChildren.map((child) => {
          if (child.kind === 'tab') {
            const { tab, tabIndex } = child;

            return (
              <PanelTab
                key={`tab:${tab.props.value}:${menuGenerations[tab.props.value] ?? 0}`}
                tab={tab}
                width={tabWidths[tabIndex]}
                isHidden={tabIndex >= visibleCount}
                tabRef={tab.props.value === value ? setSelectedTab : undefined}
              />
            );
          }

          return <React.Fragment key={child.key}>{child.node}</React.Fragment>;
        })}

        <OverflowTab />
      </ListOverflowProvider>

      {slider && !isMenuOpen && (
        <span
          className={s.slider}
          data-inline-tabs-slider=""
          data-animated={slider.animated ? '' : undefined}
          style={{ left: slider.left, width: slider.width }}
          aria-hidden
        />
      )}
    </RadixTabsList>
  );
});

List.displayName = 'InlineTabs.List';
