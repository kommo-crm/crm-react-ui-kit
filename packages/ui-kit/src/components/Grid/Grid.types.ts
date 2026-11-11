/**
 * CSS `display` value of the container.
 */
export type GridDisplay = 'grid' | 'inline-grid' | 'none';

/**
 * Number of equal tracks or any `grid-template-*` value.
 * `'1'`…`'9'` are autocomplete hints, any number works.
 */
export type GridTemplate =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | (string & {});

/**
 * Auto-placement algorithm of the items.
 */
export type GridFlow =
  | 'row'
  | 'column'
  | 'dense'
  | 'row-dense'
  | 'column-dense';

/**
 * Alignment of the items inside their cells along the block axis.
 */
export type GridAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

/**
 * Distribution of the column tracks along the inline axis.
 */
export type GridJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch';

/**
 * Distribution of the row tracks along the block axis.
 */
export type GridAlignContent =
  | 'start'
  | 'center'
  | 'end'
  | 'baseline'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch';

/**
 * Alignment of the items inside their cells along the inline axis.
 */
export type GridJustifyItems =
  | 'start'
  | 'center'
  | 'end'
  | 'baseline'
  | 'stretch';
