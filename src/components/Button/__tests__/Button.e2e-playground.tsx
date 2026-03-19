import React from 'react';

import {
  ComponentPlaygroundItem,
  ComponentPlaygroundItemProps,
} from 'src/tests/e2e/ComponentPlaygroundItem';

import MicrophoneIcon from '@storybook-utils/icons/microphone.svg';
import TriggerIcon from '@storybook-utils/icons/trigger.svg';
import TrashcanIcon from '@storybook-utils/icons/trashcan.svg';

import {
  Button,
  ButtonNeutralTheme,
  ButtonPrimaryTheme,
  ButtonSecondaryTheme,
  ButtonDangerPrimaryTheme,
  ButtonDangerTertiaryTheme,
  ButtonIconSecondaryTheme,
  ButtonIconGhostTheme,
  ButtonIconDangerGhostTheme,
  ButtonIconSmallGhostTheme,
  ButtonIconSmallDangerGhostTheme,
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

export const ButtonDangerPrimaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundItemProps<ButtonProps>) => (
  <ComponentPlaygroundItem<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonDangerPrimaryTheme}>
        Button
      </Button>
    )}
  </ComponentPlaygroundItem>
);

export const ButtonDangerTertiaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundItemProps<ButtonProps>) => (
  <ComponentPlaygroundItem<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonDangerTertiaryTheme}>
        Button
      </Button>
    )}
  </ComponentPlaygroundItem>
);

export const ButtonIconSecondaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundItemProps<ButtonProps>) => (
  <ComponentPlaygroundItem<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonIconSecondaryTheme}>
        <MicrophoneIcon width={20} height={20} style={{ display: 'flex' }} />
      </Button>
    )}
  </ComponentPlaygroundItem>
);

export const ButtonIconGhostPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundItemProps<ButtonProps>) => (
  <ComponentPlaygroundItem<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonIconGhostTheme}>
        <TriggerIcon width={20} height={20} style={{ display: 'flex' }} />
      </Button>
    )}
  </ComponentPlaygroundItem>
);

export const ButtonIconDangerGhostPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundItemProps<ButtonProps>) => (
  <ComponentPlaygroundItem<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonIconDangerGhostTheme}>
        <TrashcanIcon width={20} height={20} style={{ display: 'flex' }} />
      </Button>
    )}
  </ComponentPlaygroundItem>
);

export const ButtonIconSmallGhostPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundItemProps<ButtonProps>) => (
  <ComponentPlaygroundItem<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonIconSmallGhostTheme}>
        <TriggerIcon width={16} height={16} style={{ display: 'flex' }} />
      </Button>
    )}
  </ComponentPlaygroundItem>
);

export const ButtonIconSmallDangerGhostPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundItemProps<ButtonProps>) => (
  <ComponentPlaygroundItem<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonIconSmallDangerGhostTheme}>
        <TrashcanIcon width={16} height={16} style={{ display: 'flex' }} />
      </Button>
    )}
  </ComponentPlaygroundItem>
);
