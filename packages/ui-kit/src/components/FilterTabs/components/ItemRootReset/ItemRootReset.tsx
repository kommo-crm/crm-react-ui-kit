import React from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useFilterTabsContext } from '../../FilterTabs.context';
import { type ItemRootThemeType } from '../ItemRoot/ItemRoot.themes';

import {
  TabItemRootResetProvider,
  DISPLAY_NAME,
} from './ItemRootReset.context';
import { type ItemRootResetProps } from './ItemRootReset.props';

import s from '../ItemRoot/ItemRoot.module.css';

export const ItemRootReset: React.FC<ItemRootResetProps> = ({
  children,
  theme,
  className,
  ...rest
}) => {
  const themeClassName = useThemeClassName<ItemRootThemeType>(theme);

  const { isDisabled } = useFilterTabsContext(DISPLAY_NAME);

  return (
    <TabItemRootResetProvider {...rest}>
      <div
        className={cx(s.item_root, themeClassName, className, {
          /**
           * If `isDisabled` was passed directly to the component
           * We block a specific Tab button.
           *
           * If passed to the FilterTabs component
           * We block all TabReset buttons.
           */
          [s.disabled]: isDisabled || rest.isDisabled,
        })}
      >
        {children}
      </div>
    </TabItemRootResetProvider>
  );
};

ItemRootReset.displayName = DISPLAY_NAME;
