import type React from 'react';

import type { Measurements } from '../../utils';

/**
 * Options for the `useTabsLayout` hook.
 */
export interface UseTabsLayoutOptions {
  /**
   * The panel of the tabs; its width is the space for the tabs.
   */
  panelRef: React.RefObject<HTMLElement>;
  /**
   * Layer with plain copies of all tabs, one child per tab, measured for
   * their widths.
   */
  measureLayerRef: React.RefObject<HTMLElement>;
  /**
   * The overflow button rendered for the current split.
   */
  overflowButtonRef: React.RefObject<HTMLElement>;
  /**
   * Values of the tabs in display order.
   */
  tabValues: string[];
}

/**
 * Split of the tabs between the panel and the overflow menu.
 */
export interface UseTabsLayoutResult {
  /**
   * How many leading tabs stay in the panel.
   */
  visibleCount: number;
  /**
   * Widths of all tabs with their labels capped at the theme width, px. The
   * visible tabs grow from them by CSS.
   */
  tabWidths: number[];
  /**
   * `false` while the split is being searched: the panel shows a candidate
   * that may not be the final one.
   */
  isSettled: boolean;
}

/**
 * State of the split search.
 */
export interface Split {
  /**
   * Values of the tabs the split was searched for, joined.
   */
  tabsKey: string;
  /**
   * Sizes taken when the search started.
   */
  measurements: Measurements;
  /**
   * The candidate rendered now, or the final count once settled.
   */
  visibleCount: number;
  /**
   * Whether the overflow button of the candidate was checked and fits.
   */
  isSettled: boolean;
}
