import { createComponentContext } from 'src/lib/react';

import { SubMenuContextProps } from './SubMenuProvider.props';

const DISPLAY_NAME = 'ContextMenu.Item';

const [SubMenuProvider, useSubMenuContext] =
  createComponentContext<SubMenuContextProps>(DISPLAY_NAME);

export { SubMenuProvider, useSubMenuContext, DISPLAY_NAME };
