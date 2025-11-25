import { createComponentContext } from 'src/lib/react';

import { TooltipContextProps } from './Tooltip.props';

const DISPLAY_NAME = 'Tooltip';

const [TooltipProvider, useTooltipContext] =
  createComponentContext<TooltipContextProps>(DISPLAY_NAME);

export { TooltipProvider, useTooltipContext, DISPLAY_NAME };
