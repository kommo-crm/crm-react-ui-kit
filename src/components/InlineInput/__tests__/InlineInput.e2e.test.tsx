import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import {
  InlineInputPlayground,
  InlineInputPrimaryFocusedPlayground,
  InlineInputWithFocusPlayground,
  InlineInputInvalidWithFocusPlayground,
  InlineInputPrimaryFocusedWithFocusPlayground,
  InlineInputPrimaryFocusedInvalidWithFocusPlayground,
} from './InlineInput.e2e-playground';

test('Inline Input', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<InlineInputPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Inline Input Primary Focused', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<InlineInputPrimaryFocusedPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});

test('Inline Input With Focus', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
  setFocusOnElement,
}) => {
  await mount(<InlineInputWithFocusPlayground appearance={appearance} />);
  await setFocusOnElement();
  await expectScreenshotClippedToContent();
});

test('Inline Input Invalid With Focus', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
  setFocusOnElement,
}) => {
  await mount(
    <InlineInputInvalidWithFocusPlayground appearance={appearance} />
  );
  await setFocusOnElement();
  await expectScreenshotClippedToContent();
});

test('Inline Input Primary Focused With Focus', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
  setFocusOnElement,
}) => {
  await mount(
    <InlineInputPrimaryFocusedWithFocusPlayground appearance={appearance} />
  );
  await setFocusOnElement();
  await expectScreenshotClippedToContent();
});

test('Inline Input Primary Focused Invalid With Focus', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
  setFocusOnElement,
}) => {
  await mount(
    <InlineInputPrimaryFocusedInvalidWithFocusPlayground
      appearance={appearance}
    />
  );
  await setFocusOnElement();
  await expectScreenshotClippedToContent();
});
