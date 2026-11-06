import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { SPACING_SCALE } from '@ui-kit/lib/spacing';

import { type FlexProps } from './Flex.props';
import { type FlexAlign, type FlexJustify } from './Flex.types';

const alignValue: Record<FlexAlign, React.CSSProperties['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  baseline: 'baseline',
  stretch: 'stretch',
};

const justifyValue: Record<FlexJustify, React.CSSProperties['justifyContent']> =
  {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
  };

export const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    as: Tag = 'div',
    asChild = false,
    style,
    children,
    display = 'flex',
    direction,
    align,
    justify,
    wrap,
    gap,
    gapX = gap,
    gapY = gap,
    ...rest
  } = props;

  const Component = asChild ? Slot : Tag;

  const rootStyle: React.CSSProperties = {
    display,
    flexDirection: direction,
    alignItems: align && alignValue[align],
    justifyContent: justify && justifyValue[justify],
    flexWrap: wrap,
    columnGap: gapX && SPACING_SCALE[gapX],
    rowGap: gapY && SPACING_SCALE[gapY],
    ...style,
  };

  return (
    <Component ref={ref} style={rootStyle} {...rest}>
      {children}
    </Component>
  );
});

Flex.displayName = 'Flex';
