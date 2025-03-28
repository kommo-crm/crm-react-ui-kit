import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { CheckboxGroupPlayground } from './CheckboxGroup.e2e-playground';

test('CheckboxGroup', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<CheckboxGroupPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
