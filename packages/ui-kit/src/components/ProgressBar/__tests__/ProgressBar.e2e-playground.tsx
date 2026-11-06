import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import {
  ProgressBar,
  ProgressBarPrimaryTheme,
  type ProgressBarRootProps,
  type ProgressBarTheme,
} from '..';

const CONTAINER_STYLE: React.CSSProperties = {
  width: 300,
  padding: 16,
  background: 'var(--crm-ui-kit-palette-background-primary)',
  border: '1px solid var(--crm-ui-kit-palette-border-primary)',
  borderRadius: 4,
};

const createPlaygroundItem = (theme: ProgressBarTheme) => {
  const PlaygroundItem = ({
    appearance,
    props,
  }: ComponentPlaygroundProps<ProgressBarRootProps>) => (
    <ComponentPlayground<ProgressBarRootProps>
      appearance={appearance}
      props={props}
    >
      {(p) => (
        <div style={CONTAINER_STYLE}>
          <ProgressBar.Root {...p} theme={theme}>
            <ProgressBar.Indicator />
          </ProgressBar.Root>
        </div>
      )}
    </ComponentPlayground>
  );

  return PlaygroundItem;
};

export const ProgressBarPrimaryPlaygroundItem = createPlaygroundItem(
  ProgressBarPrimaryTheme
);
