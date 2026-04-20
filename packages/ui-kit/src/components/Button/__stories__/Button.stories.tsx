import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useGlobals } from '@storybook/preview-api';

import { CanvasCentered, IconsMap } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import MicrophoneIcon from '@storybook-utils/icons/microphone.svg';
import TriggerIcon from '@storybook-utils/icons/trigger.svg';
import TrashcanIcon from '@storybook-utils/icons/trashcan.svg';

import { Appearance } from 'src/lib/appearance';
import { noop } from 'src/utils';

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
} from '..';

const ThemesMap = {
  ButtonNeutralTheme,
  ButtonPrimaryTheme,
  ButtonSecondaryTheme,
  ButtonDangerPrimaryTheme,
  ButtonDangerTertiaryTheme,
};

const USAGE = `
import { Button, ButtonPrimaryTheme } from "@kommo-crm/crm-react-ui-kit/Button";

function App() {
  return (
    <Button theme={ButtonPrimaryTheme}>${i18n.t('Go to Dashboard')}</Button>
  );
}
`;

const meta = {
  title: 'Components/Button',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: Button,
  args: {
    children: i18n.t('Go to Dashboard'),
    theme: ThemesMap.ButtonPrimaryTheme,
  },
  argTypes: {
    theme: { table: { disable: true } },
    before: {
      control: 'select',
      mapping: IconsMap,
      options: Object.keys(IconsMap),
    },
    after: {
      control: 'select',
      mapping: IconsMap,
      options: Object.keys(IconsMap),
    },
    showSuccessfulStateRef: { table: { disable: true } },
    showInvalidAnimationRef: { table: { disable: true } },
  },
  render: (props) => (
    <div>
      {(Object.keys(ThemesMap) as Array<keyof typeof ThemesMap>).map((key) => (
        <Button key={key} {...props} theme={ThemesMap[key]} />
      ))}
    </div>
  ),
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Icons: Story = {
  args: {
    before: IconsMap.CopyIcon,
    after: IconsMap.CalendarIcon,
  },
};

export const Refs: Story = {
  args: {
    successfulStateText: i18n.t('Saved'),
  },
  argTypes: {
    theme: {
      table: { disable: false },
      control: 'select',
      mapping: ThemesMap,
      options: Object.keys(ThemesMap),
    },
    successfulStateText: {
      control: 'text',
    },
  },
  render: (props) => {
    const [{ appearance }] = useGlobals();
    const labelColor =
      appearance === Appearance.ALTERNATIVE ? 'white' : 'black';

    const successRef = useRef(noop);
    const invalidRef = useRef(noop);

    const handleSuccessClick = () => {
      if (successRef) {
        successRef?.current();
      }
    };

    const handleInvalidClick = () => {
      if (invalidRef.current) {
        invalidRef.current();
      }
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ color: labelColor }}>{i18n.t('Success Ref')}</div>
          <Button
            {...props}
            onClick={handleSuccessClick}
            showSuccessfulStateRef={successRef}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ color: labelColor }}>{i18n.t('Invalid Ref')}</div>
          <Button
            {...props}
            showInvalidAnimationRef={invalidRef}
            onClick={handleInvalidClick}
          />
        </div>
      </div>
    );
  },
};

const buttonIconVariants = [
  { size: 'm', theme: ButtonIconSecondaryTheme, Icon: MicrophoneIcon },
  { size: 'm', theme: ButtonIconGhostTheme, Icon: TriggerIcon },
  { size: 'm', theme: ButtonIconDangerGhostTheme, Icon: TrashcanIcon },
  { size: 's', theme: ButtonIconSmallGhostTheme, Icon: TriggerIcon },
  { size: 's', theme: ButtonIconSmallDangerGhostTheme, Icon: TrashcanIcon },
];

export const ButtonIcon: Story = {
  render: (props) => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      {buttonIconVariants.map(({ size, theme, Icon }, index) => {
        const iconSize = size === 'm' ? 20 : 16;

        return (
          <Button key={index} {...props} theme={theme}>
            <Icon
              width={iconSize}
              height={iconSize}
              style={{ display: 'flex' }}
            />
          </Button>
        );
      })}
    </div>
  ),
};

export const ButtonNeutral: Story = {
  tags: ['!dev'],
  args: { theme: ButtonNeutralTheme },
  render: (props) => <Button {...props} />,
};

export const ButtonPrimary: Story = {
  tags: ['!dev'],
  args: { theme: ButtonPrimaryTheme },
  render: (props) => <Button {...props} />,
};

export const ButtonSecondary: Story = {
  tags: ['!dev'],
  args: { theme: ButtonSecondaryTheme },
  render: (props) => <Button {...props} />,
};

export const ButtonDangerPrimary: Story = {
  tags: ['!dev'],
  args: { theme: ButtonDangerPrimaryTheme },
  render: (props) => <Button {...props} />,
};

export const ButtonDangerTertiary: Story = {
  tags: ['!dev'],
  args: { theme: ButtonDangerTertiaryTheme },
  render: (props) => <Button {...props} />,
};

export const ButtonIconSecondary: Story = {
  tags: ['!dev'],
  render: (props) => {
    const { theme, Icon } = buttonIconVariants[0];

    return (
      <Button {...props} theme={theme}>
        <Icon width={20} height={20} style={{ display: 'flex' }} />
      </Button>
    );
  },
};

export const ButtonIconGhost: Story = {
  tags: ['!dev'],
  render: (props) => {
    const { theme, Icon } = buttonIconVariants[1];

    return (
      <Button {...props} theme={theme}>
        <Icon width={20} height={20} style={{ display: 'flex' }} />
      </Button>
    );
  },
};

export const ButtonIconDangerGhost: Story = {
  tags: ['!dev'],
  render: (props) => {
    const { theme, Icon } = buttonIconVariants[2];

    return (
      <Button {...props} theme={theme}>
        <Icon width={20} height={20} style={{ display: 'flex' }} />
      </Button>
    );
  },
};

export const ButtonIconSmallGhost: Story = {
  tags: ['!dev'],
  render: (props) => {
    const { theme, Icon } = buttonIconVariants[3];

    return (
      <Button {...props} theme={theme}>
        <Icon width={16} height={16} style={{ display: 'flex' }} />
      </Button>
    );
  },
};

export const ButtonIconSmallDangerGhost: Story = {
  tags: ['!dev'],
  render: (props) => {
    const { theme, Icon } = buttonIconVariants[4];

    return (
      <Button {...props} theme={theme}>
        <Icon width={16} height={16} style={{ display: 'flex' }} />
      </Button>
    );
  },
};
