import { createComponentContext } from 'src/lib/react';

import { ContextMenuSubContextProps } from './Sub.props';

const DISPLAY_NAME = 'ContextMenu.Sub';

const [ContextMenuSubProvider, useContextMenuSubContext] =
  createComponentContext<ContextMenuSubContextProps>(DISPLAY_NAME);

export { ContextMenuSubProvider, useContextMenuSubContext, DISPLAY_NAME };
