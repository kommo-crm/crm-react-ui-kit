import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import {
  type TextSizes,
  TextErrorTheme,
  TextPrimaryTheme,
  TextSecondaryDarkTheme,
  TextSecondaryLightTheme,
  TextInheritColorTheme,
} from 'src/components/Text';

import { List, type ListType } from '..';

const sizes: TextSizes[] = ['s', 'm', 'ms', 'l', 'xl'];

const types: ListType[] = ['bulleted', 'numbered'];

const themeMap = {
  TextPrimaryTheme,
  TextSecondaryDarkTheme,
  TextSecondaryLightTheme,
  TextErrorTheme,
  TextInheritColorTheme,
};

const USAGE = `
import { List } from '@kommo-crm/crm-react-ui-kit/List';
import { TextPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Text';

function App() {
  return (
    <List type="bulleted" size="l" theme={TextPrimaryTheme}>
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
    size: {
      control: 'select',
      options: sizes,
    },
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
  },
  args: {
    type: 'bulleted',
    size: 'l',
    theme: TextPrimaryTheme,
  },
  render: (props) => (
    <List {...props}>
      <List.Item>{i18n.t('List level')} 1</List.Item>
      <List.Item>{i18n.t('List level')} 1</List.Item>
      <List.Item>{i18n.t('List level')} 1</List.Item>
    </List>
  ),
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bulleted: Story = {
  args: { type: 'bulleted' },
  render: (props) => (
    <List {...props}>
      <List.Item>{i18n.t('Bulleted List level')} 1</List.Item>
      <List.Item>
        {i18n.t('Bulleted List level')} 1
        <List type="bulleted" size={props.size} theme={props.theme}>
          <List.Item>{i18n.t('Bulleted List level')} 2</List.Item>
          <List.Item>
            {i18n.t('Bulleted List level')} 2
            <List type="bulleted" size={props.size} theme={props.theme}>
              <List.Item>{i18n.t('Bulleted List level')} 3</List.Item>
              <List.Item>{i18n.t('Bulleted List level')} 3</List.Item>
            </List>
          </List.Item>
          <List.Item>{i18n.t('Bulleted List level')} 2</List.Item>
        </List>
      </List.Item>
      <List.Item>{i18n.t('Bulleted List level')} 1</List.Item>
    </List>
  ),
};

export const Numbered: Story = {
  args: { type: 'numbered' },
  render: (props) => (
    <List {...props}>
      <List.Item>{i18n.t('Numbered List level')} 1</List.Item>
      <List.Item>
        {i18n.t('Numbered List level')} 1
        <List type="numbered" size={props.size} theme={props.theme}>
          <List.Item>{i18n.t('Numbered List level')} 2</List.Item>
          <List.Item>
            {i18n.t('Numbered List level')} 2
            <List type="numbered" size={props.size} theme={props.theme}>
              <List.Item>{i18n.t('Numbered List level')} 3</List.Item>
              <List.Item>{i18n.t('Numbered List level')} 3</List.Item>
            </List>
          </List.Item>
          <List.Item>{i18n.t('Numbered List level')} 2</List.Item>
        </List>
      </List.Item>
      <List.Item>{i18n.t('Numbered List level')} 1</List.Item>
    </List>
  ),
};

export const Sizes: Story = {
  render: (props) => (
    <React.Fragment>
      {sizes.map((size) => (
        <div key={size} style={{ marginBottom: 16 }}>
          <List {...props} size={size}>
            <List.Item>
              {size}: {i18n.t('List level')} 1
            </List.Item>
            <List.Item>
              {size}: {i18n.t('List level')} 1
            </List.Item>
          </List>
        </div>
      ))}
    </React.Fragment>
  ),
  parameters: {
    controls: {
      exclude: /size/,
    },
  },
};

export const ListPrimary: Story = {
  tags: ['!dev'],
  args: { theme: TextPrimaryTheme },
};

export const ListSecondaryDark: Story = {
  tags: ['!dev'],
  args: { theme: TextSecondaryDarkTheme },
};

export const ListSecondaryLight: Story = {
  tags: ['!dev'],
  args: { theme: TextSecondaryLightTheme },
};

export const ListError: Story = {
  tags: ['!dev'],
  args: { theme: TextErrorTheme },
};
