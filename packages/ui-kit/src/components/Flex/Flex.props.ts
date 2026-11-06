import React from 'react';

import { type Spacing } from '@ui-kit/lib/spacing';

import {
  type FlexAlign,
  type FlexDirection,
  type FlexDisplay,
  type FlexJustify,
  type FlexWrap,
} from './Flex.types';

interface FlexOwnProps {
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
   * @default flex
   */
  display?: FlexDisplay;
  /**
   * Direction of the main axis (`flex-direction`).
   */
  direction?: FlexDirection;
  /**
   * Alignment of the items along the cross axis (`align-items`).
   */
  align?: FlexAlign;
  /**
   * Distribution of the items along the main axis (`justify-content`).
   * `between` pushes the items to the edges and splits free space equally.
   */
  justify?: FlexJustify;
  /**
   * Wrapping of the items onto multiple lines (`flex-wrap`).
   */
  wrap?: FlexWrap;
  /**
   * Gap between the items on both axes, a key of the spacing scale.
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

interface FlexDivProps
  extends FlexOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof FlexOwnProps> {
  /**
   * Tag to render.
   *
   * @default div
   */
  as?: 'div';
}

interface FlexSpanProps
  extends FlexOwnProps,
    Omit<React.ComponentPropsWithoutRef<'span'>, keyof FlexOwnProps> {
  /**
   * Tag to render.
   */
  as: 'span';
}

export type FlexProps = FlexDivProps | FlexSpanProps;
