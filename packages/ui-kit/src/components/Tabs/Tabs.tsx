import React, { forwardRef } from 'react';
import { Root as RadixTabsRoot } from '@radix-ui/react-tabs';
import cx from 'classnames';

import { useThemeClassName } from '@ui-kit/hooks/useThemeClassName';

import { type TabsProps, type TabsType } from './Tabs.props';
import { type TabsThemeType } from './Tabs.themes';

import { List } from './components/List';
import { Trigger } from './components/Trigger';
import { Content } from './components/Content';

import s from './Tabs.module.css';

type El = HTMLDivElement;

export const Tabs = forwardRef<El, TabsProps>((props, ref) => {
  const { className, theme, onChange, children, ...rest } = props;

  const themeClassName = useThemeClassName<TabsThemeType>(theme);

  return (
    <RadixTabsRoot
      ref={ref}
      className={cx(s.tabs, themeClassName, className)}
      {...rest}
      onValueChange={onChange}
      orientation="horizontal"
    >
      {children}
    </RadixTabsRoot>
  );
}) as TabsType;

Tabs.displayName = 'Tabs';

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Content = Content;
