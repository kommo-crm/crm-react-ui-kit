import React, { forwardRef } from 'react';

import { ListPlacementProvider } from '../../List.context';

import { type MeasureLayerProps } from './MeasureLayer.props';

import s from './MeasureLayer.module.css';
import tabStyles from '../PanelTab/PanelTab.module.css';

/**
 * Invisible plain copies of every tab, one child per tab, measured for the
 * natural tab widths. The panel cannot give them: its tabs grow by CSS and
 * the hidden ones have no size. The copies exist whatever the split is, and
 * they add no tab stops or Radix items to the list.
 */
export const MeasureLayer = forwardRef<HTMLDivElement, MeasureLayerProps>(
  (props, ref) => {
    const { tabs, tabRefs } = props;

    return (
      <div ref={ref} className={s.measureLayer} aria-hidden>
        <ListPlacementProvider placement="measure">
          {tabs.map((tab, index) => (
            <div
              key={tab.props.value}
              ref={tabRefs[index]}
              className={tabStyles.tab}
            >
              {tab}
            </div>
          ))}
        </ListPlacementProvider>
      </div>
    );
  }
);

MeasureLayer.displayName = 'InlineTabs.MeasureLayer';
