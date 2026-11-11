import React from 'react';
import { Portal as RadixTooltipPortal } from '@radix-ui/react-tooltip';

import type { TooltipPortalProps } from './Portal.props';

const DISPLAY_NAME = 'Tooltip.Portal';

export const Portal = (props: TooltipPortalProps) => {
  return <RadixTooltipPortal {...props} />;
};

Portal.displayName = DISPLAY_NAME;
