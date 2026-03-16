import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { Text, TextPrimaryTheme } from 'src/components/Text';

import { ContentBlock, ContentBlockTheme } from '..';

const USAGE = `
import { Text, TextPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Text';

import {
  ContentBlock,
  ContentBlockTheme,
} from '@kommo-crm/crm-react-ui-kit/ContentBlock';

function App() {
  return (
    <ContentBlock theme={ContentBlockTheme}>
      <Text theme={TextPrimaryTheme} size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam
        ducimus inventore minima optio error unde incidunt atque. Minima,
        maxime?
      </Text>
    </ContentBlock>
  );
}
`;

const meta = {
  title: 'Components/ContentBlock',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: ContentBlock,
  args: {
    theme: ContentBlockTheme,
  },
} satisfies Meta<typeof ContentBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Text theme={TextPrimaryTheme} size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam
        ducimus inventore minima optio error unde incidunt atque. Minima,
        maxime?
      </Text>
    ),
  },
};
