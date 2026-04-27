import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { action } from '@storybook/addon-actions';

import { CanvasCentered } from '@storybook-utils/constants';

import { Text, TextPrimaryTheme } from 'src/components/Text';

import { Callout } from '..';

import {
  CalloutInfoTheme,
  CalloutSuccessTheme,
  CalloutWarningTheme,
  CalloutErrorTheme,
} from '../Callout.themes';

const themeMap = {
  CalloutInfoTheme,
  CalloutSuccessTheme,
  CalloutWarningTheme,
  CalloutErrorTheme,
};

const USAGE = `
import { Text, TextPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Text';

import { Callout, CalloutInfoTheme } from '@kommo-crm/crm-react-ui-kit/Callout';

function App() {
  const handleClose = () => {
    console.log('close');
  };

  return (
    <Callout theme={CalloutInfoTheme} onClose={handleClose}>
      <Text theme={TextPrimaryTheme} size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam
        ducimus inventore minima optio error unde incidunt atque. Minima,
        maxime?
      </Text>
    </Callout>
  );
}
`;

const meta = {
  title: 'Components/Callout',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: Callout,
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
  },
  args: {
    theme: CalloutInfoTheme,
    children: (
      <Text theme={TextPrimaryTheme} size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam
        ducimus inventore minima optio error unde incidunt atque. Minima,
        maxime?
      </Text>
    ),
    onClose: action('onClose'),
  },
} satisfies Meta<typeof Callout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CalloutInfo: Story = {
  tags: ['!dev'],
  args: { theme: CalloutInfoTheme },
};

export const CalloutSuccess: Story = {
  tags: ['!dev'],
  args: { theme: CalloutSuccessTheme },
};

export const CalloutWarning: Story = {
  tags: ['!dev'],
  args: { theme: CalloutWarningTheme },
};

export const CalloutError: Story = {
  tags: ['!dev'],
  args: { theme: CalloutErrorTheme },
};
