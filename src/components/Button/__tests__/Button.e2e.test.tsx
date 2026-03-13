import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import {
  ButtonPrimaryPlayground,
  ButtonNeutralPlayground,
  ButtonSecondaryPlayground,
  ButtonDangerPrimarytPlayground,
  ButtonDangerTertiaryPlayground,
  ButtonIconPlayground,
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

test('Button Danger Primary', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<ButtonDangerPrimarytPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Button Danger Tertiary', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<ButtonDangerTertiaryPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Button Icon', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<ButtonIconPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
