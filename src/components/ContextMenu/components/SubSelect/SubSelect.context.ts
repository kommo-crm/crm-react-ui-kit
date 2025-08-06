import { createComponentContext } from 'src/lib/react';

import { SubSelectContextProps } from './SubSelect.props';

const DISPLAY_NAME = 'ContextMenu.SubSelect';

const [SubSelectProvider, useSubSelectContext] =
  createComponentContext<SubSelectContextProps>(DISPLAY_NAME);

export { SubSelectProvider, useSubSelectContext, DISPLAY_NAME };
