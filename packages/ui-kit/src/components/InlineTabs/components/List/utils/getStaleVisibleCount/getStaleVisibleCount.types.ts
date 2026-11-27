/**
 * Parameters of `getStaleVisibleCount`.
 */
export interface GetStaleVisibleCountParams {
  /**
   * Values of the previous tabs the split was searched for, joined.
   */
  tabsKey: string;
  /**
   * How many leading previous tabs the split keeps in the panel.
   */
  visibleCount: number;
  /**
   * Values of the current tabs in display order.
   */
  tabValues: string[];
}
