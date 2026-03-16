import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { SelectPlayground } from './Select.e2e-playground';

test('Select', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<SelectPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
