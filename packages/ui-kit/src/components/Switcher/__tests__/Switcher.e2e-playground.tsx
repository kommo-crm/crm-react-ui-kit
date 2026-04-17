import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { Switcher } from '../Switcher';
import { SwitcherPrimaryTheme } from '../Switcher.themes';
import { SwitcherProps } from '../Switcher.props';

export const SwitcherPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<SwitcherProps>) => (
  <ComponentPlayground<SwitcherProps> appearance={appearance} props={props}>
    {(p) => <Switcher {...p} theme={SwitcherPrimaryTheme} />}
  </ComponentPlayground>
);
