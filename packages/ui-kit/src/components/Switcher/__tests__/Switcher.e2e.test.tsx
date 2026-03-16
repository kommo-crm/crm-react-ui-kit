import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { SwitcherPlayground } from './Switcher.e2e-playground';

test('Switcher', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<SwitcherPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
