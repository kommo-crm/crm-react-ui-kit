import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import { Link, LinkPrimaryTheme } from '..';

const USAGE = `
import { Link, LinkPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Link';

function App() {
  return (
    <Link theme={LinkPrimaryTheme} href="#">
      ${i18n.t('Go to Dashboard')}
    </Link>
  );
}
`;

const meta = {
  title: 'Components/Link',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: Link,
  args: {
    theme: LinkPrimaryTheme,
    href: '#',
  },
  render: (props) => <Link {...props}>{i18n.t('Go to Dashboard')}</Link>,
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
