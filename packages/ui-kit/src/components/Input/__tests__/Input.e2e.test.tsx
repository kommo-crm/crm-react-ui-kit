import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { InputPlayground, InputDarkPlayground } from './Input.e2e-playground';

test('Input Light', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<InputPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Input Dark', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<InputDarkPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
