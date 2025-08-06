import { createComponentContext } from 'src/lib/react';

import { LevelProviderContextProps } from './LevelProvider.props';

const DISPLAY_NAME = 'ContextMenu.LevelProvider';

export const [LevelProvider, useLevelProviderContext] =
  createComponentContext<LevelProviderContextProps>(DISPLAY_NAME);
