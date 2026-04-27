import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from '@/tests/e2e/ComponentPlayground';

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
