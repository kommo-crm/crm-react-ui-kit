import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import { Grid, type GridProps } from '..';

const ITEMS = [
  { height: 24, fontSize: 11 },
  { height: 40, fontSize: 18 },
  { height: 32, fontSize: 15 },
  { height: 32, fontSize: 15 },
  { height: 24, fontSize: 11 },
  { height: 40, fontSize: 18 },
];

const ITEM_STYLE: React.CSSProperties = {
  minWidth: 0,
  boxShadow: 'inset 0 0 0 1px var(--crm-ui-kit-palette-background-default)',
  background: 'var(--crm-ui-kit-palette-active-element-900)',
  color: 'var(--crm-ui-kit-color-white)',
};

const CONTAINER_STYLE: React.CSSProperties = {
  width: 240,
  height: 120,
  outline: '1px dashed var(--crm-ui-kit-palette-border-default)',
};

const DISPLAY_CONTAINER_STYLE: React.CSSProperties = {
  outline: '1px dashed var(--crm-ui-kit-palette-border-default)',
};

export const GridPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<GridProps>) => (
  <ComponentPlayground<GridProps> appearance={appearance} props={props}>
    {(p) => (
      <Grid {...p} style={CONTAINER_STYLE}>
        {ITEMS.map(({ height, fontSize }, index) => (
          <div
            key={index}
            style={{ ...ITEM_STYLE, minHeight: height, fontSize }}
          >
            {index + 1}
          </div>
        ))}
      </Grid>
    )}
  </ComponentPlayground>
);

export const GridDisplayPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<GridProps>) => (
  <ComponentPlayground<GridProps> appearance={appearance} props={props}>
    {(p) => (
      <div>
        Before
        <Grid {...p} style={DISPLAY_CONTAINER_STYLE}>
          {ITEMS.map(({ height }, index) => (
            <div key={index} style={{ ...ITEM_STYLE, minHeight: height }}>
              {index + 1}
            </div>
          ))}
        </Grid>
        After
      </div>
    )}
  </ComponentPlayground>
);

/**
 * The third item spans two tracks, so sparse and dense flows
 * leave and fill a hole differently.
 */
export const GridFlowPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<GridProps>) => (
  <ComponentPlayground<GridProps> appearance={appearance} props={props}>
    {(p) => {
      const isColumnFlow = p.flow === 'column' || p.flow === 'column-dense';

      return (
        <Grid {...p} style={CONTAINER_STYLE}>
          {ITEMS.map((_, index) => (
            <div
              key={index}
              style={{
                ...ITEM_STYLE,
                ...(index === 2 && {
                  [isColumnFlow ? 'gridRow' : 'gridColumn']: 'span 2',
                }),
              }}
            >
              {index + 1}
            </div>
          ))}
        </Grid>
      );
    }}
  </ComponentPlayground>
);
