import React, { useLayoutEffect, useRef } from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import { Text, TextPrimaryTheme } from '@ui-kit/components/Text';

import {
  ScrollArea,
  ScrollAreaSurfaceTheme,
  ScrollAreaCompactTheme,
  type ScrollAreaThemeType,
} from '..';

import { AREA_HEIGHT, AREA_WIDTH } from './ScrollArea.e2e-constants';

export interface ScrollAreaTestProps {
  itemsCount: number;
  scrollPosition?: 'start' | 'middle' | 'end';
  isFadeEnabled?: boolean;
  isScrollbarHidden?: boolean;
  isMaxHeight?: boolean;
  isEllipsis?: boolean;
  id?: string;
}

const ScrollAreaTestItem = (props: {
  theme: ScrollAreaThemeType;
  testProps: ScrollAreaTestProps;
}) => {
  const { theme, testProps } = props;
  const {
    itemsCount,
    scrollPosition = 'start',
    isMaxHeight = false,
    isEllipsis = false,
    ...rest
  } = testProps;

  const viewportRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const maxScrollTop = viewport.scrollHeight - viewport.clientHeight;

    viewport.scrollTop = {
      start: 0,
      middle: maxScrollTop / 2,
      end: maxScrollTop,
    }[scrollPosition];
  }, [scrollPosition]);

  return (
    <ScrollArea
      {...rest}
      ref={viewportRef}
      theme={theme}
      tabIndex={0}
      style={
        isMaxHeight
          ? { width: AREA_WIDTH, maxHeight: AREA_HEIGHT }
          : { width: AREA_WIDTH, height: AREA_HEIGHT }
      }
    >
      {Array.from({ length: itemsCount }, (_, index) => (
        <Text
          key={index}
          theme={TextPrimaryTheme}
          size="l"
          isEllipsis={isEllipsis}
          style={{ display: 'block', padding: '4px 8px' }}
        >
          {isEllipsis
            ? `Item ${index + 1} with a long title that does not fit`
            : `Item ${index + 1}`}
        </Text>
      ))}
    </ScrollArea>
  );
};

export const ScrollAreaSurfacePlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ScrollAreaTestProps>) => (
  <ComponentPlayground<ScrollAreaTestProps>
    appearance={appearance}
    props={props}
  >
    {(p) => <ScrollAreaTestItem theme={ScrollAreaSurfaceTheme} testProps={p} />}
  </ComponentPlayground>
);

export const ScrollAreaCompactPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<ScrollAreaTestProps>) => (
  <ComponentPlayground<ScrollAreaTestProps>
    appearance={appearance}
    props={props}
  >
    {(p) => <ScrollAreaTestItem theme={ScrollAreaCompactTheme} testProps={p} />}
  </ComponentPlayground>
);
