import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import {
  TextAreaLightPlayground,
  TextAreaDarkPlayground,
} from './TextArea.e2e-playground';

test('TextArea Light', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<TextAreaLightPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('TextArea Dark', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<TextAreaDarkPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
