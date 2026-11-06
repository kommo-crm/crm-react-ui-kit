import React from 'react';

import { type SkeletonTheme } from './Skeleton.themes';

interface SkeletonOwnProps {
  /**
   * Shows the placeholder over `children`. When `false`, the wrapper stays
   * in place with its size and `children` are shown as is.
   *
   * @default true
   */
  isLoading?: boolean;
  /**
   * Wrapper width, any CSS length, e.g. `120px` or `50%`.
   */
  width?: string;
  /**
   * Minimum wrapper width, any CSS length.
   */
  minWidth?: string;
  /**
   * Maximum wrapper width, any CSS length.
   */
  maxWidth?: string;
  /**
   * Wrapper height, any CSS length, e.g. `16px` or `1rem`.
   */
  height?: string;
  /**
   * Minimum wrapper height, any CSS length.
   */
  minHeight?: string;
  /**
   * Maximum wrapper height, any CSS length.
   */
  maxHeight?: string;
  /**
   * Content inside the wrapper. While loading it keeps taking up space in
   * the wrapper and is hidden from view, assistive technologies and Tab
   * navigation, but stays mounted and is not disabled: Enter in another
   * field of the form still submits it through a submit button inside,
   * and an outside `<label for>` still toggles a control inside. Disable
   * such controls while loading if this matters. Without `children` the
   * placeholder is sized by `width`, `height` or `className`.
   */
  children?: React.ReactNode;
  /**
   * Object with CSS properties of the theme.
   */
  theme: SkeletonTheme;
}

interface SkeletonDivProps
  extends SkeletonOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof SkeletonOwnProps> {
  /**
   * Wrapper tag: `div` is a block, `span` is an inline block. Use `span`
   * inside phrasing content, e.g. in a `p`.
   *
   * @default 'div'
   */
  as?: 'div';
}

interface SkeletonSpanProps
  extends SkeletonOwnProps,
    Omit<React.ComponentPropsWithoutRef<'span'>, keyof SkeletonOwnProps> {
  /**
   * Wrapper tag: `div` is a block, `span` is an inline block. Use `span`
   * inside phrasing content, e.g. in a `p`.
   */
  as: 'span';
}

export type SkeletonProps = SkeletonDivProps | SkeletonSpanProps;
