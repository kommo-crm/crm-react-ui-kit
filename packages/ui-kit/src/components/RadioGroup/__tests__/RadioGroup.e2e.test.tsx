import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { RadioGroupPlayground } from './RadioGroup.e2e-playground';

test('RadioGroup', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<RadioGroupPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
