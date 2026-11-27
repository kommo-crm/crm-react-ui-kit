import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';
import SettingsIcon from '@ui-kit/icons/settings.svg';

import {
  InlineTabs,
  InlineTabsPrimaryTheme,
  InlineTabsSecondaryTheme,
  type InlineTabsThemeType,
} from '..';

/**
 * Fixed panel widths keep the overflow split deterministic across browsers.
 */
const PANEL_WIDTH = {
  WIDE: 320,
  OVERFLOW: 170,
  COUNTERS: 260,
  TRUNCATED: 140,
} as const;

export interface InlineTabsTestProps {
  /**
   * Which layout is rendered.
   */
  scenario:
    | 'default'
    | 'selected'
    | 'hover'
    | 'overflow'
    | 'overflowSelected'
    | 'menuOpen'
    | 'truncated'
    | 'counters';
}

const InlineTabsScenario = ({
  scenario,
  theme,
}: InlineTabsTestProps & { theme: InlineTabsThemeType }) => {
  const isCounters = scenario === 'counters';
  const isTruncated = scenario === 'truncated';

  const width = {
    default: PANEL_WIDTH.WIDE,
    selected: PANEL_WIDTH.WIDE,
    hover: PANEL_WIDTH.WIDE,
    overflow: PANEL_WIDTH.OVERFLOW,
    overflowSelected: PANEL_WIDTH.OVERFLOW,
    menuOpen: PANEL_WIDTH.OVERFLOW,
    truncated: PANEL_WIDTH.TRUNCATED,
    counters: PANEL_WIDTH.COUNTERS,
  }[scenario];

  const defaultValue = {
    default: 'main',
    selected: 'products',
    hover: 'main',
    overflow: 'main',
    overflowSelected: 'reports',
    menuOpen: 'reports',
    truncated: 'main',
    counters: 'main',
  }[scenario];

  /**
   * The open menu is rendered in a portal, so the container has to reserve
   * room for it to land inside the screenshot.
   */
  return (
    <div
      style={{
        width,
        minHeight: scenario === 'menuOpen' ? 200 : undefined,
      }}
    >
      <InlineTabs.Root theme={theme} defaultValue={defaultValue}>
        <InlineTabs.List>
          <InlineTabs.Tab value="main">
            <InlineTabs.TabLabel>
              {isTruncated ? 'Main information' : 'Main'}
            </InlineTabs.TabLabel>
          </InlineTabs.Tab>
          <InlineTabs.Tab
            value="products"
            counter={isCounters ? 12 : undefined}
          >
            <InlineTabs.TabLabel>Products</InlineTabs.TabLabel>
          </InlineTabs.Tab>
          <InlineTabs.Tab value="media" counter={isCounters ? 120 : undefined}>
            <InlineTabs.TabLabel>Media</InlineTabs.TabLabel>
          </InlineTabs.Tab>
          <InlineTabs.Tab value="reports" counter={isCounters ? 3 : undefined}>
            <InlineTabs.TabMenuIcon>
              <SettingsIcon />
            </InlineTabs.TabMenuIcon>
            <InlineTabs.TabLabel>Reports</InlineTabs.TabLabel>
          </InlineTabs.Tab>
        </InlineTabs.List>
      </InlineTabs.Root>
    </div>
  );
};

export const InlineTabsPrimaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<InlineTabsTestProps>) => (
  <ComponentPlayground<InlineTabsTestProps>
    appearance={appearance}
    props={props}
  >
    {(p) => <InlineTabsScenario {...p} theme={InlineTabsPrimaryTheme} />}
  </ComponentPlayground>
);

export const InlineTabsSecondaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<InlineTabsTestProps>) => (
  <ComponentPlayground<InlineTabsTestProps>
    appearance={appearance}
    props={props}
  >
    {(p) => <InlineTabsScenario {...p} theme={InlineTabsSecondaryTheme} />}
  </ComponentPlayground>
);

export interface InlineTabsFocusTestProps {
  /**
   * Values of the tabs in display order; each value is the tab label too.
   */
  tabs: string[];
}

export const InlineTabsFocusPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<InlineTabsFocusTestProps>) => (
  <ComponentPlayground<InlineTabsFocusTestProps>
    appearance={appearance}
    props={props}
  >
    {(p) => (
      <div style={{ width: PANEL_WIDTH.WIDE }}>
        <InlineTabs.Root
          theme={InlineTabsPrimaryTheme}
          defaultValue={p.tabs[0]}
        >
          <InlineTabs.List>
            {p.tabs.map((tab) => (
              <InlineTabs.Tab key={tab} value={tab}>
                <InlineTabs.TabLabel>{tab}</InlineTabs.TabLabel>
              </InlineTabs.Tab>
            ))}
          </InlineTabs.List>
        </InlineTabs.Root>
      </div>
    )}
  </ComponentPlayground>
);
