import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import {
  Badge,
  type BadgeThemeType,
  BadgeNeutralTheme,
  BadgePromoTheme,
  BadgeInfoTheme,
  BadgeSafetyTheme,
  BadgeWarningTheme,
  BadgeDangerTheme,
} from '..';

const themeMap: Record<string, BadgeThemeType> = {
  BadgeNeutralTheme,
  BadgePromoTheme,
  BadgeInfoTheme,
  BadgeSafetyTheme,
  BadgeWarningTheme,
  BadgeDangerTheme,
};

const USAGE = `
import {
  Badge,
  BadgeSafetyTheme,
} from '@kommo-crm/crm-react-ui-kit/Badge';

function App() {
  return <Badge theme={BadgeSafetyTheme} title="Badge" />;
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
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {Object.keys(themeMap).map((key) => (
        <Badge key={key} {...props} theme={themeMap[key]} />
      ))}
    </div>
  ),
};

export const BadgeNeutral: Story = {
  tags: ['!dev'],
  args: { theme: BadgeNeutralTheme },
};

export const BadgePromo: Story = {
  tags: ['!dev'],
  args: { theme: BadgePromoTheme },
};

export const BadgeInfo: Story = {
  tags: ['!dev'],
  args: { theme: BadgeInfoTheme },
};

export const BadgeSafety: Story = {
  tags: ['!dev'],
  args: { theme: BadgeSafetyTheme },
};

export const BadgeWarning: Story = {
  tags: ['!dev'],
  args: { theme: BadgeWarningTheme },
};

export const BadgeDanger: Story = {
  tags: ['!dev'],
  args: { theme: BadgeDangerTheme },
};
