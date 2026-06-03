import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import { TextPrimaryTheme } from '@ui-kit/components/Text';
import { Text } from '@ui-kit/components/Text/Text';

import { List, type ListProps } from '..';

export const BulletedListPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ListProps>) => (
  <ComponentPlayground<ListProps> appearance={appearance} props={props}>
    {(p) => (
      <Text as="div" size="l" theme={TextPrimaryTheme}>
        <List {...p} type="bulleted">
          <List.Item>Bulleted List level 1</List.Item>
          <List.Item>
            Bulleted List level 1
            <List type="bulleted">
              <List.Item>Bulleted List level 2</List.Item>
              <List.Item>
                Bulleted List level 2
                <List type="bulleted">
                  <List.Item>Bulleted List level 3</List.Item>
                  <List.Item>Bulleted List level 3</List.Item>
                </List>
              </List.Item>
              <List.Item>Bulleted List level 2</List.Item>
            </List>
          </List.Item>
          <List.Item>Bulleted List level 1</List.Item>
        </List>
      </Text>
    )}
  </ComponentPlayground>
);

export const NumberedListPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ListProps>) => (
  <ComponentPlayground<ListProps> appearance={appearance} props={props}>
    {(p) => (
      <Text as="div" size="l" theme={TextPrimaryTheme}>
        <List {...p} type="numbered">
          <List.Item>Numbered List level 1</List.Item>
          <List.Item>
            Numbered List level 1
            <List type="numbered">
              <List.Item>Numbered List level 2</List.Item>
              <List.Item>
                Numbered List level 2
                <List type="numbered">
                  <List.Item>Numbered List level 3</List.Item>
                  <List.Item>Numbered List level 3</List.Item>
                </List>
              </List.Item>
              <List.Item>Numbered List level 2</List.Item>
            </List>
          </List.Item>
          <List.Item>Numbered List level 1</List.Item>
        </List>
      </Text>
    )}
  </ComponentPlayground>
);
