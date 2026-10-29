import React from 'react';

import { type ScrollAreaThemeType } from './ScrollArea.themes';

export interface ScrollAreaVisibilityState {
  /**
   * Content is clipped at the top: the area is scrolled away from the start.
   */
  isContentClippedAtTop: boolean;
  /**
   * Content is clipped at the bottom: the area is not scrolled to the end.
   */
  isContentClippedAtBottom: boolean;
}

type NativeViewportAttributes = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'dir'
>;

export interface ScrollAreaProps extends NativeViewportAttributes {
  /**
   * Object with CSS theme properties.
   */
  theme: ScrollAreaThemeType;
  /**
   * When the scrollbar is visible:
   * `auto` - always, while the content overflows the area,
   * `scroll` - only while scrolling and `scrollHideDelay` after it,
   * `hover` - while the pointer is over the area and the content overflows it,
   * and `scrollHideDelay` after the pointer leaves,
   * `always` - always, even when the content fits the area.
   * @default auto
   */
  type?: 'auto' | 'scroll' | 'hover' | 'always';
  /**
   * Delay in ms before the scrollbar hides after scrolling stops
   * or the pointer leaves the area.
   *
   * Used with `type: 'scroll'` and `type: 'hover'`.
   * @default 600
   */
  scrollHideDelay?: number;
  /**
   * The area scrolls without a visible scrollbar.
   * @default false
   */
  isScrollbarHidden?: boolean;
  /**
   * Shows shadows at the edges beyond which there is more content.
   * @default false
   */
  isFadeEnabled?: boolean;
  /**
   * Called when the content becomes clipped or unclipped at the top or bottom.
   */
  onScrollVisibilityChange?: (state: ScrollAreaVisibilityState) => void;
  /**
   * Class of the root element. Sets the size of the area: `height` or `max-height`.
   */
  className?: string;
  /**
   * Style of the root element.
   */
  style?: React.CSSProperties;
  /**
   * Content of the area.
   */
  children: React.ReactNode;
}
