import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import {
  ContentBlock,
  ContentBlockPrimaryTheme,
} from '@ui-kit/components/ContentBlock';

import { Text, TextPrimaryTheme } from '@ui-kit/components/Text';

import { Ribbon } from '../Ribbon';
import { RibbonPrimaryTheme } from '../Ribbon.themes';
import { type RibbonProps } from '../Ribbon.props';

const sampleContent = (
  <Text theme={TextPrimaryTheme} size="m">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere consequuntur
    nam non vero voluptate reiciendis aliquid magnam aut laudantium aspernatur.
  </Text>
);

export const RibbonStandalonePlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<RibbonProps>) => (
  <ComponentPlayground<RibbonProps> appearance={appearance} props={props}>
    {(p) => (
      <ContentBlock
        style={{ position: 'relative', width: 300 }}
        theme={ContentBlockPrimaryTheme}
      >
        <Ribbon {...p} text="Pro" theme={RibbonPrimaryTheme} />

        {sampleContent}
      </ContentBlock>
    )}
  </ComponentPlayground>
);

export const RibbonWithChildrenPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<RibbonProps>) => (
  <ComponentPlayground<RibbonProps> appearance={appearance} props={props}>
    {(p) => (
      <Ribbon {...p} text="Pro" theme={RibbonPrimaryTheme}>
        <ContentBlock style={{ width: 300 }} theme={ContentBlockPrimaryTheme}>
          {sampleContent}
        </ContentBlock>
      </Ribbon>
    )}
  </ComponentPlayground>
);
