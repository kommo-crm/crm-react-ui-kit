import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { Spinner } from '../Spinner';
import { SpinnerPrimaryTheme } from '../Spinner.themes';
import { SpinnerProps } from '../Spinner.props';

export const SpinnerPlayground = (
  props: ComponentPlaygroundProps<SpinnerProps>
) => {
  return (
    <ComponentPlayground<SpinnerProps>
      {...props}
      propSets={[
        {
          isCentered: [true, false],
        },
      ]}
    >
      {(itemProps: SpinnerProps) => (
        <div style={{ position: 'relative', height: 20 }}>
          <Spinner {...itemProps} theme={SpinnerPrimaryTheme} />
        </div>
      )}
    </ComponentPlayground>
  );
};
