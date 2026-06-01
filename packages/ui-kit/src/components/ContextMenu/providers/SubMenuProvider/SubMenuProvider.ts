import { createComponentContext } from '@ui-kit/lib/react';

import { SubMenuContextProps } from './SubMenuProvider.props';

const DISPLAY_NAME = 'ContextMenu.Item';

/**
 * Provides the necessary context for the SubRoot.
 */
const [SubMenuProvider, useSubMenuContext] =
  createComponentContext<SubMenuContextProps>(DISPLAY_NAME);

export { SubMenuProvider, useSubMenuContext, DISPLAY_NAME };
