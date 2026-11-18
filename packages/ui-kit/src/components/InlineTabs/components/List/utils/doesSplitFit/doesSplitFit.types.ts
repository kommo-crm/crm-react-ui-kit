import type { Measurements } from '../measurements.types';

/**
 * Parameters of `doesSplitFit`.
 */
export interface DoesSplitFitParams {
  /**
   * Sizes of the tabs and the panel.
   */
  measurements: Measurements;
  /**
   * How many leading tabs stay in the panel.
   */
  visibleCount: number;
  /**
   * Width of the overflow button rendered for this split, px.
   */
  overflowWidth: number;
}
