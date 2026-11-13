import React, {
  forwardRef,
  useContext,
  useRef,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
} from 'react';
import { Trigger as RadixTooltipTrigger } from '@radix-ui/react-tooltip';

import { TooltipRootContext } from '../../Tooltip.context';

import type { TooltipTriggerProps } from './Trigger.props';

const DISPLAY_NAME = 'Tooltip.Trigger';

/**
 * Radix closes every open tooltip on this document event when one opens;
 * a tap opens the tooltip past Radix, so the event is sent by hand.
 */
const RADIX_TOOLTIP_OPEN_EVENT = 'tooltip.open';

export const Trigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  (props, ref) => {
    const {
      asChild,
      type,
      onPointerDown,
      onPointerCancel,
      onClickCapture,
      onBlur,
      ...rest
    } = props;

    const {
      isOpen,
      isDisabled,
      isControlled,
      onOpenChange,
      isContentPointerDownRef,
    } = useContext(TooltipRootContext);

    /**
     * Open state at the touch `pointerdown`: Radix closes the tooltip on it,
     * so by the `click` the state no longer tells the first tap from the second.
     */
    const touchStartOpenRef = useRef<boolean | null>(null);

    const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(event);

      isContentPointerDownRef.current = false;

      touchStartOpenRef.current = event.pointerType === 'touch' ? isOpen : null;
    };

    const handlePointerCancel = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerCancel?.(event);

      touchStartOpenRef.current = null;
    };

    const handleClickCapture = (event: MouseEvent<HTMLButtonElement>) => {
      onClickCapture?.(event);

      const wasOpen = touchStartOpenRef.current;

      touchStartOpenRef.current = null;

      if (wasOpen !== false || isDisabled || isControlled) {
        return;
      }

      /**
       * Radix never opens on touch. The first tap only shows the tooltip:
       * the capture phase keeps the click from the trigger's own handlers and
       * its default action; the second tap goes through and Radix closes.
       */
      event.preventDefault();
      event.stopPropagation();

      /**
       * Where the tap focuses the trigger, Radix has already opened the
       * tooltip on focus; reopening would close it via the open event first.
       */
      if (isOpen) {
        return;
      }

      document.dispatchEvent(new CustomEvent(RADIX_TOOLTIP_OPEN_EVENT));
      onOpenChange(true);
    };

    const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
      onBlur?.(event);

      if (isContentPointerDownRef.current) {
        isContentPointerDownRef.current = false;
        /**
         * Radix closes on the trigger blur unless it is prevented. A tap on
         * the content moves focus away from the trigger after the first tap
         * focused it.
         */
        event.preventDefault();
      }
    };

    return (
      <RadixTooltipTrigger
        ref={ref}
        asChild={asChild}
        /**
         * Slot would merge `type` onto an arbitrary child element
         */
        type={asChild ? type : (type ?? 'button')}
        {...rest}
        onPointerDown={handlePointerDown}
        onPointerCancel={handlePointerCancel}
        onClickCapture={handleClickCapture}
        onBlur={handleBlur}
      />
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
