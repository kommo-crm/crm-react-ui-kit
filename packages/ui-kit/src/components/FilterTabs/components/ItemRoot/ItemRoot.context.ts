import { createComponentContext } from 'src/lib/react';

import { type TabItemContextProps } from './ItemRoot.props';

const DISPLAY_NAME = 'TabGroup.ItemRoot';

const [TabItemRootProvider, useTabItemRootContext] =
  createComponentContext<TabItemContextProps>(DISPLAY_NAME);

export { TabItemRootProvider, useTabItemRootContext, DISPLAY_NAME };
