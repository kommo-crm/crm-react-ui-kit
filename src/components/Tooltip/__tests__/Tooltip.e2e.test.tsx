import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { LinkPlayground } from './Tooltip.e2e-playground';

test('Tooltip', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<LinkPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
