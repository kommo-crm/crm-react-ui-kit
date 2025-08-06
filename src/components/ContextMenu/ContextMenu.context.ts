import { createComponentContext } from 'src/lib/react';

import { ContextMenuContextProps } from './ContextMenu.props';

const DISPLAY_NAME = 'ContextMenu';

const [ContextMenuProvider, useContextMenuContext] =
  createComponentContext<ContextMenuContextProps>(DISPLAY_NAME);

export { ContextMenuProvider, useContextMenuContext, DISPLAY_NAME };
