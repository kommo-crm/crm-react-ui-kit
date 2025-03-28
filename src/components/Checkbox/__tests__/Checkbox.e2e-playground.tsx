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

export const CheckboxLightPlayground = (
  props: ComponentPlaygroundProps<CheckboxProps>
) => {
  return (
    <ComponentPlayground<CheckboxProps>
      {...props}
      propSets={[
        {
          isDisabled: [false, true],
          checkedStyle: ['mark', 'indeterminate'],
          isDefaultChecked: [true, false],
        },
        {
          isInvalid: [true],
          isDisabled: [false, true],
          isDefaultChecked: [true, false],
        },
      ]}
    >
      {(itemProps: CheckboxProps) => (
        <div>
          <Checkbox {...itemProps} theme={CheckboxLightTheme} />
        </div>
      )}
    </ComponentPlayground>
  );
};

export const CheckboxSmallLightPlayground = (
  props: ComponentPlaygroundProps<CheckboxProps>
) => {
  return (
    <ComponentPlayground<CheckboxProps>
      {...props}
      propSets={[
        {
          isDisabled: [false, true],
          checkedStyle: ['mark', 'indeterminate'],
          isDefaultChecked: [true, false],
        },
        {
          isInvalid: [true],
          isDisabled: [false, true],
          isDefaultChecked: [true, false],
        },
      ]}
    >
      {(itemProps: CheckboxProps) => (
        <div>
          <Checkbox {...itemProps} theme={CheckboxSmallLightTheme} />
        </div>
      )}
    </ComponentPlayground>
  );
};

export const CheckboxDarkPlayground = (
  props: ComponentPlaygroundProps<CheckboxProps>
) => {
  return (
    <ComponentPlayground<CheckboxProps>
      {...props}
      propSets={[
        {
          isDisabled: [false, true],
          checkedStyle: ['mark', 'indeterminate'],
          isDefaultChecked: [true, false],
        },
        {
          isInvalid: [true],
          isDisabled: [false, true],
          isDefaultChecked: [true, false],
        },
      ]}
    >
      {(itemProps: CheckboxProps) => (
        <div>
          <Checkbox {...itemProps} theme={CheckboxDarkTheme} />
        </div>
      )}
    </ComponentPlayground>
  );
};

export const CheckboxSmallDarkPlayground = (
  props: ComponentPlaygroundProps<CheckboxProps>
) => {
  return (
    <ComponentPlayground<CheckboxProps>
      {...props}
      propSets={[
        {
          isDisabled: [false, true],
          checkedStyle: ['mark', 'indeterminate'],
          isDefaultChecked: [true, false],
        },
        {
          isInvalid: [true],
          isDisabled: [false, true],
          isDefaultChecked: [true, false],
        },
      ]}
    >
      {(itemProps: CheckboxProps) => (
        <div>
          <Checkbox {...itemProps} theme={CheckboxSmallDarkTheme} />
        </div>
      )}
    </ComponentPlayground>
  );
};
