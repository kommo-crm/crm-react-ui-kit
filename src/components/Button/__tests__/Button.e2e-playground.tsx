import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import MicrophoneIcon from '@storybook-utils/icons/microphone.svg';
import TriggerIcon from '@storybook-utils/icons/trigger.svg';
import TrashcanIcon from '@storybook-utils/icons/trashcan.svg';
import MagicIcon from '@storybook-utils/icons/magic.svg';

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
  ButtonContextTheme,
  ButtonIconContextTheme,
  type ButtonProps,
} from '..';

export const ButtonNeutralPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ButtonProps>) => {
  return (
    <ComponentPlayground<ButtonProps> appearance={appearance} props={props}>
      {(p) => (
        <Button {...p} theme={ButtonNeutralTheme}>
          Button
        </Button>
      )}
    </ComponentPlayground>
  );
};

export const ButtonPrimaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ButtonProps>) => (
  <ComponentPlayground<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonPrimaryTheme}>
        Button
      </Button>
    )}
  </ComponentPlayground>
);

export const ButtonSecondaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ButtonProps>) => (
  <ComponentPlayground<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonSecondaryTheme}>
        Button
      </Button>
    )}
  </ComponentPlayground>
);

export const ButtonDangerPrimaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ButtonProps>) => (
  <ComponentPlayground<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonDangerPrimaryTheme}>
        Button
      </Button>
    )}
  </ComponentPlayground>
);

export const ButtonDangerTertiaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ButtonProps>) => (
  <ComponentPlayground<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonDangerTertiaryTheme}>
        Button
      </Button>
    )}
  </ComponentPlayground>
);

export const ButtonContextPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ButtonProps>) => (
  <ComponentPlayground<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonContextTheme}>
        Button
      </Button>
    )}
  </ComponentPlayground>
);

export const ButtonIconContextPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ButtonProps>) => (
  <ComponentPlayground<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonIconContextTheme}>
        <MagicIcon width={16} height={16} style={{ display: 'flex' }} />
      </Button>
    )}
  </ComponentPlayground>
);

export const ButtonIconSecondaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ButtonProps>) => (
  <ComponentPlayground<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonIconSecondaryTheme}>
        <MicrophoneIcon width={20} height={20} style={{ display: 'flex' }} />
      </Button>
    )}
  </ComponentPlayground>
);

export const ButtonIconGhostPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ButtonProps>) => (
  <ComponentPlayground<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonIconGhostTheme}>
        <TriggerIcon width={20} height={20} style={{ display: 'flex' }} />
      </Button>
    )}
  </ComponentPlayground>
);

export const ButtonIconDangerGhostPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ButtonProps>) => (
  <ComponentPlayground<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonIconDangerGhostTheme}>
        <TrashcanIcon width={20} height={20} style={{ display: 'flex' }} />
      </Button>
    )}
  </ComponentPlayground>
);

export const ButtonIconSmallGhostPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ButtonProps>) => (
  <ComponentPlayground<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonIconSmallGhostTheme}>
        <TriggerIcon width={16} height={16} style={{ display: 'flex' }} />
      </Button>
    )}
  </ComponentPlayground>
);

export const ButtonIconSmallDangerGhostPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ButtonProps>) => (
  <ComponentPlayground<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <Button {...p} theme={ButtonIconSmallDangerGhostTheme}>
        <TrashcanIcon width={16} height={16} style={{ display: 'flex' }} />
      </Button>
    )}
  </ComponentPlayground>
);
