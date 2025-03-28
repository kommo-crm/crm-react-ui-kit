import React, { type FC } from 'react';
import { Source } from '@storybook/blocks';

import { Appearance } from 'src';
import { initialTheme } from '@storybook-utils/utils';

import { CodeBlockProps } from './CodeBlock.props';

/**
 * Custom component that connects current Storybook's theme to the Source
 */
export const CodeBlock: FC<CodeBlockProps> = (props) => {
  const channel = (window as any).__STORYBOOK_ADDONS_CHANNEL__;

  const appearance =
    channel?.data?.globalsUpdated[0]?.globals?.appearance || initialTheme;

  return <Source {...props} dark={appearance === Appearance.ALTERNATIVE} />;
};
