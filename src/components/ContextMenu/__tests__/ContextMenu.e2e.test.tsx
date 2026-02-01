import React from 'react';

import { test } from '@crm-react-ui-kit-e2e/test';

import { ContextMenuPlayground } from './ContextMenu.e2e-playground';

test('ContextMenu', async ({
  mount,
  appearance,
  expectScreenshotClippedToContent,
}) => {
  await mount(<ContextMenuPlayground appearance={appearance} />);
  await expectScreenshotClippedToContent();
});
