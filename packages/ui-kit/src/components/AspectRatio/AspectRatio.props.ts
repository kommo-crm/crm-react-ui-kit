import React from 'react';
import { type AspectRatioProps as RadixAspectRatioProps } from '@radix-ui/react-aspect-ratio';

export interface AspectRatioProps
  extends Omit<RadixAspectRatioProps, 'children'> {
  /**
   * Width to height ratio, e.g. `16 / 9`. Must be a positive finite
   * number, otherwise the default is used.
   *
   * @default 1
   */
  ratio?: RadixAspectRatioProps['ratio'];
  /**
   * Renders the single child element as the content element instead of
   * its own one. Classes, `style`, handlers and `ref` are merged with
   * the child's ones. `children` must be a single React element.
   * `ref` is typed as `HTMLDivElement` but points to the child element,
   * e.g. `HTMLImageElement` for `<img>`.
   *
   * @default false
   */
  asChild?: RadixAspectRatioProps['asChild'];
  /**
   * Content stretched to the block. With `asChild` — a single React element
   * that becomes the content element.
   */
  children: React.ReactNode;
}
