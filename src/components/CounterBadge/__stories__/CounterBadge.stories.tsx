import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import {
  CounterBadge,
  CounterBadgePrimaryTheme,
  CounterBadgeSmallPrimaryTheme,
} from '..';

const USAGE = `
import {
  CounterBadge,
  CounterBadgePrimaryTheme,
} from '@kommo-crm/crm-react-ui-kit/CounterBadge';

function App() {
  return <CounterBadge theme={CounterBadgePrimaryTheme}>99+</CounterBadge>;
}
`;

const meta = {
  title: 'Components/CounterBadge',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: CounterBadge,
  args: {
    theme: CounterBadgePrimaryTheme,
    children: '99+',
  },
} satisfies Meta<typeof CounterBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CounterBadgePrimary: Story = {
  tags: ['!dev'],
  args: { theme: CounterBadgePrimaryTheme },
};

export const CounterBadgeSmallPrimary: Story = {
  tags: ['!dev'],
  args: { theme: CounterBadgeSmallPrimaryTheme },
};
