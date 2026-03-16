import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { LabelPlayground } from './Label.e2e-playground';

test('Label', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<LabelPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
