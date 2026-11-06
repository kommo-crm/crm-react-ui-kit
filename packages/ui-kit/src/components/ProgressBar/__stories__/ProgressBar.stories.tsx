import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import {
  ContentBlock,
  ContentBlockSecondaryTheme,
} from '@ui-kit/components/ContentBlock';

import { ProgressBar, ProgressBarPrimaryTheme } from '..';

const themeMap = {
  ProgressBarPrimaryTheme,
};

const USAGE = `
import { ContentBlock, ContentBlockSecondaryTheme } from '@kommo-crm/crm-react-ui-kit/ContentBlock';
import { ProgressBar, ProgressBarPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/ProgressBar';

function App() {
  return (
    <ContentBlock style={{ width: 300 }} theme={ContentBlockSecondaryTheme}>
      <ProgressBar.Root
        theme={ProgressBarPrimaryTheme}
        value={42}
        aria-label="Progress"
      >
        <ProgressBar.Indicator />
      </ProgressBar.Root>
    </ContentBlock>
  );
}
`;

const meta = {
  title: 'Components/ProgressBar',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: { code: USAGE, language: 'jsx' },
    },
  },
  component: ProgressBar.Root,
  decorators: [
    (Story) => (
      <ContentBlock style={{ width: 300 }} theme={ContentBlockSecondaryTheme}>
        <Story />
      </ContentBlock>
    ),
  ],
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
    value: {
      control: { type: 'range', min: 0, max: 200, step: 1 },
    },
    max: {
      control: { type: 'range', min: 1, max: 200, step: 1 },
    },
    getValueLabel: { control: false },
    children: { table: { disable: true } },
    asChild: { control: false },
  },
  args: {
    theme: ProgressBarPrimaryTheme,
    value: 42,
    max: 100,
  },
  render: (props) => (
    <ProgressBar.Root aria-label="Progress" {...props}>
      <ProgressBar.Indicator />
    </ProgressBar.Root>
  ),
} satisfies Meta<typeof ProgressBar.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ProgressBarPrimary: Story = {
  tags: ['!dev'],
  args: { theme: ProgressBarPrimaryTheme },
};
