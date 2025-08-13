import { createComponentContext } from 'src/lib/react';

import { ContextMenuSubSelectContextProps } from './SubSelect.props';

const DISPLAY_NAME = 'ContextMenu.SubSelect';

const [ContextMenuSubSelectProvider, useContextMenuSubSelectContext] =
  createComponentContext<ContextMenuSubSelectContextProps>(DISPLAY_NAME);

export {
  ContextMenuSubSelectProvider,
  useContextMenuSubSelectContext,
  DISPLAY_NAME,
};
