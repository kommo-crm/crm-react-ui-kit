import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { IconsMap } from '@storybook-utils/constants';

import {
  Button,
  ButtonNeutralTheme,
  ButtonPrimaryTheme,
  ButtonSecondaryTheme,
  type ButtonProps,
} from '..';

const defaultPropsSet = {
  isLoading: [true, false],
  isDisabled: [true, false],
};

const iconsPropsSet = {
  before: [IconsMap.CalendarIcon, undefined],
  after: [IconsMap.CopyIcon, undefined],
};

export const ButtonNeutralPlayground = (
  props: ComponentPlaygroundProps<ButtonProps>
) => {
  return (
    <ComponentPlayground<ButtonProps>
      {...props}
      propSets={[defaultPropsSet, iconsPropsSet]}
    >
      {(itemProps: ButtonProps) => (
        <Button {...itemProps} theme={ButtonNeutralTheme}>
          Button
        </Button>
      )}
    </ComponentPlayground>
  );
};

export const ButtonPrimaryPlayground = (
  props: ComponentPlaygroundProps<ButtonProps>
) => {
  return (
    <ComponentPlayground<ButtonProps>
      {...props}
      propSets={[defaultPropsSet, iconsPropsSet]}
    >
      {(itemProps: ButtonProps) => (
        <Button {...itemProps} theme={ButtonPrimaryTheme}>
          Button
        </Button>
      )}
    </ComponentPlayground>
  );
};

export const ButtonSecondaryPlayground = (
  props: ComponentPlaygroundProps<ButtonProps>
) => {
  return (
    <ComponentPlayground<ButtonProps>
      {...props}
      propSets={[defaultPropsSet, iconsPropsSet]}
    >
      {(itemProps: ButtonProps) => (
        <Button {...itemProps} theme={ButtonSecondaryTheme}>
          Button
        </Button>
      )}
    </ComponentPlayground>
  );
};
