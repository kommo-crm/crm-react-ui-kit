import React, { forwardRef, MouseEvent } from 'react';
import cx from 'classnames';

import { BaseArrow } from 'src/components/Popover/BaseArrow';
import { useThemeClassName } from 'src/hooks/useThemeClassName';
import { noop } from 'src/utils';

import { ArrowPrivateProps } from 'src/components/Popover/BaseArrow';

import { DISPLAY_NAME, useTooltipContext } from '../../Tooltip.context';

import { PopupPrimaryThemeType } from './Arrow.theme';

import { ArrowProps } from './Arrow.props';

import s from './Arrow.module.css';

const calculateArrowStyle = (
  options: Pick<InternalArrowProps, 'position' | 'childRect' | 'popoverRect'>
) => {
  const { position, childRect, popoverRect } = options;

  const triggerCenterX = childRect.left + childRect.width / 2;
  const triggerCenterY = childRect.top + childRect.height / 2;

  const leftInPopover = triggerCenterX - popoverRect.left - 1;
  const topInPopover = triggerCenterY - popoverRect.top - 6;

  switch (position) {
    case 'top':
      return {
        left: `${leftInPopover}px`,
        bottom: '5px',
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: '5px solid var(--crm-ui-kit-palette-background-primary)',
      };

    case 'bottom':
      return {
        left: `${leftInPopover}px`,
        top: '9px',
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderBottom: '5px solid var(--crm-ui-kit-palette-background-primary)',
      };

    case 'left':
      return {
        top: `${topInPopover}px`,
        right: '5px',
        borderTop: '6px solid transparent',
        borderBottom: '6px solid transparent',
        borderLeft: '5px solid var(--crm-ui-kit-palette-background-primary)',
      };

    case 'right':
      return {
        top: `${topInPopover}px`,
        left: '5px',
        borderTop: '6px solid transparent',
        borderBottom: '6px solid transparent',
        borderRight: '5px solid var(--crm-ui-kit-palette-background-primary)',
      };
  }
};

const ARROW_DISPLAY_NAME = 'Tooltip.Arrow';
const INTERNAL_ARROW_DISPLAY_NAME = 'Tooltip.InternalArrow';

type D = HTMLDivElement;

type InternalArrowProps = ArrowProps & ArrowPrivateProps;
type PublicArrowProps = ArrowProps;

export const Arrow = forwardRef<HTMLDivElement, PublicArrowProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_, ref) => null
);

export const InternalArrow = forwardRef<D, InternalArrowProps>((props, ref) => {
  const {
    theme,
    children,
    className = '',
    position,
    childRect,
    popoverRect,
    // arrowColor = '',
    // arrowSize = 0,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<PopupPrimaryThemeType>(theme);

  const { onMouseLeave = noop } = useTooltipContext(DISPLAY_NAME);

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    onMouseLeave(e);
  };

  return (
    <div ref={ref} onMouseLeave={handleMouseLeave}>
      <BaseArrow
        arrowClassname={cx(s.arrow, s[`arrow--${position}`])}
        position={position}
        childRect={childRect}
        popoverRect={popoverRect}
        arrowColor={undefined}
        arrowSize={undefined}
        arrowStyle={calculateArrowStyle({
          childRect,
          popoverRect,
          position,
        })}
        {...rest}
      >
        <div
          className={cx(
            s.popup,
            s[`popup--${position}`],
            className,
            themeClassName
          )}
        >
          {children}
        </div>
      </BaseArrow>
    </div>
  );
});

Arrow.displayName = ARROW_DISPLAY_NAME;
InternalArrow.displayName = INTERNAL_ARROW_DISPLAY_NAME;
