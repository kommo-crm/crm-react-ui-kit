import React, { forwardRef } from 'react';
import cx from 'classnames';

import { useListPlacementContext } from '../List/List.context';

import { type TabLabelProps } from './TabLabel.props';

import s from './TabLabel.module.css';

const DISPLAY_NAME = 'InlineTabs.TabLabel';

/**
 * Label of the tab. Truncated with an ellipsis; in the panel it grows from
 * the theme width.
 */
export const TabLabel = forwardRef<HTMLSpanElement, TabLabelProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    const { placement } = useListPlacementContext(DISPLAY_NAME);

    return (
      <span
        ref={ref}
        className={cx(
          s.tabLabel,
          placement === 'measure' && s.measure,
          className
        )}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

TabLabel.displayName = DISPLAY_NAME;
