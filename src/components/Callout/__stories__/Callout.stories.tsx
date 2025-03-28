import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { Text, TextPrimaryTheme } from 'src/components/Text';

import { Callout } from '..';

import { CalloutErrorTheme } from '../themes/CalloutError.theme';
import { CalloutInfoTheme } from '../themes/CalloutInfo.theme';
import { CalloutSuccessTheme } from '../themes/CalloutSuccess.theme';
import { CalloutWarningTheme } from '../themes/CalloutWarning.theme';

const themeMap = {
  CalloutErrorTheme,
  CalloutInfoTheme,
  CalloutSuccessTheme,
  CalloutWarningTheme,
};

const USAGE = `
import { Text, TextPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Text';

import { Callout, CalloutErrorTheme } from '@kommo-crm/crm-react-ui-kit/Callout';

function App() {
  return (
    <Callout theme={CalloutErrorTheme}>
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
    theme: CalloutErrorTheme,
    children: (
      <Text theme={TextPrimaryTheme} size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam
        ducimus inventore minima optio error unde incidunt atque. Minima,
        maxime?
      </Text>
    ),
  },
} satisfies Meta<typeof Callout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CalloutError: Story = {
  tags: ['!dev'],
  args: { theme: CalloutErrorTheme },
};

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
