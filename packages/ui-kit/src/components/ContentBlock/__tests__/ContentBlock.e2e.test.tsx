import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { ContentBlockPlayground } from './ContentBlock.e2e-playground';

test('ContentBlock', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<ContentBlockPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
