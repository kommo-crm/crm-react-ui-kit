import { createComponentContext } from 'src/lib/react';

import { type FilterTabsContextProps } from './FilterTabs.props';

const DISPLAY_NAME = 'FilterTabs';

const [FilterTabsProvider, useFilterTabsContext] =
  createComponentContext<FilterTabsContextProps>(DISPLAY_NAME);

export { FilterTabsProvider, useFilterTabsContext, DISPLAY_NAME };
