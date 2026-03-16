import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import {
  ButtonPrimaryPlayground,
  ButtonNeutralPlayground,
  ButtonSecondaryPlayground,
} from './Button.e2e-playground';

test('Button Primary', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<ButtonPrimaryPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Button Neutral', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<ButtonNeutralPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Button Secondary', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<ButtonSecondaryPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
