import { createComponentContext } from 'src/lib/react';

import { TabItemResetContextProps } from './ItemRootReset.props';

const DISPLAY_NAME = 'TabGroup.ItemRootReset';

const [TabItemRootResetProvider, useTabItemRootResetContext] =
  createComponentContext<TabItemResetContextProps>(DISPLAY_NAME);

export { TabItemRootResetProvider, useTabItemRootResetContext, DISPLAY_NAME };
