import React, { forwardRef } from 'react';
import { Arrow as RadixDropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import type { ArrowProps } from './Arrow.props';

import s from './Arrow.module.css';

const DISPLAY_NAME = 'ContextMenu.Arrow';

export const Arrow = forwardRef<SVGSVGElement, ArrowProps>((props, ref) => {
  const { className, borderClassName, ...rest } = props;

  /**
   * Two arrows are rendered to create a bordered arrow effect.
   *
   * SVG arrows cannot have CSS borders like regular elements, so we layer
   * two arrows:
   *
   * 1. The first arrow (arrow_border) acts as the border/outline - it's
   *    positioned behind and styled with the border color.
   * 2. The second arrow (arrow) is the main fill - it's positioned on top,
   *    slightly offset, revealing the border arrow underneath along the edges.
   */
  return (
    <>
      <RadixDropdownMenuArrow
        className={cx(s.arrow_border, borderClassName)}
        {...rest}
      />
      <RadixDropdownMenuArrow
        className={cx(s.arrow, className)}
        ref={ref}
        {...rest}
      />
    </>
  );
});

Arrow.displayName = DISPLAY_NAME;
