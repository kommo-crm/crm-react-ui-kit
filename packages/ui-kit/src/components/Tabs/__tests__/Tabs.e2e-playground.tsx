import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import { Tabs, TabsPrimaryTheme, type TabsProps } from '..';

export type TabsTestProps = Partial<TabsProps>;

export const TabsPrimaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<TabsTestProps>) => (
  <ComponentPlayground<TabsTestProps> appearance={appearance} props={props}>
    {(p) => (
      <Tabs {...p} theme={TabsPrimaryTheme} defaultValue="general">
        <Tabs.List>
          <Tabs.Trigger value="general">General</Tabs.Trigger>
          <Tabs.Trigger value="team">Team</Tabs.Trigger>
          <Tabs.Trigger value="automation">Automation</Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    )}
  </ComponentPlayground>
);
