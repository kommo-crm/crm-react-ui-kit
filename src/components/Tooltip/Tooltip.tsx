import React, { forwardRef, MouseEvent, useRef, useState } from 'react';

import { Content } from './components/Content';
import { Trigger } from './components/Trigger';
import { Arrow } from './components/Arrow';

import { DISPLAY_NAME, TooltipProvider } from './Tooltip.context';
import { TooltipProps, TooltipType } from './Tooltip.props';

type D = HTMLDivElement;

export const Tooltip = forwardRef<D, TooltipProps>((props, ref) => {
  const {
    children,
    onMouseLeave,
    onMouseEnter,
    isControlled,
    isHoverable = false,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  const isNode = (target: EventTarget | null): target is Node => {
    return target instanceof Node;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    if (isControlled) {
      onMouseLeave(e);

      return;
    }

    if (isHoverable) {
      const related = e.relatedTarget;

      const isPopupHovered =
        isNode(related) && popoverRef.current?.contains(related);

      if (isPopupHovered) {
        return;
      }
    }

    setIsOpen(false);
  };

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    if (isControlled) {
      onMouseEnter(e);

      return;
    }

    setIsOpen(true);
  };

  return (
    <div ref={ref}>
      <TooltipProvider
        isHoverable={isHoverable}
        isOpen={isOpen}
        popoverRef={popoverRef}
        isControlled={isControlled}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        {...rest}
      >
        {children}
      </TooltipProvider>
    </div>
  );
}) as TooltipType;

Tooltip.displayName = DISPLAY_NAME;

Tooltip.Root = Tooltip;
Tooltip.Arrow = Arrow;
Tooltip.Trigger = Trigger;
Tooltip.Content = Content;
