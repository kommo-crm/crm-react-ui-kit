import React, { forwardRef } from 'react';

import { BaseTrigger } from 'src/components/Popover/BaseTrigger';
import { noop } from 'src/utils';

import { useTooltipContext } from '../../Tooltip.context';

import { TriggerProps } from './Trigger.props';

const DISPLAY_NAME = 'Tooltip.Trigger';

type D = HTMLDivElement;

export const Trigger = forwardRef<D, TriggerProps>((props, ref) => {
  const { children } = props;

  const { onMouseEnter = noop, onMouseLeave = noop } =
    useTooltipContext(DISPLAY_NAME);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    onMouseLeave(e);
  };

  return (
    <div ref={ref}>
      <BaseTrigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </BaseTrigger>
    </div>
  );
});

Trigger.displayName = DISPLAY_NAME;
