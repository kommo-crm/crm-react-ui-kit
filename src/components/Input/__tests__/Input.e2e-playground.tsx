import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { Input } from '../Input';
import {
  InputLightTheme,
  InputDarkTheme,
  type InputTheme,
} from '../Input.themes';
import { InputProps } from '../Input.props';

const InputLightFixedWidthTheme: InputTheme = {
  ...InputLightTheme,
  '--crm-ui-kit-input-width': '200px',
};

const InputDarkFixedWidthTheme: InputTheme = {
  ...InputDarkTheme,
  '--crm-ui-kit-input-width': '200px',
};

export const InputPlayground = (
  props: ComponentPlaygroundProps<InputProps>
) => {
  return (
    <ComponentPlayground<InputProps>
      {...props}
      propSets={[
        {
          value: ['Jhon', undefined],
          isDisabled: [true, false],
        },
        {
          value: ['Jhon', undefined],
          isDisabled: [true, false],
          placeholder: ['Placeholder'],
        },
        {
          isInvalid: [true],
          invalidDescription: ['Required field'],
          invalidDescriptionPlacement: ['bottom', 'right'],
          value: ['Jhon', undefined],
        },
      ]}
    >
      {(itemProps: InputProps) => (
        <Input {...itemProps} theme={InputLightFixedWidthTheme} />
      )}
    </ComponentPlayground>
  );
};

export const InputDarkPlayground = (
  props: ComponentPlaygroundProps<InputProps>
) => {
  return (
    <ComponentPlayground<InputProps>
      {...props}
      propSets={[
        {
          value: ['Jhon', undefined],
          isDisabled: [true, false],
        },
        {
          value: ['Jhon', undefined],
          isDisabled: [true, false],
          placeholder: ['Placeholder'],
        },
        {
          isInvalid: [true],
          invalidDescription: ['Required field'],
          invalidDescriptionPlacement: ['bottom', 'right'],
          value: ['Jhon', undefined],
        },
      ]}
    >
      {(itemProps: InputProps) => (
        <Input {...itemProps} theme={InputDarkFixedWidthTheme} />
      )}
    </ComponentPlayground>
  );
};
