import React, { forwardRef, useMemo } from 'react';
import { Root as RadixTabsRoot } from '@radix-ui/react-tabs';
import cx from 'classnames';

import { useThemeClassName } from '@ui-kit/hooks/useThemeClassName';

import { useControllableState } from './hooks';

import { type InlineTabsProps, type InlineTabsType } from './InlineTabs.props';
import { type InlineTabsThemeType } from './InlineTabs.themes';
import { InlineTabsContext } from './InlineTabs.context';

import { List } from './components/List';
import { Tab } from './components/Tab';
import { TabLabel } from './components/TabLabel';
import { TabMenuIcon } from './components/TabMenuIcon';
import { Content } from './components/Content';

import s from './InlineTabs.module.css';

type El = HTMLDivElement;

export const InlineTabs = forwardRef<El, InlineTabsProps>((props, ref) => {
  const {
    className,
    theme,
    value: valueProp,
    defaultValue,
    onChange,
    activationMode = 'manual',
    children,
    ...rest
  } = props;

  const themeClassName = useThemeClassName<InlineTabsThemeType>(theme);

  const [value, handleValueChange] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange,
  });

  const context = useMemo(
    () => ({
      themeClassName,
      value,
      select: handleValueChange,
    }),
    [themeClassName, value, handleValueChange]
  );

  /**
   * Radix is always controlled so that a click on a hybrid tab (controlled
   * mode, `value` unchanged) never moves the selection by itself.
   */
  return (
    <InlineTabsContext.Provider value={context}>
      <RadixTabsRoot
        ref={ref}
        className={cx(s.inlineTabs, themeClassName, className)}
        {...rest}
        value={value ?? ''}
        onValueChange={handleValueChange}
        activationMode={activationMode}
        orientation="horizontal"
      >
        {children}
      </RadixTabsRoot>
    </InlineTabsContext.Provider>
  );
}) as InlineTabsType;

InlineTabs.displayName = 'InlineTabs';

InlineTabs.Root = InlineTabs;
InlineTabs.List = List;
InlineTabs.Tab = Tab;
InlineTabs.TabLabel = TabLabel;
InlineTabs.TabMenuIcon = TabMenuIcon;
InlineTabs.Content = Content;
