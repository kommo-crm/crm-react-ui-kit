import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@/tests/e2e/ComponentPlayground';

import { Spinner } from '../Spinner';
import { SpinnerPrimaryTheme } from '../Spinner.themes';
import { SpinnerProps } from '../Spinner.props';

export const SpinnerPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<SpinnerProps>) => (
  <ComponentPlayground<SpinnerProps> appearance={appearance} props={props}>
    {(p) => (
      <div style={{ position: 'relative', height: 20 }}>
        <Spinner {...p} theme={SpinnerPrimaryTheme} />
      </div>
    )}
  </ComponentPlayground>
);
