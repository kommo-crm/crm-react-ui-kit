import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { ContextMenuPlayground } from './ContextMenu.e2e-playground';

test('ContextMenu', async ({
  page,
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  const currentViewport = page.viewportSize();

  if (currentViewport && currentViewport.width < 450) {
    await page.setViewportSize({
      width: 450,
      height: currentViewport.height,
    });
  }

  await mount(<ContextMenuPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
