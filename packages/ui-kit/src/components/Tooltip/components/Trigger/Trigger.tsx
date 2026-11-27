import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
} from 'react';
import { Trigger as RadixTooltipTrigger } from '@radix-ui/react-tooltip';

import { useTooltipRootContext } from '../../Tooltip.context';

import type { TooltipTriggerProps } from './Trigger.props';

const DISPLAY_NAME = 'Tooltip.Trigger';

/**
 * Radix closes every open tooltip on this document event when one opens;
 * a tap opens the tooltip past Radix, so the event is sent by hand.
 * Private `TOOLTIP_OPEN` of `@radix-ui/react-tooltip` 1.2.7, not exported;
 * the "tap on another trigger" test fails if Radix renames it.
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
      onFocus,
      onBlur,
      ...rest
    } = props;

    const {
      isOpen,
      isDisabled,
      isControlled,
      onOpenChange,
      isContentPointerDownRef,
    } = useTooltipRootContext(DISPLAY_NAME);

    /**
     * Open state at the touch `pointerdown`: Radix closes the tooltip on it,
     * so by the `click` the state no longer tells the first tap from the second.
     */
    const touchStartOpenRef = useRef<boolean | null>(null);

    /**
     * Radix's press flag outlived a `pointercancel` (a touch turned into a
     * scroll), so its focus handler will not open the tooltip.
     */
    const isRadixPressStuckRef = useRef(false);

    /**
     * Mirror of Radix's `isPointerDownRef`: Radix sets it in its `pointerdown`
     * handler, which runs right after ours unless the event is prevented, and
     * clears it only on a document `pointerup`. A press Radix never saw must
     * not mark it stuck, or focus would open the tooltip twice; a prevented
     * press must not clear it, or focus would open it neither way.
     */
    const isRadixPressTrackedRef = useRef(false);

    const clearRadixPress = useCallback(() => {
      isRadixPressTrackedRef.current = false;
      isRadixPressStuckRef.current = false;
    }, []);

    useEffect(
      () => () => document.removeEventListener('pointerup', clearRadixPress),
      [clearRadixPress]
    );

    const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerDown?.(event);

      isContentPointerDownRef.current = false;
      isRadixPressStuckRef.current = false;

      if (!event.defaultPrevented) {
        isRadixPressTrackedRef.current = true;
        document.addEventListener('pointerup', clearRadixPress, {
          once: true,
        });
      }

      touchStartOpenRef.current = event.pointerType === 'touch' ? isOpen : null;
    };

    const handlePointerCancel = (event: PointerEvent<HTMLButtonElement>) => {
      onPointerCancel?.(event);

      touchStartOpenRef.current = null;

      isRadixPressStuckRef.current = isRadixPressTrackedRef.current;
    };

    const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
      onFocus?.(event);

      if (
        event.defaultPrevented ||
        !isRadixPressStuckRef.current ||
        isDisabled ||
        isOpen
      ) {
        return;
      }

      document.dispatchEvent(new CustomEvent(RADIX_TOOLTIP_OPEN_EVENT));
      onOpenChange(true);
    };

    const handleClickCapture = (event: MouseEvent<HTMLButtonElement>) => {
      onClickCapture?.(event);

      const wasOpen = touchStartOpenRef.current;

      touchStartOpenRef.current = null;

      /**
       * A touch that ends without a click leaves the ref set; keyboard and
       * `element.click()` clicks have `detail` 0 and are never a tap.
       */
      if (
        wasOpen !== false ||
        event.detail === 0 ||
        isDisabled ||
        isControlled
      ) {
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

      const isContentPointerDown = isContentPointerDownRef.current;

      isContentPointerDownRef.current = false;

      if (isContentPointerDown) {
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
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  }
);

Trigger.displayName = DISPLAY_NAME;
