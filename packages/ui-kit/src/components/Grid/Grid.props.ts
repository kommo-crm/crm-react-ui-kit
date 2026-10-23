import React from 'react';

import { type Spacing } from '@ui-kit/lib/spacing';

import {
  type GridAlign,
  type GridAlignContent,
  type GridDisplay,
  type GridFlow,
  type GridJustify,
  type GridJustifyItems,
  type GridTemplate,
} from './Grid.types';

interface GridOwnProps {
  /**
   * Renders the single child element instead of its own one.
   * Classes, `style`, handlers and `ref` are merged with the child's ones,
   * other props are overridden by the child's, `as` is ignored. `children`
   * must be a single React element.
   *
   * @default false
   */
  asChild?: boolean;
  /**
   * CSS `display` of the container.
   *
   * @default grid
   */
  display?: GridDisplay;
  /**
   * Columns of the grid (`grid-template-columns`).
   * A number creates that many equal columns,
   * any other string is used as is, e.g. `'200px 1fr'`.
   *
   * @default 1
   */
  columns?: GridTemplate;
  /**
   * Rows of the grid (`grid-template-rows`).
   * A number creates that many equal rows,
   * any other string is used as is, e.g. `'auto 1fr'`.
   */
  rows?: GridTemplate;
  /**
   * Named grid areas (`grid-template-areas`),
   * e.g. `'"header header" "sidebar main"'`.
   */
  areas?: string;
  /**
   * Auto-placement algorithm of the items (`grid-auto-flow`).
   */
  flow?: GridFlow;
  /**
   * Alignment of the items inside their cells (`align-items`).
   *
   * @default stretch
   */
  align?: GridAlign;
  /**
   * Distribution of the tracks along the inline axis (`justify-content`).
   * `between` pushes the tracks to the edges and splits free space equally.
   *
   * @default start
   */
  justify?: GridJustify;
  /**
   * Distribution of the row tracks along the block axis (`align-content`)
   * when the grid is shorter than the container. `between`, `around` and
   * `evenly` are `space-between`, `space-around` and `space-evenly`.
   */
  alignContent?: GridAlignContent;
  /**
   * Alignment of the items inside their cells along the inline axis
   * (`justify-items`).
   */
  justifyItems?: GridJustifyItems;
  /**
   * Gap between the tracks on both axes, a key of the spacing scale.
   */
  gap?: Spacing;
  /**
   * Gap between the columns (`column-gap`). Overrides `gap` on this axis.
   */
  gapX?: Spacing;
  /**
   * Gap between the rows (`row-gap`). Overrides `gap` on this axis.
   */
  gapY?: Spacing;
}

interface GridDivProps
  extends GridOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof GridOwnProps> {
  /**
   * Tag to render.
   *
   * @default div
   */
  as?: 'div';
}

interface GridSpanProps
  extends GridOwnProps,
    Omit<React.ComponentPropsWithoutRef<'span'>, keyof GridOwnProps> {
  /**
   * Tag to render.
   */
  as: 'span';
}

export type GridProps = GridDivProps | GridSpanProps;
