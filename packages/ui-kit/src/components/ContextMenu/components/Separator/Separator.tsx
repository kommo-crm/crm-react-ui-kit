import React, { forwardRef } from 'react';

import {
  SeparatorSquaredDarkTheme,
  Separator as UiKitSeparator,
} from '@ui-kit/components/Separator';

import type { SeparatorProps } from './Separator.props';

const DISPLAY_NAME = 'ContextMenu.Separator';

type El = HTMLDivElement;

export const Separator = forwardRef<El, SeparatorProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <UiKitSeparator
      ref={ref}
      className={className}
      theme={SeparatorSquaredDarkTheme}
      {...rest}
    />
  );
});

Separator.displayName = DISPLAY_NAME;
