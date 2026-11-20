import { createComponentContext } from '@ui-kit/lib/react';

import type {
  ListOverflowContextProps,
  ListPlacementContextProps,
} from './List.props';

const DISPLAY_NAME = 'InlineTabs.List';

/**
 * The defaults let the parts render outside the list without an error.
 */
export const [ListPlacementProvider, useListPlacementContext] =
  createComponentContext<ListPlacementContextProps>(DISPLAY_NAME, {});

export const [ListOverflowProvider, useListOverflowContext] =
  createComponentContext<ListOverflowContextProps>(DISPLAY_NAME, {
    hiddenTabs: [],
    overflowRef: null,
    onOpenChange: () => undefined,
    onMenuItemUnmount: () => undefined,
  });
