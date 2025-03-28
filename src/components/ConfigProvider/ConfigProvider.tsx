import React, { useLayoutEffect } from 'react';

import { APPEARANCE_ATTRIBUTE_NAME } from 'src/lib/appearance';

import { type ConfigProviderProps } from './ConfigProvider.props';

export const ConfigProvider = ({
  appearance,
  children,
}: ConfigProviderProps): React.ReactNode => {
  useLayoutEffect(() => {
    document.documentElement.setAttribute(
      APPEARANCE_ATTRIBUTE_NAME,
      appearance
    );
  }, [appearance]);

  return children;
};
