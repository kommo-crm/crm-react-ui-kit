import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { SpinnerPlayground } from './Spinner.e2e-playground';

test('Spinner', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<SpinnerPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
