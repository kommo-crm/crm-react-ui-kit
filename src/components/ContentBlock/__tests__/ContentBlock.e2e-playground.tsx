import React, { FC } from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { Text, TextPrimaryTheme } from 'src/components/Text';

import { ContentBlock } from '../ContentBlock';
import {
  ContentBlockSecondaryTheme,
  ContentBlockTheme,
} from '../ContentBlock.themes';
import { type ContentBlockProps } from '../ContentBlock.props';

const ContentBlockComponent: FC<ContentBlockProps> = (props) => {
  return (
    <div style={{ padding: '10px 10px 15px' }}>
      {
        <ContentBlock {...props}>
          <Text theme={TextPrimaryTheme} size="l">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            ipsam ducimus inventore minima optio error unde incidunt atque.
            Minima, maxime?
          </Text>
        </ContentBlock>
      }
    </div>
  );
};

export const ContentBlockPrimaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ContentBlockProps>) => (
  <ComponentPlayground<ContentBlockProps> appearance={appearance} props={props}>
    {(p) => <ContentBlockComponent {...p} theme={ContentBlockTheme} />}
  </ComponentPlayground>
);

export const ContentBlockSecondaryPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ContentBlockProps>) => (
  <ComponentPlayground<ContentBlockProps> appearance={appearance} props={props}>
    {(p) => <ContentBlockComponent {...p} theme={ContentBlockSecondaryTheme} />}
  </ComponentPlayground>
);
