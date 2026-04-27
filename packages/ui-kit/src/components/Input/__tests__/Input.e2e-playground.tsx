import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import SpinnerIcon from 'src/icons/spinner.svg';
import SettingsIcon from 'src/icons/settings.svg';
import {
  Button,
  ButtonNeutralTheme,
  ButtonPrimaryTheme,
} from 'src/components/Button';

import { Input } from '../Input';
import {
  InputLightTheme,
  InputDarkTheme,
  type InputTheme,
} from '../Input.themes';

const InputLightFixedWidthTheme: InputTheme = {
  ...InputLightTheme,
  '--crm-ui-kit-input-width': '200px',
};

const InputDarkFixedWidthTheme: InputTheme = {
  ...InputDarkTheme,
  '--crm-ui-kit-input-width': '200px',
};

const addonsMap: Record<string, React.ReactNode> = {
  NeutralButton: <Button theme={ButtonNeutralTheme}>Button</Button>,
  SpinnerIcon: <SpinnerIcon width={16} height={16} />,
  SettingsIcon: <SettingsIcon width={16} height={16} />,
  PrimaryButton: <Button theme={ButtonPrimaryTheme}>Button</Button>,
};

export interface InputTestProps {
  value?: string;
  isDisabled?: boolean;
  placeholder?: string;
  isInvalid?: boolean;
  invalidDescription?: string;
  invalidDescriptionPlacement?: 'bottom' | 'right';
  before?: string;
  after?: string;
}

export const InputLightPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<InputTestProps>) => (
  <ComponentPlayground<InputTestProps> appearance={appearance} props={props}>
    {({ before, after, ...restProps }) => (
      <Input
        {...restProps}
        before={before ? addonsMap[before] : undefined}
        after={after ? addonsMap[after] : undefined}
        theme={InputLightFixedWidthTheme}
      />
    )}
  </ComponentPlayground>
);

export const InputDarkPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<InputTestProps>) => (
  <ComponentPlayground<InputTestProps> appearance={appearance} props={props}>
    {({ before, after, ...restProps }) => (
      <Input
        {...restProps}
        before={before ? addonsMap[before] : undefined}
        after={after ? addonsMap[after] : undefined}
        theme={InputDarkFixedWidthTheme}
      />
    )}
  </ComponentPlayground>
);
