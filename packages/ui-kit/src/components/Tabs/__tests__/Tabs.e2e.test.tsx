import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { multiCartesian, prettyProps } from '@ui-kit/tests/e2e/utils';

import {
  TabsPrimaryPlaygroundItem,
  type TabsTestProps,
} from './Tabs.e2e-playground';

export const combinations = multiCartesian<TabsTestProps>([{}]);

for (const props of combinations) {
  const label = prettyProps(props);

  test.describe('Tabs Primary', () => {
    test(
      label,
      async ({ mount, appearance, expectScreenshotClippedToContent }) => {
        await mount(
          <TabsPrimaryPlaygroundItem appearance={appearance} props={props} />
        );
        await expectScreenshotClippedToContent();
      }
    );
  });
}
