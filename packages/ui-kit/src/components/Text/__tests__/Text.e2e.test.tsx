import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import {
  TextPlayground,
  TextPlaygroundError,
  TextPlaygroundPrimary,
  TextPlaygroundSecondaryDark,
  TextPlaygroundSecondaryLight,
} from './Text.e2e-playground';

test('Text', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<TextPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Text Primary', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<TextPlaygroundPrimary appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Text Secondary Dark', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<TextPlaygroundSecondaryDark appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Text Secondary Light', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<TextPlaygroundSecondaryLight appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Text Error', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<TextPlaygroundError appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
