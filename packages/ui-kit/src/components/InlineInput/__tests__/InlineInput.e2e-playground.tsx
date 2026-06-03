import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { InlineInput } from '../InlineInput';
import {
  InlineInputPrimaryTheme,
  InlineInputPrimaryFocusedTheme,
  type InlineInputTheme,
} from '../InlineInput.themes';

const InlineInputPrimaryFixedWidthTheme: InlineInputTheme = {
  ...InlineInputPrimaryTheme,
  '--crm-ui-kit-inline-input-width': '200px',
};

const InlineInputPrimaryFocusedFixedWidthTheme: InlineInputTheme = {
  ...InlineInputPrimaryFocusedTheme,
  '--crm-ui-kit-inline-input-width': '200px',
};

export type InlineInputVariant = 'primary' | 'primaryFocused';

const themeMap: Record<InlineInputVariant, InlineInputTheme> = {
  primary: InlineInputPrimaryFixedWidthTheme,
  primaryFocused: InlineInputPrimaryFocusedFixedWidthTheme,
};

export interface InlineInputTestProps {
  variant: InlineInputVariant;
  value?: string;
  isDisabled?: boolean;
  placeholder?: string;
  isInvalid?: boolean;
  invalidDescription?: string;
  id?: string;
}

export const InlineInputPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<InlineInputTestProps>) => (
  <ComponentPlayground<InlineInputTestProps>
    appearance={appearance}
    props={props}
  >
    {({ variant, ...restProps }) => (
      <InlineInput {...restProps} theme={themeMap[variant]} />
    )}
  </ComponentPlayground>
);
