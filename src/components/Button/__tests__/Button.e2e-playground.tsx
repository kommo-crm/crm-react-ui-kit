import React from 'react';

import {
  ComponentPlaygroundItem,
  ComponentPlaygroundItemProps,
} from 'src/tests/e2e/ComponentPlaygroundItem';

import {
  Button,
  ButtonNeutralTheme,
  ButtonPrimaryTheme,
  ButtonSecondaryTheme,
  type ButtonProps,
} from '..';

export const ButtonNeutralPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundItemProps<ButtonProps>) => {
  return (
    <ComponentPlaygroundItem<ButtonProps> appearance={appearance} props={props}>
      {(p) => (
        <Button {...p} theme={ButtonNeutralTheme}>
          Button
        </Button>
      )}
    </ComponentPlaygroundItem>
  );
};

export const ButtonPrimaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundItemProps<ButtonProps>) => (
  <ComponentPlaygroundItem<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonPrimaryTheme}>
        Button
      </Button>
    )}
  </ComponentPlaygroundItem>
);

export const ButtonSecondaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundItemProps<ButtonProps>) => (
  <ComponentPlaygroundItem<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonSecondaryTheme}>
        Button
      </Button>
    )}
  </ComponentPlaygroundItem>
);
