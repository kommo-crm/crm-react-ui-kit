import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import {
  Badge,
  type BadgeThemeType,
  BadgeNeutralTheme,
  BadgePurpleTheme,
  BadgeBlueTheme,
  BadgePinkTheme,
  BadgeGreenTheme,
  BadgeOrangeTheme,
  BadgeRedTheme,
} from '..';

const themeMap: Record<string, BadgeThemeType> = {
  BadgeNeutralTheme,
  BadgePurpleTheme,
  BadgeBlueTheme,
  BadgePinkTheme,
  BadgeGreenTheme,
  BadgeOrangeTheme,
  BadgeRedTheme,
};

const USAGE = `
import {
  Badge,
  BadgeGreenTheme,
} from '@kommo-crm/crm-react-ui-kit/Badge';

function App() {
  return <Badge theme={BadgeGreenTheme} title="Badge" />;
}
`;

const meta = {
  title: 'Components/Badge',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: Badge,
  args: {
    theme: BadgeNeutralTheme,
    title: 'Badge',
  },
  argTypes: {
    theme: { table: { disable: true } },
  },
  render: (props) => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {Object.keys(themeMap).map((key) => (
        <Badge key={key} {...props} theme={themeMap[key]} />
      ))}
    </div>
  ),
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BadgeNeutral: Story = {
  tags: ['!dev'],
  args: { theme: BadgeNeutralTheme },
};

export const BadgePurple: Story = {
  tags: ['!dev'],
  args: { theme: BadgePurpleTheme },
};

export const BadgeBlue: Story = {
  tags: ['!dev'],
  args: { theme: BadgeBlueTheme },
};

export const BadgePink: Story = {
  tags: ['!dev'],
  args: { theme: BadgePinkTheme },
};

export const BadgeGreen: Story = {
  tags: ['!dev'],
  args: { theme: BadgeGreenTheme },
};

export const BadgeOrange: Story = {
  tags: ['!dev'],
  args: { theme: BadgeOrangeTheme },
};

export const BadgeRed: Story = {
  tags: ['!dev'],
  args: { theme: BadgeRedTheme },
};
