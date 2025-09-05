import { createComponentContext } from 'src/lib/react';

import { ContextMenuItemContextProps } from './Item.props';

const DISPLAY_NAME = 'ContextMenu.Item';

const [ContextMenuItemProvider, useContextMenuItemContext] =
  createComponentContext<ContextMenuItemContextProps>(DISPLAY_NAME);

export { ContextMenuItemProvider, useContextMenuItemContext, DISPLAY_NAME };
