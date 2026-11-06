import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/preview-api';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import { Text, TextPrimaryTheme } from '@ui-kit/components/Text';

import { Tabs, TabsPrimaryTheme, type TabsProps } from '..';

const themeMap = {
  TabsPrimaryTheme,
};

const USAGE = `
import { useState } from 'react';
import { Tabs, TabsPrimaryTheme } from '@kommo-crm/crm-react-ui-kit/Tabs';

function App() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <Tabs theme={TabsPrimaryTheme} value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Trigger value="general">${i18n.t('General')}</Tabs.Trigger>
        <Tabs.Trigger value="team">${i18n.t('Team')}</Tabs.Trigger>
        <Tabs.Trigger value="automation">${i18n.t('Automation')}</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="general">
        ${i18n.t('Tabs general content')}
      </Tabs.Content>

      <Tabs.Content value="team">
        ${i18n.t('Tabs team content')}
      </Tabs.Content>

      <Tabs.Content value="automation">
        ${i18n.t('Tabs automation content')}
      </Tabs.Content>
    </Tabs>
  );
}
`;

const renderTabs = (props: TabsProps) => (
  <Tabs style={{ width: '340px' }} {...props}>
    <Tabs.List>
      <Tabs.Trigger value="general">{i18n.t('General')}</Tabs.Trigger>
      <Tabs.Trigger value="team">{i18n.t('Team')}</Tabs.Trigger>
      <Tabs.Trigger value="automation">{i18n.t('Automation')}</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="general" style={{ paddingTop: '16px' }}>
      <Text theme={TextPrimaryTheme} size="l">
        {i18n.t('Tabs general content')}
      </Text>
    </Tabs.Content>

    <Tabs.Content value="team" style={{ paddingTop: '16px' }}>
      <Text theme={TextPrimaryTheme} size="l">
        {i18n.t('Tabs team content')}
      </Text>
    </Tabs.Content>

    <Tabs.Content value="automation" style={{ paddingTop: '16px' }}>
      <Text theme={TextPrimaryTheme} size="l">
        {i18n.t('Tabs automation content')}
      </Text>
    </Tabs.Content>
  </Tabs>
);

const meta = {
  title: 'Components/Tabs',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: { code: USAGE, language: 'jsx' },
    },
  },
  component: Tabs,
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
    activationMode: {
      control: 'radio',
      options: ['automatic', 'manual'],
    },
  },
  args: {
    theme: TabsPrimaryTheme,
    onChange: action('onChange'),
    children: <></>,
  },
  render: (props) => {
    const [, setArgs] = useArgs();

    const handleChange = (value: string) => {
      props.onChange?.(value);
      setArgs({ value });
    };

    return renderTabs({ ...props, onChange: handleChange });
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 'general' },
};

export const Uncontrolled: Story = {
  args: { defaultValue: 'general' },
  render: (props) => renderTabs(props),
};

export const TabsPrimary: Story = {
  tags: ['!dev'],
  args: { theme: TabsPrimaryTheme, defaultValue: 'general' },
  render: (props) => renderTabs(props),
};
