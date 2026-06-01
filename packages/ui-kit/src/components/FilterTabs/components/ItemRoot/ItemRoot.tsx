import React, { useLayoutEffect } from 'react';
import cx from 'classnames';

import { useThemeClassName } from 'src/hooks/useThemeClassName';

import { useFilterTabsContext } from '../../FilterTabs.context';

import { TabItemRootProvider, DISPLAY_NAME } from './ItemRoot.context';
import { type ItemRootThemeType } from './ItemRoot.themes';
import { type ItemRootProps } from './ItemRoot.props';

import s from './ItemRoot.module.css';

export const ItemRoot: React.FC<ItemRootProps> = ({
  children,
  theme,
  className,
  isDefaultActive,
  ...rest
}) => {
  const themeClassName = useThemeClassName<ItemRootThemeType>(theme);

  const { isDisabled, registerActiveName } = useFilterTabsContext(DISPLAY_NAME);

  useLayoutEffect(() => {
    if (isDefaultActive && rest.name) {
      registerActiveName(rest.name);
    }
  }, []);

  return (
    <TabItemRootProvider {...rest}>
      <div
        className={cx(s.item_root, themeClassName, className, {
          /**
           * If `isDisabled` was passed directly to the component
           * We block a specific Tab button.
           *
           * If passed to the FilterTabs component
           * Lock all Tab buttons.
           */
          [s.disabled]: isDisabled || rest.isDisabled,
        })}
      >
        {children}
      </div>
    </TabItemRootProvider>
  );
};

ItemRoot.displayName = DISPLAY_NAME;
