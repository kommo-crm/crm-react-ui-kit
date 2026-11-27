import type { Split } from '../../hooks/useTabsLayout/useTabsLayout.types';

/**
 * Parameters of `getStaleVisibleCount`.
 */
export interface GetStaleVisibleCountParams {
  /**
   * The split searched for the previous tabs.
   */
  split: Split;
  /**
   * Values of the current tabs in display order.
   */
  tabValues: string[];
}
