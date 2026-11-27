import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@ui-kit/tests/e2e/ComponentPlayground';

import { type LinkProps, LinkPrimaryTheme, Link } from '..';

export const LinkPlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<LinkProps>) => (
  <ComponentPlayground<LinkProps> appearance={appearance} props={props}>
    {(p) => (
      <Link {...p} theme={LinkPrimaryTheme}>
        Go to Dashboard
      </Link>
    )}
  </ComponentPlayground>
);

export const LinkInverseSurfacePlaygroundItem = ({
  appearance,
  props,
}: ComponentPlaygroundProps<LinkProps>) => (
  <ComponentPlayground<LinkProps> appearance={appearance} props={props}>
    {(p) => (
      <div
        data-crm-ui-kit-surface="inverse"
        style={{
          padding: 8,
          background: 'var(--crm-ui-kit-palette-background-secondary-inverse)',
        }}
      >
        <Link {...p} theme={LinkPrimaryTheme}>
          Go to Dashboard
        </Link>
        <div
          data-crm-ui-kit-surface="default"
          style={{
            marginTop: 8,
            padding: 8,
            background: 'var(--crm-ui-kit-palette-background-default)',
          }}
        >
          <Link {...p} theme={LinkPrimaryTheme}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    )}
  </ComponentPlayground>
);
