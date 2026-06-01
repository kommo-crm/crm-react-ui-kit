import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import {
  Separator,
  SeparatorRoundedLightTheme,
  SeparatorSquaredLightTheme,
  SeparatorRoundedDarkTheme,
  SeparatorSquaredDarkTheme,
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

export const SeparatorRoundedLightPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<SeparatorProps>) => (
  <ComponentPlayground<SeparatorProps> appearance={appearance} props={props}>
    {(p) => (
      <div style={getWrapperStyle(p.orientation)}>
        <Separator {...p} theme={SeparatorRoundedLightTheme} />
      </div>
    )}
  </ComponentPlayground>
);

export const SeparatorSquaredLightPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<SeparatorProps>) => (
  <ComponentPlayground<SeparatorProps> appearance={appearance} props={props}>
    {(p) => (
      <div style={getWrapperStyle(p.orientation)}>
        <Separator {...p} theme={SeparatorSquaredLightTheme} />
      </div>
    )}
  </ComponentPlayground>
);

export const SeparatorRoundedDarkPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<SeparatorProps>) => (
  <ComponentPlayground<SeparatorProps> appearance={appearance} props={props}>
    {(p) => (
      <div style={getWrapperStyle(p.orientation)}>
        <Separator {...p} theme={SeparatorRoundedDarkTheme} />
      </div>
    )}
  </ComponentPlayground>
);

export const SeparatorSquaredDarkPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<SeparatorProps>) => (
  <ComponentPlayground<SeparatorProps> appearance={appearance} props={props}>
    {(p) => (
      <div style={getWrapperStyle(p.orientation)}>
        <Separator {...p} theme={SeparatorSquaredDarkTheme} />
      </div>
    )}
  </ComponentPlayground>
);
