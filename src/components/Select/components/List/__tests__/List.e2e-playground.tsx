import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import {
  TextErrorTheme,
  TextPrimaryTheme,
  TextSecondaryDarkTheme,
  TextSecondaryLightTheme,
} from 'src/components/Text';

import { List, type ListProps } from '..';

export const ListPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ListProps>) => (
  <ComponentPlayground<ListProps> appearance={appearance} props={props}>
    {(p) => (
      <List {...p} theme={TextPrimaryTheme}>
        <List.Item>List level 1</List.Item>
        <List.Item>
          List level 1
          <List type={p.type}>
            <List.Item>List level 2</List.Item>
            <List.Item>
              List level 2
              <List type={p.type}>
                <List.Item>List level 3</List.Item>
                <List.Item>List level 3</List.Item>
              </List>
            </List.Item>
            <List.Item>List level 2</List.Item>
          </List>
        </List.Item>
        <List.Item>List level 1</List.Item>
      </List>
    )}
  </ComponentPlayground>
);

export const ListPrimaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ListProps>) => (
  <ComponentPlayground<ListProps> appearance={appearance} props={props}>
    {(p) => (
      <List {...p} theme={TextPrimaryTheme}>
        <List.Item>List level 1</List.Item>
        <List.Item>List level 1</List.Item>
        <List.Item>List level 1</List.Item>
      </List>
    )}
  </ComponentPlayground>
);

export const ListSecondaryLightPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ListProps>) => (
  <ComponentPlayground<ListProps> appearance={appearance} props={props}>
    {(p) => (
      <List {...p} theme={TextSecondaryLightTheme}>
        <List.Item>List level 1</List.Item>
        <List.Item>List level 1</List.Item>
        <List.Item>List level 1</List.Item>
      </List>
    )}
  </ComponentPlayground>
);

export const ListSecondaryDarkPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ListProps>) => (
  <ComponentPlayground<ListProps> appearance={appearance} props={props}>
    {(p) => (
      <List {...p} theme={TextSecondaryDarkTheme}>
        <List.Item>List level 1</List.Item>
        <List.Item>List level 1</List.Item>
        <List.Item>List level 1</List.Item>
      </List>
    )}
  </ComponentPlayground>
);

export const ListErrorPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ListProps>) => (
  <ComponentPlayground<ListProps> appearance={appearance} props={props}>
    {(p) => (
      <List {...p} theme={TextErrorTheme}>
        <List.Item>List level 1</List.Item>
        <List.Item>List level 1</List.Item>
        <List.Item>List level 1</List.Item>
      </List>
    )}
  </ComponentPlayground>
);
