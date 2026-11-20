import React from 'react';
import { type Decorator } from '@storybook/react';

import { ConfigProvider } from '@ui-kit/components/ConfigProvider';

const CenteredStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

export const WithConfigProvider: Decorator = (Component, context) => {
  const { appearance } = context.globals;
  const { centered, fixedAppearance } = context.parameters;

  return (
    <ConfigProvider appearance={fixedAppearance ?? appearance}>
      <div style={centered ? CenteredStyle : {}}>
        <Component />
      </div>
    </ConfigProvider>
  );
};
