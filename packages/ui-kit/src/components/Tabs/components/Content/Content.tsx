import React, { forwardRef } from 'react';
import { Content as RadixTabsContent } from '@radix-ui/react-tabs';

import { type ContentProps } from './Content.props';

type El = HTMLDivElement;

export const Content = forwardRef<El, ContentProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <RadixTabsContent ref={ref} {...rest}>
      {children}
    </RadixTabsContent>
  );
});

Content.displayName = 'Tabs.Content';
