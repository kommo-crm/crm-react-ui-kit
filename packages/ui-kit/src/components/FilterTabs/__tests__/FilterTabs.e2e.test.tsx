import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { FilterTabsPlayground } from './FilterTabs.e2e-playground';

test('FilterTabs', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<FilterTabsPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
