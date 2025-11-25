import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Rect } from 'react-tiny-popover';

import { BaseContent } from 'src/components/Popover/BaseContent';

import { useTooltipContext } from '../../Tooltip.context';

import { InternalArrow } from '../Arrow/Arrow';

import { ContentProps } from './Content.props';

const DISPLAY_NAME = 'Tooltip.Content';

const SAFE_NUDGET = 10;

const enum PopoverPositions {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

function chooseSafePosition({
  /**
   * Trigger rect
   */
  childRect,
  /**
   * body rect
   */
  boundaryElement,
  tooltipSize,
  /**
   * Tooltip rect
   */
  popoverRect,
  nudgedLeft,
}: {
  childRect: DOMRect;
  boundaryElement: HTMLElement;
  tooltipSize: { width: number; height: number };
  arrowCenterX: number;
}): PopoverPositions {
  /**
   * Границы родительского компонента
   */
  const boundaryRect = boundaryElement.getBoundingClientRect();
  /**
   * 6 - половина стрелки
   */
  const arrowCenterX = childRect.left + childRect.width / 2;

  const leftPopoverEdge = arrowCenterX - tooltipSize.width / 2 + nudgedLeft;
  const rightPopoverEdge = arrowCenterX + tooltipSize.width / 2 + nudgedLeft;

  const leftOffset = arrowCenterX - leftPopoverEdge - 18;
  const rightOffset = rightPopoverEdge - arrowCenterX - 18;

  const fitsTop =
    childRect.top - tooltipSize.height >= boundaryRect.top &&
    leftOffset > SAFE_NUDGET &&
    rightOffset > SAFE_NUDGET;

  if (fitsTop) {
    return PopoverPositions.TOP;
  }

  // Аналогично для BOTTOM
  const fitsBottom =
    childRect.bottom + tooltipSize.height <= boundaryRect.bottom &&
    leftOffset > SAFE_NUDGET &&
    rightOffset > SAFE_NUDGET;

  if (fitsBottom) {
    return PopoverPositions.BOTTOM;
  }

  // Для RIGHT и LEFT проверок с стрелкой и краями тултипа обычно не делают,
  // но если нужно, можно добавить.

  const fitsRight = childRect.right + tooltipSize.width <= boundaryRect.right;

  if (fitsRight) {
    return PopoverPositions.RIGHT;
  }

  const fitsLeft = childRect.left - tooltipSize.width >= boundaryRect.left;

  if (fitsLeft) {
    return PopoverPositions.LEFT;
  }

  return PopoverPositions.TOP;
}

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    const { children } = props;

    const { isOpen, boundaryElement, popoverRef } =
      useTooltipContext(DISPLAY_NAME);

    const [position, setPosition] = useState<PopoverPositions>(
      PopoverPositions.TOP
    );
    const [childRect, setChildRect] = useState<Rect | null>(null);
    const arrowCenterX = useRef<number | null>(null);
    const popoverRect = useRef<DOMRect | null>(null);
    const nudgedLeftRef = useRef<number>(null);

    const childrenArray = React.Children.toArray(children);

    const trigger = childrenArray.find(
      (child: any) => child?.type?.displayName === 'Trigger'
    );

    const content = childrenArray.filter(
      (child: any) => child?.type?.displayName === 'Arrow'
    );

    React.useEffect(() => {
      setPosition(PopoverPositions.TOP);
    }, [childRect]);

    useLayoutEffect(() => {
      if (!childRect || !boundaryElement || arrowCenterX.current === null) {
        return;
      }

      const safePos = chooseSafePosition({
        childRect,
        boundaryElement,
        tooltipSize: {
          width: popoverRect.current!.width,
          height: popoverRect.current!.height,
        },
        popoverRect: popoverRect.current,
        nudgedLeft: nudgedLeftRef.current,
      });

      if (safePos !== position) {
        setPosition(safePos);
      }
    }, [
      isOpen,
      // position,
      boundaryElement,
      childRect,
      arrowCenterX.current,
      popoverRect.current,
    ]);

    return (
      <div ref={ref}>
        <BaseContent
          positions={[position]}
          isOpen={isOpen}
          boundaryElement={boundaryElement}
          content={({
            childRect: currentChildRect,
            popoverRect: tooltipRect,
            nudgedLeft,
            ...rest
          }) => {
            setChildRect(currentChildRect);

            arrowCenterX.current =
              currentChildRect.left + currentChildRect.width / 2;
            // popoverRect.current = tooltipRect;
            nudgedLeftRef.current = nudgedLeft;

            const validChildren: ReactElement[] =
              content.filter(isValidElement);

            const contentWithInjectedProps = validChildren.map((arrow) =>
              cloneElement(arrow, {
                position,
                nudgeteft: nudgedLeft,
                childRect: currentChildRect,
                popoverRect: tooltipRect,
                ref: arrow.props.forwardedRef,
                ...arrow.props,
                ...rest,
              })
            );

            const renderedContent = contentWithInjectedProps.map(
              ({ key, props: arrowProps }) => (
                <InternalArrow
                  key={key}
                  ref={arrowProps.forwardedRef}
                  {...arrowProps}
                />
              )
            );

            return <div ref={popoverRef}>{renderedContent}</div>;
          }}
        >
          <div>{trigger}</div>
        </BaseContent>
      </div>
    );
  }
);

Content.displayName = DISPLAY_NAME;
