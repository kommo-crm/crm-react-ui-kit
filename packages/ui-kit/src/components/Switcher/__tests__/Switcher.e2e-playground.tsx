import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { Switcher } from '../Switcher';
import { SwitcherPrimaryTheme } from '../Switcher.themes';
import { SwitcherProps } from '../Switcher.props';

export const SwitcherPlayground = (
  props: ComponentPlaygroundProps<SwitcherProps>
) => {
  return (
    <ComponentPlayground<SwitcherProps>
      {...props}
      propSets={[
        {
          isDisabled: [true, false],
          isDefaultChecked: [true, false],
        },
      ]}
    >
      {(itemProps: SwitcherProps) => (
        <Switcher {...itemProps} theme={SwitcherPrimaryTheme} />
      )}
    </ComponentPlayground>
  );
};
