import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import { Flex, type FlexProps } from '..';

const ITEMS = [
  { height: 24, fontSize: 11 },
  { height: 40, fontSize: 18 },
  { height: 32, fontSize: 15 },
];

const ITEM_STYLE: React.CSSProperties = {
  width: 40,
  background: 'var(--crm-ui-kit-palette-active-element-900)',
  color: 'var(--crm-ui-kit-color-white)',
};

const CONTAINER_STYLE: React.CSSProperties = {
  width: 240,
  height: 120,
  outline: '1px dashed var(--crm-ui-kit-palette-border-default)',
};

const WRAP_CONTAINER_STYLE: React.CSSProperties = {
  width: 240,
  outline: '1px dashed var(--crm-ui-kit-palette-border-default)',
};

const DISPLAY_CONTAINER_STYLE: React.CSSProperties = {
  outline: '1px dashed var(--crm-ui-kit-palette-border-default)',
};

export const FlexPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<FlexProps>) => (
  <ComponentPlayground<FlexProps> appearance={appearance} props={props}>
    {(p) => (
      <Flex {...p} style={CONTAINER_STYLE}>
        {ITEMS.map(({ height, fontSize }, index) => (
          <div key={index} style={{ ...ITEM_STYLE, height, fontSize }}>
            {index + 1}
          </div>
        ))}
      </Flex>
    )}
  </ComponentPlayground>
);

export const FlexDisplayPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<FlexProps>) => (
  <ComponentPlayground<FlexProps> appearance={appearance} props={props}>
    {(p) => (
      <div>
        Before
        <Flex {...p} style={DISPLAY_CONTAINER_STYLE}>
          {ITEMS.map(({ height }, index) => (
            <div key={index} style={{ ...ITEM_STYLE, height }}>
              {index + 1}
            </div>
          ))}
        </Flex>
        After
      </div>
    )}
  </ComponentPlayground>
);

export const FlexWrapPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<FlexProps>) => (
  <ComponentPlayground<FlexProps> appearance={appearance} props={props}>
    {(p) => (
      <Flex {...p} style={WRAP_CONTAINER_STYLE}>
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} style={{ ...ITEM_STYLE, width: 56, height: 24 }}>
            {index + 1}
          </div>
        ))}
      </Flex>
    )}
  </ComponentPlayground>
);
