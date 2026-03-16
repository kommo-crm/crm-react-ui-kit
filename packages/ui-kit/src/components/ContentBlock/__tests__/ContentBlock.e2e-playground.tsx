import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { Text, TextPrimaryTheme } from 'src/components/Text';

import { ContentBlock } from '../ContentBlock';
import { ContentBlockTheme } from '../ContentBlock.themes';
import { type ContentBlockProps } from '../ContentBlock.props';

export const ContentBlockPlayground = (
  props: ComponentPlaygroundProps<ContentBlockProps>
) => {
  return (
    <ComponentPlayground<ContentBlockProps>
      {...props}
      propSets={[
        {
          children: [
            <Text key="children" theme={TextPrimaryTheme} size="l">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              ipsam ducimus inventore minima optio error unde incidunt atque.
              Minima, maxime?
            </Text>,
          ],
        },
      ]}
    >
      {(itemProps: ContentBlockProps) => (
        <div style={{ padding: '10px 10px 15px' }}>
          <ContentBlock {...itemProps} theme={ContentBlockTheme} />
        </div>
      )}
    </ComponentPlayground>
  );
};
