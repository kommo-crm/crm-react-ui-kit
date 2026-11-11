import React, { useState, type CSSProperties, type ReactNode } from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import { Tooltip, TooltipPrimaryTheme } from '..';

import { STAGE_TEST_ID } from './Tooltip.e2e-constants';

export interface TooltipPlaygroundProps {
  /**
   * Stage corner the trigger is pinned to.
   */
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /**
   * Tooltip text: short or long enough to wrap.
   */
  content: 'short' | 'long';
}

const EDGE_OFFSET_PX = 4;

const STAGE_STYLE: CSSProperties = {
  position: 'relative',
  height: 360,
  outline: '1px dashed currentColor',
};

const TRIGGER_STYLES: Record<TooltipPlaygroundProps['corner'], CSSProperties> =
  {
    'top-left': { top: EDGE_OFFSET_PX, left: EDGE_OFFSET_PX },
    'top-right': { top: EDGE_OFFSET_PX, right: EDGE_OFFSET_PX },
    'bottom-left': { bottom: EDGE_OFFSET_PX, left: EDGE_OFFSET_PX },
    'bottom-right': { bottom: EDGE_OFFSET_PX, right: EDGE_OFFSET_PX },
  };

const CONTENT: Record<TooltipPlaygroundProps['content'], ReactNode> = {
  short: 'Tooltip',
  long: 'A long tooltip text that has to wrap onto several lines because it is wider than the maximum width of the tooltip content',
};

/**
 * The stage sits below the playground header and is the collision boundary,
 * so a trigger pinned to its corner does not overlap the header.
 */
const TooltipStage = ({ corner, content }: TooltipPlaygroundProps) => {
  const [stage, setStage] = useState<HTMLDivElement | null>(null);

  return (
    <div ref={setStage} data-testid={STAGE_TEST_ID} style={STAGE_STYLE}>
      <Tooltip.Root theme={TooltipPrimaryTheme} isDefaultOpen>
        <Tooltip.Trigger
          style={{ position: 'absolute', ...TRIGGER_STYLES[corner] }}
        >
          Trigger
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content collisionBoundary={stage}>
            {CONTENT[content]}
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </div>
  );
};

export const TooltipPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<TooltipPlaygroundProps>) => (
  <ComponentPlayground<TooltipPlaygroundProps>
    appearance={appearance}
    props={props}
  >
    {(itemProps) => <TooltipStage {...itemProps} />}
  </ComponentPlayground>
);

export const TooltipTouchPlayground = () => {
  const [clickCount, setClickCount] = useState(0);

  return (
    <>
      <Tooltip.Root theme={TooltipPrimaryTheme}>
        <Tooltip.Trigger onClick={() => setClickCount((count) => count + 1)}>
          Trigger
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>Tooltip</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <output>{clickCount}</output>
    </>
  );
};

export const TooltipTouchPairPlayground = () => (
  <div style={{ display: 'flex', gap: 80, padding: 80 }}>
    {['First', 'Second'].map((name) => (
      <Tooltip.Root theme={TooltipPrimaryTheme} key={name}>
        <Tooltip.Trigger>{name}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content>{`${name} tooltip`}</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    ))}
  </div>
);
