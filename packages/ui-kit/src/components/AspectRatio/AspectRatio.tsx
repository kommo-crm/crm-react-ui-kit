import React, { forwardRef } from 'react';
import { Root as RadixAspectRatioRoot } from '@radix-ui/react-aspect-ratio';

import { type AspectRatioProps } from './AspectRatio.props';

const DEFAULT_RATIO = 1;

/**
 * Keeps the given width to height ratio. Renders a sizing wrapper and
 * the content element inside it: all props, including `ref`, go to the
 * content element.
 *
 * The wrapper always takes the full parent width and isn't accessible from
 * the outside, so set the width, `max-width` and `margin` on the parent.
 */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  (props, ref) => {
    const { ratio = DEFAULT_RATIO, ...rest } = props;

    const safeRatio =
      Number.isFinite(ratio) && ratio > 0 ? ratio : DEFAULT_RATIO;

    return <RadixAspectRatioRoot ref={ref} ratio={safeRatio} {...rest} />;
  }
);

AspectRatio.displayName = 'AspectRatio';
