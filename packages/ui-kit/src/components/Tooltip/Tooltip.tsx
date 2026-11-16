import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Provider as RadixTooltipProvider,
  Root as RadixTooltipRoot,
} from '@radix-ui/react-tooltip';

import { useThemeClassName } from '@ui-kit/hooks/useThemeClassName';

import { type TooltipRootProps } from './Tooltip.props';
import { type TooltipThemeType } from './Tooltip.themes';
import { DISPLAY_NAME, TooltipRootProvider } from './Tooltip.context';

import { Trigger } from './components/Trigger';
import { Portal } from './components/Portal';
import { Content } from './components/Content';
import { Arrow } from './components/Arrow';

const TooltipRoot = (props: TooltipRootProps) => {
  const {
    children,
    isOpen,
    isDefaultOpen,
    onOpenChange,
    isDisabled = false,
    theme,
    ...rest
  } = props;

  const [innerOpen, setInnerOpen] = useState(isDefaultOpen ?? false);

  const themeClassName = useThemeClassName<TooltipThemeType>(theme);

  const open = isOpen ?? (!isDisabled && innerOpen);

  useEffect(() => {
    if (isDisabled) {
      setInnerOpen(false);
    }
  }, [isDisabled]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (next && isDisabled) {
        return;
      }

      if (isOpen === undefined) {
        setInnerOpen(next);
      }

      onOpenChange?.(next);
    },
    [isDisabled, isOpen, onOpenChange]
  );

  const isContentPointerDownRef = useRef(false);

  return (
    /**
     * Radix Root throws without a provider; Radix's default delay is 700 ms
     */
    <RadixTooltipProvider delayDuration={0}>
      <TooltipRootProvider
        themeClassName={themeClassName}
        isOpen={open}
        isDisabled={isDisabled}
        isControlled={isOpen !== undefined}
        onOpenChange={handleOpenChange}
        isContentPointerDownRef={isContentPointerDownRef}
      >
        <RadixTooltipRoot {...rest} open={open} onOpenChange={handleOpenChange}>
          {children}
        </RadixTooltipRoot>
      </TooltipRootProvider>
    </RadixTooltipProvider>
  );
};

TooltipRoot.displayName = DISPLAY_NAME;

export const Tooltip = Object.assign(TooltipRoot, {
  Root: TooltipRoot,
  Trigger,
  Portal,
  Content,
  Arrow,
});
