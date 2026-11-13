import { createContext } from 'react';

import { noop } from '@ui-kit/utils';

import type {
  TooltipRootContextProps,
  TooltipThemeContextProps,
} from './Tooltip.props';

export const DISPLAY_NAME = 'Tooltip';

export const TooltipThemeContext = createContext<TooltipThemeContextProps>({
  themeClassName: '',
});

TooltipThemeContext.displayName = 'Tooltip.Theme';

export const TooltipRootContext = createContext<TooltipRootContextProps>({
  isOpen: false,
  isDisabled: false,
  isControlled: false,
  onOpenChange: noop,
  isContentPointerDownRef: { current: false },
});

TooltipRootContext.displayName = 'Tooltip.Root';
