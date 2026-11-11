import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { SPACING_SCALE } from '@ui-kit/lib/spacing';

import { type GridProps } from './Grid.props';
import {
  type GridAlign,
  type GridAlignContent,
  type GridFlow,
  type GridJustify,
  type GridJustifyItems,
  type GridTemplate,
} from './Grid.types';

const flowValue: Record<GridFlow, React.CSSProperties['gridAutoFlow']> = {
  'row': 'row',
  'column': 'column',
  'dense': 'dense',
  'row-dense': 'row dense',
  'column-dense': 'column dense',
};

const alignValue: Record<GridAlign, React.CSSProperties['alignItems']> = {
  start: 'start',
  center: 'center',
  end: 'end',
  baseline: 'baseline',
  stretch: 'stretch',
};

const justifyValue: Record<GridJustify, React.CSSProperties['justifyContent']> =
  {
    start: 'start',
    center: 'center',
    end: 'end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
    stretch: 'stretch',
  };

const alignContentValue: Record<
  GridAlignContent,
  React.CSSProperties['alignContent']
> = {
  start: 'start',
  center: 'center',
  end: 'end',
  baseline: 'baseline',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  stretch: 'stretch',
};

const justifyItemsValue: Record<
  GridJustifyItems,
  React.CSSProperties['justifyItems']
> = {
  start: 'start',
  center: 'center',
  end: 'end',
  baseline: 'baseline',
  stretch: 'stretch',
};

const TRACK_COUNT_REGEXP = /^[1-9]\d*$/;

/**
 * Converts a `columns` / `rows` value to a `grid-template-*` value:
 * a number becomes that many equal tracks, any other string is kept as is.
 *
 * `minmax(0, 1fr)` instead of `1fr`, otherwise a track can't shrink below
 * its content and the tracks stop being equal.
 */
const getGridTemplate = (value: GridTemplate) =>
  TRACK_COUNT_REGEXP.test(value) ? `repeat(${value}, minmax(0, 1fr))` : value;

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const {
    as: Tag = 'div',
    asChild = false,
    style,
    children,
    display = 'grid',
    columns,
    rows,
    areas,
    flow,
    align,
    justify,
    alignContent,
    justifyItems,
    gap,
    gapX = gap,
    gapY = gap,
    ...rest
  } = props;

  const Component = asChild ? Slot : Tag;

  const rootStyle: React.CSSProperties = {
    display,
    gridTemplateColumns: columns && getGridTemplate(columns),
    gridTemplateRows: rows && getGridTemplate(rows),
    gridTemplateAreas: areas,
    gridAutoFlow: flow && flowValue[flow],
    alignItems: align && alignValue[align],
    justifyContent: justify && justifyValue[justify],
    alignContent: alignContent && alignContentValue[alignContent],
    justifyItems: justifyItems && justifyItemsValue[justifyItems],
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

Grid.displayName = 'Grid';
