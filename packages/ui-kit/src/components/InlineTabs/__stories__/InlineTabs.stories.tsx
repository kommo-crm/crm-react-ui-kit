import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { addons, useArgs } from '@storybook/preview-api';
import { SELECT_STORY } from 'storybook/internal/core-events';

import { CanvasCentered } from '@storybook-utils/constants';

import { i18n } from '@i18n';

import { Text, TextPrimaryTheme } from '@ui-kit/components/Text';
import SettingsIcon from '@ui-kit/icons/settings.svg';

import {
  InlineTabs,
  InlineTabsPrimaryTheme,
  InlineTabsSecondaryTheme,
  type InlineTabsProps,
} from '..';

const themeMap = {
  InlineTabsPrimaryTheme,
  InlineTabsSecondaryTheme,
};

const USAGE = `
import { useState } from 'react';
import {
  InlineTabs,
  InlineTabsPrimaryTheme,
} from '@kommo-crm/crm-react-ui-kit/InlineTabs';

function CardTabs({ counts, onSettingsOpen }) {
  const [tab, setTab] = useState('general');

  const handleChange = (value) => {
    if (value === 'settings') {
      onSettingsOpen();

      return;
    }

    setTab(value);
  };

  return (
    <InlineTabs.Root
      theme={InlineTabsPrimaryTheme}
      value={tab}
      onChange={handleChange}
    >
      <InlineTabs.List>
        <InlineTabs.Tab value="general" counter={counts.general}>
          <InlineTabs.TabLabel>${i18n.t('General')}</InlineTabs.TabLabel>
        </InlineTabs.Tab>
        <InlineTabs.Tab value="team" counter={counts.team}>
          <InlineTabs.TabLabel>${i18n.t('Team')}</InlineTabs.TabLabel>
        </InlineTabs.Tab>
        <InlineTabs.Tab value="automation" counter={counts.automation}>
          <InlineTabs.TabLabel>${i18n.t('Automation')}</InlineTabs.TabLabel>
        </InlineTabs.Tab>
        <InlineTabs.Tab value="settings">
          <InlineTabs.TabMenuIcon>
            <SettingsIcon />
          </InlineTabs.TabMenuIcon>
          <InlineTabs.TabLabel>${i18n.t('Settings')}</InlineTabs.TabLabel>
        </InlineTabs.Tab>
      </InlineTabs.List>

      <InlineTabs.Content value="general">
        ${i18n.t('Tabs general content')}
      </InlineTabs.Content>

      <InlineTabs.Content value="team">
        ${i18n.t('Tabs team content')}
      </InlineTabs.Content>

      <InlineTabs.Content value="automation">
        ${i18n.t('Tabs automation content')}
      </InlineTabs.Content>
    </InlineTabs.Root>
  );
}
`;

/**
 * Content of the stories is a plain text, so every tab is described by its
 * value and the keys of the translated label and content.
 */
const TABS = [
  { value: 'general', label: 'General', content: 'Tabs general content' },
  { value: 'team', label: 'Team', content: 'Tabs team content' },
  {
    value: 'automation',
    label: 'Automation',
    content: 'Tabs automation content',
  },
] as const;

const renderContent = ({ value, content }: (typeof TABS)[number]) => (
  <InlineTabs.Content key={value} value={value} style={{ paddingTop: '16px' }}>
    <Text theme={TextPrimaryTheme} size="l">
      {i18n.t(content)}
    </Text>
  </InlineTabs.Content>
);

/**
 * Every story is resizable, so the overflow menu can be checked in any of
 * them.
 */
const ResizableFrame = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: '320px',
      minWidth: '120px',
      maxWidth: '100%',
      resize: 'horizontal',
      overflow: 'hidden',
      border: '1px dashed currentColor',
    }}
  >
    {children}
  </div>
);

const meta = {
  title: 'Components/InlineTabs',
  parameters: {
    ...CanvasCentered,
    docs: {
      source: { code: USAGE, language: 'jsx' },
    },
  },
  component: InlineTabs,
  argTypes: {
    theme: {
      control: 'select',
      options: Object.keys(themeMap),
      mapping: themeMap,
    },
    children: { control: false },
    asChild: { control: false },
  },
  args: {
    theme: InlineTabsPrimaryTheme,
    onChange: action('onChange'),
  },
  render: (props) => (
    <ResizableFrame>
      <InlineTabs.Root {...props} defaultValue="general">
        <InlineTabs.List>
          {TABS.map(({ value, label }) => (
            <InlineTabs.Tab key={value} value={value}>
              <InlineTabs.TabLabel>{i18n.t(label)}</InlineTabs.TabLabel>
            </InlineTabs.Tab>
          ))}
        </InlineTabs.List>

        {TABS.map(renderContent)}
      </InlineTabs.Root>
    </ResizableFrame>
  ),
} satisfies Meta<typeof InlineTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

interface CounterTab {
  /**
   * Label of the tab.
   */
  label: string;
  /**
   * Number in the badge after the label; no badge without it.
   */
  counter?: number;
}

type DefaultArgs = InlineTabsProps & {
  /**
   * Tabs by their values, with labels and counters; edit them to check any
   * label and number.
   */
  tabs: Record<string, CounterTab>;
};

/**
 * Descending counters show every look of the badge: `99+`, two digits and
 * one digit.
 */
const COUNTERS = [150, 42, 7];

/**
 * Docs page the settings tab leads to.
 */
const SETTINGS_STORY_ID = 'components-inlinetabs--themes';

export const Default: StoryObj<DefaultArgs> = {
  args: {
    value: 'general',
    tabs: Object.fromEntries(
      TABS.map(({ value, label }, index) => [
        value,
        { label: i18n.t(label), counter: COUNTERS[index] },
      ])
    ),
  },
  argTypes: {
    tabs: { control: 'object' },
  },
  parameters: {
    docs: {
      controls: { exclude: ['tabs'] },
    },
  },
  render: ({ tabs, ...props }) => {
    const [, setArgs] = useArgs();

    /**
     * The settings tab acts as a button: it opens another page and the
     * selection stays.
     */
    const handleChange = (nextValue: string) => {
      props.onChange?.(nextValue);

      if (nextValue === 'settings') {
        addons.getChannel().emit(SELECT_STORY, { storyId: SETTINGS_STORY_ID });

        return;
      }

      setArgs({ value: nextValue });
    };

    return (
      <ResizableFrame>
        <InlineTabs.Root {...props} onChange={handleChange}>
          <InlineTabs.List>
            {Object.entries(tabs).map(([value, { label, counter }]) => (
              <InlineTabs.Tab key={value} value={value} counter={counter}>
                <InlineTabs.TabLabel>{label}</InlineTabs.TabLabel>
              </InlineTabs.Tab>
            ))}
            <InlineTabs.Tab value="settings">
              <InlineTabs.TabMenuIcon>
                <SettingsIcon />
              </InlineTabs.TabMenuIcon>
              <InlineTabs.TabLabel>{i18n.t('Settings')}</InlineTabs.TabLabel>
            </InlineTabs.Tab>
          </InlineTabs.List>

          {TABS.map(renderContent)}
        </InlineTabs.Root>
      </ResizableFrame>
    );
  },
};

export const InlineTabsPrimary: Story = {
  tags: ['!dev'],
  args: { theme: InlineTabsPrimaryTheme },
};

export const InlineTabsSecondary: Story = {
  tags: ['!dev'],
  args: { theme: InlineTabsSecondaryTheme },
};
