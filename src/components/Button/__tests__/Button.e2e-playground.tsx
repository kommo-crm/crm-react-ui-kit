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

export const buttonIconVariants = [
  { size: 'm', theme: ButtonIconSecondaryTheme, Icon: MicrophoneIcon },
  { size: 'm', theme: ButtonIconGhostTheme, Icon: TriggerIcon },
  { size: 'm', theme: ButtonIconDangerGhostTheme, Icon: TrashcanIcon },
  { size: 's', theme: ButtonIconSmallGhostTheme, Icon: TriggerIcon },
  { size: 's', theme: ButtonIconSmallDangerGhostTheme, Icon: TrashcanIcon },
];

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

export const ButtonIconPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundItemProps<ButtonProps>) => (
  <ComponentPlaygroundItem<ButtonProps> appearance={appearance} props={props}>
    {(p) => (
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        {buttonIconVariants.map(({ size, theme, Icon }, index) => {
          const iconSize = size === 'm' ? 20 : 16;

          return (
            <Button key={index} {...p} theme={theme}>
              <Icon
                width={iconSize}
                height={iconSize}
                style={{ display: 'flex' }}
              />
            </Button>
          );
        })}
      </div>
    )}
  </ComponentPlaygroundItem>
);
