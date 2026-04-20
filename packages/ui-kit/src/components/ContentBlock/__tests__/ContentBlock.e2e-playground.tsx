import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@/tests/e2e/ComponentPlayground';

import { Text, TextPrimaryTheme } from '@/components/Text';

import { ContentBlock } from '../ContentBlock';
import { ContentBlockTheme } from '../ContentBlock.themes';
import { type ContentBlockProps } from '../ContentBlock.props';

export const ContentBlockPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ContentBlockProps>) => (
  <ComponentPlayground<ContentBlockProps> appearance={appearance} props={props}>
    {(p) => (
      <div style={{ padding: '10px 10px 15px' }}>
        <ContentBlock {...p} theme={ContentBlockTheme}>
          <Text theme={TextPrimaryTheme} size="l">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            ipsam ducimus inventore minima optio error unde incidunt atque.
            Minima, maxime?
          </Text>
        </ContentBlock>
      </div>
    )}
  </ComponentPlayground>
);
