import { createComponentContext } from '@ui-kit/lib/react';

import type { TooltipRootContextProps } from './Tooltip.props';

export const DISPLAY_NAME = 'Tooltip';

export const [TooltipRootProvider, useTooltipRootContext] =
  createComponentContext<TooltipRootContextProps>(DISPLAY_NAME);
