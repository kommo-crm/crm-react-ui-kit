import { useLayoutEffect, useReducer, useRef, useState } from 'react';

import { useResizeObserver } from '../../../../hooks';

import type { SliderState, UseSliderOptions } from './useSlider.types';

/**
 * Places the slider under the selected tab, or under the overflow button
 * when the selected tab is in the menu.
 */
export const useSlider = (options: UseSliderOptions): SliderState | null => {
  const {
    panelRef,
    selectedTabRef,
    overflowButtonRef,
    value,
    isSelectedHidden,
    isEnabled,
  } = options;

  const [slider, setSlider] = useState<SliderState | null>(null);
  const prevValueRef = useRef(value);
  const [, rerender] = useReducer((count: number) => count + 1, 0);

  /**
   * The tabs grow by CSS, so a resized panel moves the selected tab without
   * any state change; a re-render puts the slider back under it.
   */
  useResizeObserver({ targets: [panelRef], onResize: rerender });

  /**
   * Runs after every render without deps: the `…` button width changes with
   * the badge, which no layout input reports. State is set only when the box
   * actually moved, so a finished render never clears `animated` mid-transition.
   */
  useLayoutEffect(() => {
    if (!isEnabled) {
      return;
    }

    const isValueChanged = prevValueRef.current !== value;

    prevValueRef.current = value;

    const panel = panelRef.current;
    const target = isSelectedHidden
      ? overflowButtonRef.current
      : selectedTabRef.current;

    if (!target || !panel) {
      setSlider(null);

      return;
    }

    /**
     * Tabs get fractional widths from the flex growth; integer offsets would
     * leave the slider up to a pixel off the tab.
     */
    const panelBox = panel.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    const left = box.left - panelBox.left;
    const width = box.width;

    setSlider((prev) =>
      prev && prev.left === left && prev.width === width
        ? prev
        : { left, width, animated: isValueChanged }
    );
  });

  return slider;
};
