import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { AccordionPlayground } from './Accordion.e2e-playground';

test('Accordion', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<AccordionPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
