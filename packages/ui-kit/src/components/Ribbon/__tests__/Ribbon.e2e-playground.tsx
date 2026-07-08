import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import { Ribbon } from '../Ribbon';
import { RibbonPrimaryTheme } from '../Ribbon.themes';
import { type RibbonProps } from '../Ribbon.props';

const sampleContent = (
  <p style={{ margin: 0, fontSize: 15, lineHeight: '20px', color: '#000' }}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consequuntur
    nam non vero voluptate reiciendis aliquid magnam aut laudantium aspernatur.
  </p>
);

const cardStyle: React.CSSProperties = {
  width: 300,
  padding: 16,
  background: '#fff',
  border: '1px solid #e0e0e0',
  borderRadius: 4,
};

export const RibbonStandalonePlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<RibbonProps>) => (
  <ComponentPlayground<RibbonProps> appearance={appearance} props={props}>
    {(p) => (
      <div style={{ ...cardStyle, position: 'relative' }}>
        <Ribbon {...p} label="Pro" theme={RibbonPrimaryTheme} />

        {sampleContent}
      </div>
    )}
  </ComponentPlayground>
);

export const RibbonWithChildrenPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<RibbonProps>) => (
  <ComponentPlayground<RibbonProps> appearance={appearance} props={props}>
    {(p) => (
      <Ribbon {...p} label="Pro" theme={RibbonPrimaryTheme}>
        <div style={cardStyle}>{sampleContent}</div>
      </Ribbon>
    )}
  </ComponentPlayground>
);
