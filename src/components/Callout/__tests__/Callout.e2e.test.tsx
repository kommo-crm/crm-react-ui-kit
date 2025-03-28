import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import {
  CalloutPlaygroundWarning,
  CalloutPlaygroundSuccess,
  CalloutPlaygroundInfo,
  CalloutPlaygroundError,
} from './Callout.e2e-playground';

test('CalloutWarning', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<CalloutPlaygroundWarning appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('CalloutSuccess', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<CalloutPlaygroundSuccess appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('CalloutInfo', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<CalloutPlaygroundInfo appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('CalloutError', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<CalloutPlaygroundError appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
