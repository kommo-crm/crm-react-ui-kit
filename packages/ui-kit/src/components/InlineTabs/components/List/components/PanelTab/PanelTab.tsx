import React from 'react';
import { Trigger as RadixTabsTrigger } from '@radix-ui/react-tabs';

import { ListPlacementProvider } from '../../List.context';

import { type PanelTabProps } from './PanelTab.props';

import s from './PanelTab.module.css';

/**
 * Tab in the panel. A tab in the menu keeps its hidden trigger: the panel of
 * a selected hidden tab is labelled by its trigger id.
 */
export const PanelTab = (props: PanelTabProps) => {
  const { tab, width, isHidden, tabRef } = props;

  return (
    <ListPlacementProvider placement="panel">
      <RadixTabsTrigger
        ref={tabRef}
        asChild
        value={tab.props.value}
        className={s.tab}
        style={{ flexBasis: width }}
        hidden={isHidden}
        data-value={tab.props.value}
      >
        <div>{tab}</div>
      </RadixTabsTrigger>
    </ListPlacementProvider>
  );
};

PanelTab.displayName = 'InlineTabs.PanelTab';
