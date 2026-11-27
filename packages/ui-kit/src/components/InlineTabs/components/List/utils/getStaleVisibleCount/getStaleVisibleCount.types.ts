/**
 * Parameters of `getStaleVisibleCount`.
 */
export interface GetStaleVisibleCountParams {
  /**
   * Values of the previous tabs the split was searched for, joined with `\n`.
   */
  tabsKey: string;
  /**
   * How many leading previous tabs the split keeps in the panel.
   */
  previousVisibleCount: number;
  /**
   * Values of the current tabs in display order.
   */
  tabValues: string[];
}
