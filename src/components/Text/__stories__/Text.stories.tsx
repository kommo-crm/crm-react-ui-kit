import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import {
  type TextSizes,
  Text,
  TextErrorTheme,
  TextPrimaryTheme,
  TextSecondaryDarkTheme,
  TextSecondaryLightTheme,
} from '..';

const sizes: TextSizes[] = ['s', 'm', 'ms', 'l', 'xl'];

const themeMap = {
  TextPrimaryTheme,
  TextSecondaryDarkTheme,
  TextSecondaryLightTheme,
  TextErrorTheme,
};

const USAGE = `
import { Text, TextPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Text';

function App() {
  return (
    <Text size="l" theme={TextPrimaryTheme}>
      ${i18n.t('Plain text')}
    </Text>
  );
}
`;

const meta = {
  title: 'Typography/Text',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: Text,
  argTypes: {
    size: {
      control: 'select',
      options: sizes,
      mapping: sizes,
    },
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
  },
  args: {
    size: 'l',
    children: i18n.t('Plain text'),
    theme: TextPrimaryTheme,
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (props) => {
    return (
      <React.Fragment>
        {sizes.map((size) => (
          <div key={size}>
            <Text {...props} size={size}>
              {i18n.t('Plain text')}
            </Text>
          </div>
        ))}
      </React.Fragment>
    );
  },
  parameters: {
    controls: {
      exclude: /size/,
    },
  },
};

export const Ellipsis: Story = {
  args: {
    isEllipsis: true,
    children: i18n.t('Long text that will be truncated.'),
    style: {
      width: 150,
    },
  },
};

export const TextPrimary: Story = {
  tags: ['!dev'],
  args: { theme: TextPrimaryTheme },
};

export const TextSecondaryDark: Story = {
  tags: ['!dev'],
  args: { theme: TextSecondaryDarkTheme },
};

export const TextSecondaryLight: Story = {
  tags: ['!dev'],
  args: { theme: TextSecondaryLightTheme },
};

export const TextError: Story = {
  tags: ['!dev'],
  args: { theme: TextErrorTheme },
};
