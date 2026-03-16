import React from 'react';

import {
  ComponentPlayground,
  ComponentPlaygroundProps,
} from 'src/tests/e2e/ComponentPlayground';

import { type LinkProps, LinkPrimaryTheme, Link } from '..';

export const LinkPlayground = (props: ComponentPlaygroundProps<LinkProps>) => {
  return (
    <ComponentPlayground<LinkProps> {...props} propSets={[{}]}>
      {(itemProps: LinkProps) => (
        <Link {...itemProps} theme={LinkPrimaryTheme}>
          Go to Dashboard
        </Link>
      )}
    </ComponentPlayground>
  );
};
