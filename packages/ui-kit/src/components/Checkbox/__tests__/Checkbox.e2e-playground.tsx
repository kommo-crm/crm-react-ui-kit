import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import {
  Checkbox,
  CheckboxLightTheme,
  CheckboxSmallLightTheme,
  CheckboxDarkTheme,
  CheckboxSmallDarkTheme,
  type CheckboxProps,
} from '..';

export const CheckboxLightPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CheckboxProps>) => (
  <ComponentPlayground<CheckboxProps> appearance={appearance} props={props}>
    {(p) => (
      <div>
        <Checkbox {...p} theme={CheckboxLightTheme} />
      </div>
    )}
  </ComponentPlayground>
);

export const CheckboxSmallLightPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CheckboxProps>) => (
  <ComponentPlayground<CheckboxProps> appearance={appearance} props={props}>
    {(p) => (
      <div>
        <Checkbox {...p} theme={CheckboxSmallLightTheme} />
      </div>
    )}
  </ComponentPlayground>
);

export const CheckboxDarkPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CheckboxProps>) => (
  <ComponentPlayground<CheckboxProps> appearance={appearance} props={props}>
    {(p) => (
      <div>
        <Checkbox {...p} theme={CheckboxDarkTheme} />
      </div>
    )}
  </ComponentPlayground>
);

export const CheckboxSmallDarkPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<CheckboxProps>) => (
  <ComponentPlayground<CheckboxProps> appearance={appearance} props={props}>
    {(p) => (
      <div>
        <Checkbox {...p} theme={CheckboxSmallDarkTheme} />
      </div>
    )}
  </ComponentPlayground>
);
