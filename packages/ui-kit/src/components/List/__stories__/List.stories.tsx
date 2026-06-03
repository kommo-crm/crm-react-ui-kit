import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import { TextPrimaryTheme } from '@ui-kit/components/Text';

import { Text } from '../../Text/Text';

import { List, type ListType } from '..';

const types: ListType[] = ['bulleted', 'numbered'];

const USAGE = `
import { List } from '@kommo-crm/crm-react-ui-kit/List';

function App() {
  return (
    <List type="bulleted">
      <List.Item>${i18n.t('List level')} 1</List.Item>
      <List.Item>${i18n.t('List level')} 1</List.Item>
      <List.Item>${i18n.t('List level')} 1</List.Item>
    </List>
  );
}
`;

const meta = {
  title: 'Typography/List',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: {
        code: USAGE,
        language: 'jsx',
      },
    },
  },
  component: List,
  argTypes: {
    type: {
      control: 'select',
      options: types,
    },
  },
  args: {
    type: 'bulleted',
  },
  render: (props) => (
    <Text as="div" size="l" theme={TextPrimaryTheme}>
      <List {...props}>
        <List.Item>{i18n.t('List level')} 1</List.Item>
        <List.Item>{i18n.t('List level')} 1</List.Item>
        <List.Item>{i18n.t('List level')} 1</List.Item>
      </List>
    </Text>
  ),
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bulleted: Story = {
  args: { type: 'bulleted' },
  render: (props) => (
    <Text as="div" size="l" theme={TextPrimaryTheme}>
      <List {...props}>
        <List.Item>{i18n.t('Bulleted List level')} 1</List.Item>
        <List.Item>
          {i18n.t('Bulleted List level')} 1
          <List type="bulleted">
            <List.Item>{i18n.t('Bulleted List level')} 2</List.Item>
            <List.Item>
              {i18n.t('Bulleted List level')} 2
              <List type="bulleted">
                <List.Item>{i18n.t('Bulleted List level')} 3</List.Item>
                <List.Item>{i18n.t('Bulleted List level')} 3</List.Item>
              </List>
            </List.Item>
            <List.Item>{i18n.t('Bulleted List level')} 2</List.Item>
          </List>
        </List.Item>
        <List.Item>{i18n.t('Bulleted List level')} 1</List.Item>
      </List>
    </Text>
  ),
};

export const Numbered: Story = {
  args: { type: 'numbered' },
  render: (props) => (
    <Text as="div" size="l" theme={TextPrimaryTheme}>
      <List {...props}>
        <List.Item>{i18n.t('Numbered List level')} 1</List.Item>
        <List.Item>
          {i18n.t('Numbered List level')} 1
          <List type="numbered">
            <List.Item>{i18n.t('Numbered List level')} 2</List.Item>
            <List.Item>
              {i18n.t('Numbered List level')} 2
              <List type="numbered">
                <List.Item>{i18n.t('Numbered List level')} 3</List.Item>
                <List.Item>{i18n.t('Numbered List level')} 3</List.Item>
              </List>
            </List.Item>
            <List.Item>{i18n.t('Numbered List level')} 2</List.Item>
          </List>
        </List.Item>
        <List.Item>{i18n.t('Numbered List level')} 1</List.Item>
      </List>
    </Text>
  ),
};
