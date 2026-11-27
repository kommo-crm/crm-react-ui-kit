import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { useResizeObserver } from '../../../../hooks';
import {
  doesSplitFit,
  getFirstCandidate,
  getStaleVisibleCount,
  toPx,
  type Measurements,
} from '../../utils';

import type {
  Split,
  UseTabsLayoutOptions,
  UseTabsLayoutResult,
} from './useTabsLayout.types';

/**
 * Before the first measure the panel shows every tab.
 */
const NOT_MEASURED: UseTabsLayoutResult = {
  visibleCount: Infinity,
  tabWidths: [],
  isSettled: false,
};

/**
 * Fractional width: rounded sizes would add up to a sum that is off by up to
 * a pixel per tab.
 */
const getWidth = (element: Element) => element.getBoundingClientRect().width;

/**
 * The box minus padding and border: computed `width` depends on
 * `box-sizing`, and `clientWidth` is rounded.
 */
const getContentWidth = (element: Element) => {
  const style = getComputedStyle(element);

  return (
    getWidth(element) -
    toPx(style.paddingLeft) -
    toPx(style.paddingRight) -
    toPx(style.borderLeftWidth) -
    toPx(style.borderRightWidth)
  );
};

const measure = (panel: Element, measureLayer: Element): Measurements => ({
  tabWidths: Array.from(measureLayer.children).map(getWidth),
  panelWidth: getContentWidth(panel),
});

/**
 * Splits the tabs into visible ones and the overflow menu.
 *
 * The overflow button content depends on the hidden tabs, so its width is
 * known only for a rendered split. The search starts from the first
 * candidate and renders one tab less until the real button of the candidate
 * fits. Every search starts anew, so the result depends only on the current
 * sizes and never loops.
 */
export const useTabsLayout = (
  options: UseTabsLayoutOptions
): UseTabsLayoutResult => {
  const {
    panelRef,
    measureLayerRef,
    measureTabRefs,
    overflowButtonRef,
    tabValues,
  } = options;

  const tabsKey = tabValues.join('\n');

  const [split, setSplit] = useState<Split | null>(null);

  /**
   * The search starts from the resize observer too, which needs a stable
   * callback.
   */
  const tabsKeyRef = useRef(tabsKey);

  tabsKeyRef.current = tabsKey;

  const startSearch = useCallback(() => {
    const panel = panelRef.current;
    const measureLayer = measureLayerRef.current;

    if (!panel || !measureLayer) {
      return;
    }

    const measurements = measure(panel, measureLayer);
    const visibleCount = getFirstCandidate(measurements);

    setSplit({
      tabsKey: tabsKeyRef.current,
      measurements,
      visibleCount,
      isSettled: visibleCount === measurements.tabWidths.length,
    });
  }, [panelRef, measureLayerRef]);

  /**
   * Layout effect: every candidate is checked before the browser paints, so
   * only the final split is ever shown.
   */
  useLayoutEffect(() => {
    if (!split || split.isSettled) {
      return;
    }

    const { measurements, visibleCount } = split;
    const overflowButton = overflowButtonRef.current;

    const overflowWidth = overflowButton ? getWidth(overflowButton) : 0;

    const isFound =
      visibleCount === 0 ||
      doesSplitFit({ measurements, visibleCount, overflowWidth });

    setSplit(
      isFound
        ? { ...split, isSettled: true }
        : { ...split, visibleCount: visibleCount - 1 }
    );
  }, [split, overflowButtonRef]);

  useLayoutEffect(startSearch, [startSearch, tabsKey]);

  /**
   * The copies catch size changes inside the tabs (fonts, counters, new
   * labels), even when they keep the layer width; the button catches its
   * badge. Each starts a new search, and the final button keeps the size it
   * had, so the observer stays quiet.
   */
  useResizeObserver({
    targets: [panelRef, measureLayerRef, ...measureTabRefs, overflowButtonRef],
    onResize: startSearch,
  });

  if (!split) {
    return NOT_MEASURED;
  }

  /**
   * The measure layer is read after the new tabs are committed, so a render
   * can bring tabs the split was not searched for yet; it must not be taken
   * as final.
   */
  const isStale = split.tabsKey !== tabsKey;

  return {
    visibleCount: isStale
      ? getStaleVisibleCount({
          tabsKey: split.tabsKey,
          previousVisibleCount: split.visibleCount,
          tabValues,
        })
      : split.visibleCount,
    tabWidths: split.measurements.tabWidths,
    isSettled: split.isSettled && !isStale,
  };
};
