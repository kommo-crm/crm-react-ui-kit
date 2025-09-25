import { createComponentContext } from 'src/lib/react';

import {
  ContextMenuContextProps,
  ContextMenuRootContextProps,
} from './ContextMenu.props';

const DISPLAY_NAME = 'ContextMenu';

const [ContextMenuProvider, useContextMenuContext] =
  createComponentContext<ContextMenuContextProps>(DISPLAY_NAME);

const ROOT_DISPLAY_NAME = 'ContextMenu.Root';

const [ContextMenuRootProvider, useContextMenuRootContext] =
  createComponentContext<ContextMenuRootContextProps>(ROOT_DISPLAY_NAME);

export {
  ContextMenuProvider,
  useContextMenuContext,
  DISPLAY_NAME,
  ContextMenuRootProvider,
  useContextMenuRootContext,
  ROOT_DISPLAY_NAME,
};
