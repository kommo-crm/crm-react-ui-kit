import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import {
  Separator,
  SeparatorRoundedTheme,
  SeparatorSquareTheme,
  type SeparatorProps,
} from '..';

const HORIZONTAL_WRAPPER_STYLE: React.CSSProperties = {
  width: 240,
  display: 'flex',
  margin: '10px',
};

const VERTICAL_WRAPPER_STYLE: React.CSSProperties = {
  height: 80,
  display: 'flex',
  margin: '10px',
};

const getWrapperStyle = (orientation: SeparatorProps['orientation']) =>
  orientation === 'vertical'
    ? VERTICAL_WRAPPER_STYLE
    : HORIZONTAL_WRAPPER_STYLE;

export const SeparatorRoundedPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<SeparatorProps>) => (
  <ComponentPlayground<SeparatorProps> appearance={appearance} props={props}>
    {(p) => (
      <div style={getWrapperStyle(p.orientation)}>
        <Separator {...p} theme={SeparatorRoundedTheme} />
      </div>
    )}
  </ComponentPlayground>
);

export const SeparatorSquarePlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<SeparatorProps>) => (
  <ComponentPlayground<SeparatorProps> appearance={appearance} props={props}>
    {(p) => (
      <div style={getWrapperStyle(p.orientation)}>
        <Separator {...p} theme={SeparatorSquareTheme} />
      </div>
    )}
  </ComponentPlayground>
);
