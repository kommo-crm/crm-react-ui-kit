/**
 * Sizes the split of the tabs is searched from, px.
 */
export interface Measurements {
  /**
   * Widths of all tabs with their labels capped at the theme width. The
   * visible tabs grow from them by CSS.
   */
  tabWidths: number[];
  /**
   * Width of the panel, the space for the tabs and the overflow button.
   */
  panelWidth: number;
}
