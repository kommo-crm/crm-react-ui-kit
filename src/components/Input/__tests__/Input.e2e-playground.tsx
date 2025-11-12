import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { IconsMap } from '@storybook-utils/constants';

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

const propsSets: ComponentPlaygroundProps<InputProps>['propSets'] = [
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
  {
    value: ['Jhon', undefined],
    before: [IconsMap.CopyIcon],
    after: [IconsMap.SettingsIcon],
  },
];

export const InputPlayground = (
  props: ComponentPlaygroundProps<InputProps>
) => {
  return (
    <ComponentPlayground<InputProps> {...props} propSets={propsSets}>
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
    <ComponentPlayground<InputProps> {...props} propSets={propsSets}>
      {(itemProps: InputProps) => (
        <Input {...itemProps} theme={InputDarkFixedWidthTheme} />
      )}
    </ComponentPlayground>
  );
};
