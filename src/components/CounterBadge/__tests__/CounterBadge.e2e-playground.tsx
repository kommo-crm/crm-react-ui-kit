import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { CounterBadge } from '../CounterBadge';
import {
  CounterBadgePrimaryTheme,
  CounterBadgeSmallPrimaryTheme,
} from '../CounterBadge.themes';
import { CounterBadgeProps } from '../CounterBadge.props';

export const CounterBadgePlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CounterBadgeProps>) => (
  <ComponentPlayground<CounterBadgeProps> appearance={appearance} props={props}>
    {(p) => (
      <div style={{ padding: 8 }}>
        <CounterBadge {...p} theme={CounterBadgePrimaryTheme}>
          99+
        </CounterBadge>
      </div>
    )}
  </ComponentPlayground>
);

export const CounterBadgeSmallPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CounterBadgeProps>) => (
  <ComponentPlayground<CounterBadgeProps> appearance={appearance} props={props}>
    {(p) => (
      <div style={{ padding: 8 }}>
        <CounterBadge {...p} theme={CounterBadgeSmallPrimaryTheme}>
          99+
        </CounterBadge>
      </div>
    )}
  </ComponentPlayground>
);
