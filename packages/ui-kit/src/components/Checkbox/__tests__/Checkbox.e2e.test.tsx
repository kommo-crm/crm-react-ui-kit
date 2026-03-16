import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import {
  CheckboxLightPlayground,
  CheckboxSmallLightPlayground,
  CheckboxDarkPlayground,
  CheckboxSmallDarkPlayground,
} from './Checkbox.e2e-playground';

test('Checkbox Light', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<CheckboxLightPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Checkbox Small Light', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<CheckboxSmallLightPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Checkbox Dark', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<CheckboxDarkPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Checkbox Small Dark', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<CheckboxSmallDarkPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
