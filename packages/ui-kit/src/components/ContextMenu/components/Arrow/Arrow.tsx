import React, { forwardRef } from 'react';
import { Arrow as RadixDropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import cx from 'classnames';

import { Arrow as ArrowPrimitive } from '@ui-kit/components/Arrow';

import type { ArrowProps } from './Arrow.props';

import s from './Arrow.module.css';

const DISPLAY_NAME = 'ContextMenu.Arrow';

export const Arrow = forwardRef<SVGSVGElement, ArrowProps>((props, ref) => {
  const { className, borderClassName, ...rest } = props;

  return (
    <ArrowPrimitive
      ref={ref}
      as={RadixDropdownMenuArrow}
      className={cx(s.arrow, className)}
      borderClassName={cx(s.arrow_border, borderClassName)}
      {...rest}
    />
  );
});

Arrow.displayName = DISPLAY_NAME;
