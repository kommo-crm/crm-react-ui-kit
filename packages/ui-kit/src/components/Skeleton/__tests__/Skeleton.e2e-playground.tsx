import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import {
  Skeleton,
  SkeletonCirclePrimaryTheme,
  SkeletonPrimaryTheme,
  type SkeletonProps,
} from '..';

/**
 * A plain element with its own background, border, shadow and radius,
 * so the screenshot shows the placeholder covering them.
 */
const ELEMENT_STYLE: React.CSSProperties = {
  padding: '8px 16px',
  background: '#4c8bf7',
  border: '2px solid #1f5fcf',
  borderRadius: 8,
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  color: '#fff',
  font: '14px sans-serif',
};

export const SkeletonEmptyPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<SkeletonProps>) => {
  return (
    <ComponentPlayground<SkeletonProps> appearance={appearance} props={props}>
      {(p) => {
        return (
          <Skeleton
            width="120px"
            height="16px"
            {...p}
            theme={SkeletonPrimaryTheme}
          />
        );
      }}
    </ComponentPlayground>
  );
};

export const SkeletonElementPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<SkeletonProps>) => {
  return (
    <ComponentPlayground<SkeletonProps> appearance={appearance} props={props}>
      {(p) => {
        return (
          <Skeleton width="max-content" {...p} theme={SkeletonPrimaryTheme}>
            <button style={ELEMENT_STYLE}>Submit</button>
          </Skeleton>
        );
      }}
    </ComponentPlayground>
  );
};

export const SkeletonCirclePlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<SkeletonProps>) => {
  return (
    <ComponentPlayground<SkeletonProps> appearance={appearance} props={props}>
      {(p) => {
        return (
          <Skeleton
            width="40px"
            height="40px"
            {...p}
            theme={SkeletonCirclePrimaryTheme}
          />
        );
      }}
    </ComponentPlayground>
  );
};
