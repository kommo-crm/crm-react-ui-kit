import React, { forwardRef } from 'react';
import { Arrow as RadixTooltipArrow } from '@radix-ui/react-tooltip';
import cx from 'classnames';

import { Arrow as ArrowPrimitive } from '@ui-kit/components/Arrow';

import type { TooltipArrowProps } from './Arrow.props';

import s from './Arrow.module.css';

const DISPLAY_NAME = 'Tooltip.Arrow';

export const Arrow = forwardRef<SVGSVGElement, TooltipArrowProps>(
  (props, ref) => {
    const { className, borderClassName, ...rest } = props;

    return (
      <ArrowPrimitive
        ref={ref}
        as={RadixTooltipArrow}
        width={12}
        height={5}
        className={cx(s.arrow, className)}
        borderClassName={cx(s.arrow_border, borderClassName)}
        {...rest}
      />
    );
  }
);

Arrow.displayName = DISPLAY_NAME;
