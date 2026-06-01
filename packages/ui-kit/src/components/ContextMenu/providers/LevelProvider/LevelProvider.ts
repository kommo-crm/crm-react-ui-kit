import { createComponentContext } from 'src/lib/react';

import { LevelProviderContextProps } from './LevelProvider.props';

const DISPLAY_NAME = 'ContextMenu.LevelProvider';

/**
 * It solves two problems in itself:
 *
 * 1) Level-by-level (For nested Sub components) pointing when working in an inactive tab
 * 2) Level-by-level management of properties
 */
export const [LevelProvider, useLevelContext] =
  createComponentContext<LevelProviderContextProps>(DISPLAY_NAME);
