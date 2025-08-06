import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { SubSelectPlayground } from './SubSelect.e2e-playground';

test('ContextMenu.SubSelect', async ({
  page,
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  const currentViewport = page.viewportSize();

  if (currentViewport && currentViewport.width < 350) {
    await page.setViewportSize({
      width: 350,
      height: currentViewport.height,
    });
  }

  await mount(<SubSelectPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
