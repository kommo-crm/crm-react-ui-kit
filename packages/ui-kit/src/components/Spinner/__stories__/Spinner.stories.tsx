import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { Spinner, SpinnerPrimaryTheme } from '..';

const USAGE = `
import {
  Spinner,
  SpinnerPrimaryTheme,
} from '@kommo-crm/crm-react-ui-kit/Spinner';

function App() {
  return <Spinner theme={SpinnerPrimaryTheme} />;
}
`;

const meta = {
  title: 'Components/Spinner',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: Spinner,
  args: {
    theme: SpinnerPrimaryTheme,
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Centered: Story = {
  args: {
    isCentered: true,
  },
};
