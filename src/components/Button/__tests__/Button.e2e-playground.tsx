import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { IconsMap } from '@storybook-utils/constants';

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

export const ButtonDangerPrimarytPlayground = (
  props: ComponentPlaygroundProps<ButtonProps>
) => {
  return (
    <ComponentPlayground<ButtonProps>
      {...props}
      propSets={[defaultPropsSet, iconsPropsSet]}
    >
      {(itemProps: ButtonProps) => (
        <Button {...itemProps} theme={ButtonDangerPrimaryTheme}>
          Button
        </Button>
      )}
    </ComponentPlayground>
  );
};

export const ButtonDangerTertiaryPlayground = (
  props: ComponentPlaygroundProps<ButtonProps>
) => {
  return (
    <ComponentPlayground<ButtonProps>
      {...props}
      propSets={[defaultPropsSet, iconsPropsSet]}
    >
      {(itemProps: ButtonProps) => (
        <Button {...itemProps} theme={ButtonDangerTertiaryTheme}>
          Button
        </Button>
      )}
    </ComponentPlayground>
  );
};

export const ButtonIconPlayground = (
  props: ComponentPlaygroundProps<ButtonProps>
) => {
  return (
    <ComponentPlayground<ButtonProps> {...props} propSets={[defaultPropsSet]}>
      {(itemProps: ButtonProps) => (
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
              <Button key={index} {...itemProps} theme={theme}>
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
    </ComponentPlayground>
  );
};
