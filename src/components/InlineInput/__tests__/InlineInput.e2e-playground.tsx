import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { FOCUSABLE_ELEMENT_ID } from 'src/tests/e2e/constants';

import { InlineInput } from '../InlineInput';
import {
  InlineInputPrimaryTheme,
  InlineInputPrimaryFocusedTheme,
  type InlineInputTheme,
} from '../InlineInput.themes';
import { InlineInputProps } from '../InlineInput.props';

const InlineInputPrimaryFixedWidthTheme: InlineInputTheme = {
  ...InlineInputPrimaryTheme,
  '--crm-ui-kit-inline-input-width': '200px',
};

const InlineInputPrimaryFocusedFixedWidthTheme: InlineInputTheme = {
  ...InlineInputPrimaryFocusedTheme,
  '--crm-ui-kit-inline-input-width': '200px',
};

const basePropsSet = [
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
    value: ['Jhon', undefined],
  },
];

const withFocusPropsSet = [
  {
    value: ['Jhon'],
    id: [FOCUSABLE_ELEMENT_ID],
  },
];

const withFocusInvalidPropsSet = [
  {
    value: ['Jhon'],
    isInvalid: [true],
    invalidDescription: ['Required field'],
    id: [FOCUSABLE_ELEMENT_ID],
  },
];

export const InlineInputPlayground = (
  props: ComponentPlaygroundProps<InlineInputProps>
) => {
  return (
    <ComponentPlayground<InlineInputProps> {...props} propSets={basePropsSet}>
      {(itemProps: InlineInputProps) => (
        <InlineInput {...itemProps} theme={InlineInputPrimaryFixedWidthTheme} />
      )}
    </ComponentPlayground>
  );
};

export const InlineInputPrimaryFocusedPlayground = (
  props: ComponentPlaygroundProps<InlineInputProps>
) => {
  return (
    <ComponentPlayground<InlineInputProps> {...props} propSets={basePropsSet}>
      {(itemProps: InlineInputProps) => (
        <InlineInput
          {...itemProps}
          theme={InlineInputPrimaryFocusedFixedWidthTheme}
        />
      )}
    </ComponentPlayground>
  );
};

export const InlineInputWithFocusPlayground = (
  props: ComponentPlaygroundProps<InlineInputProps>
) => {
  return (
    <ComponentPlayground<InlineInputProps>
      {...props}
      propSets={withFocusPropsSet}
    >
      {(itemProps: InlineInputProps) => (
        <InlineInput {...itemProps} theme={InlineInputPrimaryFixedWidthTheme} />
      )}
    </ComponentPlayground>
  );
};

export const InlineInputInvalidWithFocusPlayground = (
  props: ComponentPlaygroundProps<InlineInputProps>
) => {
  return (
    <ComponentPlayground<InlineInputProps>
      {...props}
      propSets={withFocusInvalidPropsSet}
    >
      {(itemProps: InlineInputProps) => (
        <InlineInput {...itemProps} theme={InlineInputPrimaryFixedWidthTheme} />
      )}
    </ComponentPlayground>
  );
};

export const InlineInputPrimaryFocusedWithFocusPlayground = (
  props: ComponentPlaygroundProps<InlineInputProps>
) => {
  return (
    <ComponentPlayground<InlineInputProps>
      {...props}
      propSets={withFocusPropsSet}
    >
      {(itemProps: InlineInputProps) => (
        <InlineInput
          {...itemProps}
          theme={InlineInputPrimaryFocusedFixedWidthTheme}
        />
      )}
    </ComponentPlayground>
  );
};

// eslint-disable-next-line id-length
export const InlineInputPrimaryFocusedInvalidWithFocusPlayground = (
  props: ComponentPlaygroundProps<InlineInputProps>
) => {
  return (
    <ComponentPlayground<InlineInputProps>
      {...props}
      propSets={withFocusInvalidPropsSet}
    >
      {(itemProps: InlineInputProps) => (
        <InlineInput
          {...itemProps}
          theme={InlineInputPrimaryFocusedFixedWidthTheme}
        />
      )}
    </ComponentPlayground>
  );
};
